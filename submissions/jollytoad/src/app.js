import fluxlet from "fluxlet"
import { update } from "fluxlet-immutable/update"
import { deepFreeze } from "fluxlet-immutable/freeze"
import { chain } from "fluxlet-immutable/chain"
import { mapIf, mapFrom } from "fluxlet-immutable/map"
import $ from "jquery"

// ## Fluxlet construction

export function setup() {
  return fluxlet("challenge")

    .logging({
      register: true,
      dispatch: true,
      call: true,
      args: false,
      state: true,
      timing: false
    })

    .state(deepFreeze(initialState))

    .actions({
      setObiWansLocation,
      loadInitialSith,
      setSith,
      shiftUp,
      shiftDown
    })

    .calculations(
      { sithsVisited },
      { anySlotVisited },
      { hasSith },
      { allowShift },
      { fillEmptySlots }
    )

    .sideEffects(
      { abortAllRequests },
      { abortObsoleteRequests },
      { requestSith },
      {
        renderPlanetMonitor,
        renderSiths,
        renderButtonState,
        renderVisitor
      }
    )

    .init(
      bindReady,
      bindButtons,
      planetMonitor,
      testVisit
    )
}

// ## Constants

// The number of slots in the UI
const SLOTS = 5
// The number of slots that the buttons shift by
const SHIFT = 2
const SITH_BASE_URL = 'http://localhost:3000/dark-jedis/'
const OBI_WAN_WS_URL = 'ws://localhost:4000'
const INITIAL_SITH_ID = 3616
const INITIAL_SITH_URL = SITH_BASE_URL + INITIAL_SITH_ID
// The challenge doesn't state into which slot the initial Sith must be loaded,
// so lets make it interesting and start in the middle
const INITIAL_SLOT = Math.floor(SLOTS/2)
const EMPTY_SLOT = {}

// Extract URL parameters, used for testing purposes
const URL_PARAMS = location.search.replace(/^\?/,'').split('&').reduce((ret, param) => {
  const kv = param.split('=',2)
  ret[kv[0]] = kv[1]
  return ret
}, {})


// ## Utility functions

const lowerSlice = siths => siths.slice(SHIFT-SLOTS)
const upperSlice = siths => siths.slice(0,SLOTS-SHIFT)

const identity = v => v
const isEmptySlot = slot => !slot.load && !slot.id
const isLoadedSlot = slot => !!slot.id

const createEmptySlots = (count) => Array(count).fill(EMPTY_SLOT)


// ## State

export const initialState = {
  model: {
    obiWan: null,
    siths: createEmptySlots(SLOTS)
  },
  view: {
    sithsVisited: Array(SLOTS).fill(false),
    anySlotVisited: false,
    hasSith: {
      first: false,
      last: false
    },
    allowShift: {
      up: false,
      down: false
    }
  }
}


// ## Initializations

// ### bindReady
// Bind on ready to dispatch the action to load the initial Sith
function bindReady(dispatch) {
  $(document)
    .ready(() => dispatch.loadInitialSith(INITIAL_SLOT, INITIAL_SITH_URL))
}

// ### bindButtons
// Bind buttons to dispatch an action to shift the list up or down
function bindButtons(dispatch) {
  $(document)
    .on("click", ".css-button-up", () => dispatch.shiftDown())
    .on("click", ".css-button-down", () => dispatch.shiftUp())
}

// ### planetMonitor
// Open the WebSocket and dispatch an action to set Obi-Wans location when we
// received a message
function planetMonitor(dispatch) {
  if (!URL_PARAMS.disableWebSocket) {
    window.setTimeout(() => {
      new WebSocket(OBI_WAN_WS_URL).onmessage = (event) => {
        dispatch.setObiWansLocation(JSON.parse(event.data))
      }
    }, URL_PARAMS.delayWebSocket || 0)
  }
}

// ### testVisit
// If visitId & visitName is set in the url params, the set Obi-Wan to this
// after a delay in delayVisit (defaults to 500ms)
function testVisit(dispatch) {
  if (URL_PARAMS.visitId && URL_PARAMS.visitName) {
    window.setTimeout(() => {
      dispatch.setObiWansLocation({
        id: +URL_PARAMS.visitId,
        name: URL_PARAMS.visitName
      })
    }, URL_PARAMS.delayVisit || 500)
  }
}

// ## Guards
// For use in _when_ clauses of actions
// (state, ...args) -> boolean

