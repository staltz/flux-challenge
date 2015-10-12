import React from "react"
import Bacon from "baconjs"
import http from "reqwest"
import {render} from "react-dom"
import {range, partialRight, values, sortBy, flatten, compact, find, isEqual} from "lodash"
import {createAction} from "megablob"

const MAX_SITHS = 5
const SCROLL = 2

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
  scrollUp.$.map(SCROLL).merge(scrollDown.$.map(-SCROLL))

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
      [sithsScrolledS], (siths, idxDelta) => (
        isScrollPossible(siths, idxDelta) ?
          values(siths).reduce((acc, sith) => {
            const newIdx = sith.idx + idxDelta
            const inList = newIdx >= 0 && newIdx < MAX_SITHS
            return inList ? {...acc, [newIdx]: {...sith, idx: newIdx}} : acc
          }, initialSiths)
          : siths
      )
    )
    .map(hash => sortBy(values(hash), "idx"))

const appStateP =
  Bacon
    .combineTemplate({
      planet: planetChangedS,
      siths: sithsP
    })
    .map(state => ({...state, danger: isPlanetHomeWorldForListedSiths(state.planet, state.siths)}))
    .map(state => ({...state, scrolls: {
      upOk: !state.danger && isScrollPossible(state.siths, SCROLL) && !find(state.siths, s => s.master && !s.master.url),
      downOk: !state.danger && isScrollPossible(state.siths, -SCROLL) && !find(state.siths, s => s.apprentice && !s.apprentice.url)
    }}))

// send load/cancel events based on current planet & siths
// we can safely send cancel/load sith events every time when state
// changes because .skipDuplicates removes the duplicate events per idx
// in "sithLoadedS" stream
loadSith.$.plug(
  appStateP
    .changes()
    .skipWhile(({siths}) => !find(siths, s => s.id))   // we must wait Darth Sidious first!!
    .map(({siths, planet}) => {
      if (isPlanetHomeWorldForListedSiths(planet, siths)) {
        return createCancelEvents()
      } else {
        return createEventsPerSithSlot(siths)
      }
    })
    .flatMap(Bacon.fromArray)
)

// start the app and load Darth Sidious
appStateP
  .map(App)
  .onValue(partialRight(render, document.getElementById("app")))

loadSith({idx: 0, url: "http://localhost:3000/dark-jedis/3616"})


function isPlanetHomeWorldForListedSiths(planet, siths) {
  return !!find(siths, s => s.homeworld && s.homeworld.id === planet.id)
}

function createCancelEvents() {
  return range(MAX_SITHS).map(idx => ({idx}))
}

function isScrollPossible(siths, idxDelta) {
  return !!find(siths, s => s.id && s.idx + idxDelta >= 0 && s.idx + idxDelta < MAX_SITHS)
}

function createEventsPerSithSlot(siths) {
  return siths.map(({idx, id}) => {
    const master = siths[idx - 1]
    const apprentice = siths[idx + 1]
    if (master && master.apprentice && master.apprentice.url && master.apprentice.id !== id) {
      // this slot was removed due to scroll-up
      return {idx, url: master.apprentice.url}
    } else if (apprentice && apprentice.master && apprentice.master.url && apprentice.master.id !== id) {
      // this slot was removed due to scroll-down
      return {idx, url: apprentice.master.url}
    } else {
      // cancel requests for this slot (if any)
      return {idx}
    }
  })
}

function App(props) {
  const {planet, siths, scrolls: {upOk, downOk}} = props
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
            <button className={"css-button-up" + (!upOk ? " css-button-disabled" : "")}
                    disabled={!upOk}
                    onClick={scrollUp} />
            <button className={"css-button-down" + (!downOk ? " css-button-disabled" : "")}
                    disabled={!downOk}
                    onClick={scrollDown} />
          </div>
        </section>
      </div>
    </div>
  )
}
