import Rx from 'rx'
import Cycle from '@cycle/core'
import {makeDOMDriver} from '@cycle/dom'
import {makeHTTPDriver} from '@cycle/http'
import {makeWSDriver} from './drivers'
import http from './http'
import intent from './intent'
import model from './model'
import view from './view'

function main(sources) {
  const planet$ = sources.WS.map(msg => JSON.parse(msg.data)).shareReplay(1)
  const proxyState$ = new Rx.ReplaySubject(1)
  const {request$, response$} = http(sources.HTTP, proxyState$)
  const actions = intent(sources.DOM)
  const state$ = model(planet$, response$, actions)
  const vtree$ = view(state$)
  state$.subscribe(proxyState$)

  return {
    HTTP: request$,
    DOM: vtree$,
  }
}

const drivers = {
  DOM: makeDOMDriver('.app-container'),
  HTTP: makeHTTPDriver(),
  WS: makeWSDriver('ws://localhost:4000'),
}

Cycle.run(main, drivers)
