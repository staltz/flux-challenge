import React from "react"
import Bacon from "baconjs"
import http from "reqwest"
import {render} from "react-dom"
import {range, partialRight, values, sortBy, flatten, compact, find, isEqual} from "lodash"
import {createAction} from "megablob"

const MAX_SITHS = 5

function httpGet(url) {
  const abortOnUnsubscribe = true
  return Bacon.fromPromise(http({url, method: "get", crossOrigin: true, type: "json"}), abortOnUnsubscribe)
}

// these actions are just functions that internally push
// events to "Bacon.Bus" (available via <action>.$)
const loadSith = createAction()
const scrollUp = createAction()
const scrollDown = createAction()

const planetChangedS =
  Bacon
    .fromBinder(sink => (new WebSocket("ws://localhost:4000")).onmessage = sink)
    .map(".data")
    .map(JSON.parse)

// this stream represents the scrolling amount of the list
const sithsScrolledS =
  scrollUp.$.map(2).merge(scrollDown.$.map(-2))

// this stream receives the values each time when new sith is loaded from
// the server to specific index. New siths can be loaded by calling
// loadSith({idx, url}). If AJAX request per idx must be cancelled, then
// loadSith({idx}) will do the job (no-op if no request was pending)
const sithLoadedS =
  loadSith.$
    .groupBy(({idx}) => idx)
    .flatMap(requestsPerIdxS => (
      requestsPerIdxS
        .skipDuplicates(isEqual)
        .flatMapLatest(({idx, url}) => url ? httpGet(url).map(s => ({idx, ...s})) : null)
        .filter(val => val !== null)
    ))

// This property contains the sith list and it will be updated every time when
// new sith gets loaded or scroll button is pressed (siths are stored internally
// inside the normalized hash for easier updating)
const initialSiths = range(MAX_SITHS).reduce((acc, idx) => ({...acc, [idx]: {idx}}), {})
const sithsP =
  Bacon
    .update(initialSiths,
      [sithLoadedS], (siths, s) => ({...siths, [s.idx]: s}),
      [sithsScrolledS], (siths, idxDelta) => values(siths).reduce((acc, sith) => {
        const newIdx = sith.idx + idxDelta
        const inList = newIdx >= 0 && newIdx < MAX_SITHS
        return inList ? {...acc, [newIdx]: {...sith, idx: newIdx}} : acc
      }, initialSiths)
    )
    .map(hash => sortBy(values(hash), "idx"))

// load apprentice and master if there is an empty slots around the loaded sith
loadSith.$.plug(
  Bacon
    .combineAsArray([sithsP, planetChangedS.toProperty({id: "<none>"})])
    .sampledBy(sithLoadedS, ([siths, planet], sith) => {
      if (isPlanetHomeWorldForListedSiths(planet, siths)) {
        return createCancelRequests(siths)
      } else {
        return loadMasterAndApprenticeIfPossible(siths, sith)
      }
    })
    .flatMap(Bacon.fromArray)
)

// reset previous requests and make new requests to empty slot after scroll
loadSith.$.plug(
  sithsP
    .sampledBy(sithsScrolledS, siths => {
      const cancels = createCancelRequests(siths)
      const reloads = flatten(siths.map(s => loadMasterAndApprenticeIfPossible(siths, s)))
      return [...cancels, ...reloads]
    })
    .flatMap(Bacon.fromArray)
)

// reset all requests if the current planet is home world for any of the listed siths,
// otherwise re-send the cancelled requests
loadSith.$.plug(
  sithsP
    .sampledBy(planetChangedS, (siths, planet) => {
      if (isPlanetHomeWorldForListedSiths(planet, siths)) {
        return createCancelRequests(siths)
      } else {
        return flatten(siths.map(s => loadMasterAndApprenticeIfPossible(siths, s)))
      }
    })
    .flatMap(Bacon.fromArray)
)

function createCancelRequests(siths) {
  return siths.map(({idx}) => ({idx}))
}

// just check that slots are empty and create an array of load events for master/apprentice
function loadMasterAndApprenticeIfPossible(siths, sith) {
  const {idx, master, apprentice} = sith
  if (sith.id) {
    const loadMaster = master.url && siths[idx - 1] && !siths[idx - 1].id
    const loadApprentice = apprentice.url && siths[idx + 1] && !siths[idx + 1].id
    return compact([
      loadMaster ? {idx: idx - 1, url: master.url} : null,
      loadApprentice ? {idx: idx + 1, url: apprentice.url} : null
    ])
  } else {
    return []
  }
}

function isPlanetHomeWorldForListedSiths(planet, siths) {
  return !!find(siths, s => s.homeworld && s.homeworld.id === planet.id)
}

function updateScrolls(state) {
  const allDisabled = isPlanetHomeWorldForListedSiths(state.planet, state.siths)
  return {
    upDisabled: allDisabled || !!find(state.siths, s => s.master && !s.master.url),
    downDisabled: allDisabled || !!find(state.siths, s => s.apprentice && !s.apprentice.url)
  }
}

// start the app and load Darth Sidious
Bacon
  .combineTemplate({
    planet: planetChangedS,
    siths: sithsP
  })
  .map(state => ({...state, scrolls: updateScrolls(state)}))
  .map(App)
  .onValue(partialRight(render, document.getElementById("app")))

loadSith({idx: 0, url: "http://localhost:3000/dark-jedis/3616"})


function App(props) {
  const {planet, siths, scrolls: {upDisabled, downDisabled}} = props
  return (
    <div className="app-container">
      <div className="css-root">
        <h1 className="css-planet-monitor">Obi-Wan currently on {planet.name}</h1>

        <section className="css-scrollable-list">
          <ul className="css-slots">
            {siths.map(({idx, name, homeworld}) => (
              <li key={idx} className={"css-slot" + (homeworld && homeworld.id === planet.id ? " red" : "")}>
                <h3>{name ? name : null}</h3>
                <h6>{homeworld ? homeworld.name : null}</h6>
              </li>
            ))}
          </ul>
          <div className="css-scroll-buttons">
            <button className={"css-button-up" + (upDisabled ? " css-button-disabled" : "")}
                    disabled={upDisabled}
                    onClick={scrollUp} />
            <button className={"css-button-down" + (downDisabled ? " css-button-disabled" : "")}
                    disabled={downDisabled}
                    onClick={scrollDown} />
          </div>
        </section>
      </div>
    </div>
  )
}