const allSlotsAreEmpty = ({model:{siths}}) => siths.every(isEmptySlot)
const loadingSlotFound = ({model:{siths}}, slotUrl) => siths.some(slot => slot.load === slotUrl)
const shiftUpIsAllowed = ({view:{allowShift}}) => allowShift.up
const shiftDownIsAllowed = ({view:{allowShift}}) => allowShift.down


// ## Actions
// (...args) -> (state) -> state

// ### setObiWansLocation
// Simple store the new homeworld in the state
const setObiWansLocation = (world) => update('model.obiWan', world)

// ### loadInitialSith
// Kick off loading of the Sith slots with an initial loading slot
// a guard ensure this only happens once, ie. when all slots are empty
const loadInitialSith = {
  when: allSlotsAreEmpty,

  then: (slotIndex, url) =>
    update(['model', 'siths', slotIndex], { load: url })
}

// ### setSith
// Find the loading slot with the given URL and drop the new Sith data into it
// a guard prevents any modification if the loading slot is not found
const setSith = {
  when: loadingSlotFound,

  then: (slotUrl, data) =>
    update('model.siths', mapIf(slot => slot.load === slotUrl, () => data))
}

// ### shiftUp
// Shift all slots up in the list by a fixed amount (the *SHIFT* constant)
// discarding the ones at the top.
// a guard prevents this from happening if it should not be allowed
const shiftUp = {
  when: shiftUpIsAllowed,

  then: () => update('model.siths', siths => lowerSlice(siths).concat(createEmptySlots(SHIFT)))
}

// ### shiftDown
// Shift all slots down in the list by a fixed amount (the *SHIFT* constant)
// discarding the ones at the bottom.
// a guard prevents this from happening if it should not be allowed
const shiftDown = {
  when: shiftDownIsAllowed,

  then: () => update('model.siths', siths => createEmptySlots(SHIFT).concat(upperSlice(siths)))
}


// ## Predicates
// For use in _when_ clauses of calculations and side-effects
// (state, prev) -> boolean

const sithsModified = (state, prev) => state.model.siths !== prev.model.siths
const haveEmptySlots = (state) => state.model.siths.some(isEmptySlot)
const obiWanMoved = (state, prev) => state.model.obiWan !== prev.model.obiWan
const sithsVisitedModified = (state, prev) => state.view.sithsVisited !== prev.view.sithsVisited
const aSlotIsVisited = (state) => state.view.anySlotVisited
const visitingOver = (state, prev) => !state.view.anySlotVisited && prev.view.anySlotVisited
const allowShiftModified = (state, prev) => state.view.allowShift !== prev.view.allowShift

// ### Predicate combinators
// (?) -> (state, prev) -> boolean

const anyOf = (...predicates) => (...args) => predicates.some(when => when(...args))
const allOf = (...predicates) => (...args) => predicates.every(when => when(...args))
const not = (predicate) => (...args) => !predicate(...args)


// ## Calculations
// (state, prev) -> state

// ### sithsVisited
// Produces a list of booleans corresponding to each slot, which indicates
// whether Obi-Wan is currently on the homeworld of the Sith in this slot
const sithsVisited = {
  when: anyOf(obiWanMoved, sithsModified),

  then: update('view.sithsVisited', mapFrom('model.siths', isObiWanVisitingThisSlot))
}

function isObiWanVisitingThisSlot(slot, x, {model:{obiWan}}) {
  return !!(obiWan && slot.homeworld && obiWan.id === slot.homeworld.id)
}

// ### anySlotVisited
// Determines if Obi-Wan is currently visiting any homeworld of a Sith in the list
const anySlotVisited = {
  requiresCalculations: ["sithsVisited"],

  when: sithsVisitedModified,

  then: update('view.anySlotVisited',
    (x, {view:{sithsVisited}}) => sithsVisited.some(identity))
}

// ### hasSith
// Determines whether the first or last Sith available is present in the list
const hasSith = {
  when: sithsModified,

  then: chain(
    update('view.hasSith.first',
      (x, {model:{siths}}) => siths.some(slot => slot.master && !slot.master.id)),

    update('view.hasSith.last',
      (x, {model:{siths}}) => siths.some(slot => slot.apprentice && !slot.apprentice.id))
  )
}

// ### allowShift
// Determines whether the list can be shifted up or down depending on various
// factors:
// * Is the first/last Sith in the list?
// * Is Obi-Wan visiting any homeworld present in the list?
// * Can the list be shifted without leaving it empty?
const allowShift = {
  requiresCalculations: ["anySlotVisited", "hasSith"],

  when: anyOf(sithsModified, sithsVisitedModified),

  then: chain(
    update('view.allowShift.up', isAllowShift('last', lowerSlice)),
    update('view.allowShift.down', isAllowShift('first', upperSlice))
  )
}

const hasLoadedSith = (slicer, siths) => slicer(siths).some(isLoadedSlot)

// Create a function for use in an update, which returns the state for allowShift.up/down
// sithGuard should be 'first' or 'last', and slicer should be the upperSlice or lowerSlice fn
function isAllowShift(sithGuard, slicer) {
  return (x, {model:{siths}, view:{hasSith, anySlotVisited}}) =>
    !hasSith[sithGuard] && !anySlotVisited && hasLoadedSith(slicer, siths)
}

// ### fillEmptySlots
// Checks for any empty slots in the list and fills them with a loading slot
// based on the preceding or following slot
const fillEmptySlots = {
  when: allOf(sithsModified, haveEmptySlots),

  then: update('model.siths', mapIf(isEmptySlot, fillEmptySlot))
}

function fillEmptySlot(slot, index, {model:{siths}}) {

  function loadSlotFrom(offset, relationship) {
    const relativeSlot = siths[index+offset]

    return relativeSlot && relativeSlot[relationship] &&
      relativeSlot[relationship].url && { load: relativeSlot[relationship].url }
  }

  return loadSlotFrom(-1, 'apprentice') || loadSlotFrom(1, 'master') || slot
}

// ## Request Side Effects
// (state, prev, dispatchers) -> void

// Map of inflight requests: { url -> xhr }
const requests = new Map

// Predicate to check if any requests are in progress
const haveRequests = () => requests.size > 0

// ### abortObsoleteRequests
// Abort and delete any request that isn't associated with a loading slot
const abortObsoleteRequests = {
  when: allOf(sithsModified, haveRequests),

  then: ({model:{siths}}) => {
    requests.forEach((xhr, url) => {
      if (!siths.some(slot => slot.load === url)) {
        xhr.abort()
        requests.delete(url)
      }
    })
  }
}

// ### requestSith
// Initiate a request for any loading slot that isn't already being requested
const requestSith = {
  when: allOf(anyOf(sithsModified, visitingOver), not(aSlotIsVisited)),

  then: ({model:{siths}}, x, dispatch) => {
    siths.forEach(slot => {
      if (slot.load && !requests.has(slot.load)) {
        requests.set(slot.load, fetchJedi(slot.load, dispatch))
      }
    })
  }
}

// Perform the actual XHR request
const fetchJedi = (url, dispatch) => $.getJSON(url)
  .done(data => {
    requests.delete(url)
    dispatch.setSith(url, data)
  })
  .fail(() => {
    requests.delete(url)
    // TODO: Report failure?
  })

// ### abortAllRequests
// Abort and delete all active requests when Obi-Wan is visiting a homeworld
// of a Sith in the list
const abortAllRequests = {
  requiresCalculations: ["anySlotVisited"],

  when: allOf(haveRequests, aSlotIsVisited),

  then: () => {
    requests.forEach(xhr => xhr.abort())
    requests.clear()
  }
}


// ## Rendering Side Effects
// (state, prev, dispatchers) -> void

// ### renderPlanetMonitor
// Render Obi-Wans current location to the DOM
const renderPlanetMonitor = {
  when: obiWanMoved,

  then: ({model:{obiWan}}) => {
    $('.css-planet-monitor').text(`Obi-Wan currently on ${obiWan.name}`)
  }
}

// ### renderSiths
// Render Sith names and homeworlds into the pre-existing slots in the DOM
const renderSiths = {
  when: sithsModified,

  then: ({model:{siths}}) => {
    siths.forEach((slot, index) => {
      $('.css-slot').eq(index)
        .find('h3').text(slot.name || '').end()
        .find('h6').text(slot.homeworld && slot.homeworld.name || '').end()
    })
  }
}

// ### renderVisitor
// Highlight the Sith whose homeworlds are currently being visited by Obi-Wan in the DOM
const renderVisitor = {
  requiresCalculations: ["sithsVisited"],

  when: sithsVisitedModified,

  then: ({view:{sithsVisited}}) => {
    sithsVisited.forEach((visiting, index) => {
      $('.css-slot').eq(index).toggleClass('css-highlight', visiting)
    })
  }
}

// ### renderButtonState
// Set the styling of the buttons in the DOM according to the *allowShift* states
const renderButtonState = {
  requiresCalculations: ["allowShift"],

  when: allowShiftModified,

  then: ({view:{allowShift}}) => {
    $('.css-button-up').toggleClass('css-button-disabled', !allowShift.down)
    $('.css-button-down').toggleClass('css-button-disabled', !allowShift.up)
  }
}
