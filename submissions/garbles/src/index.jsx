const Yolk = require(`yolk`)
const App = require(`./App`)
const State = require(`./State`)
const Actions = require(`./Actions`)
const createWebSocketObservable = require(`./createWebSocketObservable`)
const createListPopulator = require(`./createListPopulator`)

const START_URL = `http://localhost:3000/dark-jedis/3616`

const state = new State()
Actions.register(state.updates)

createWebSocketObservable(`ws://localhost:4000`)
  .map(msg => JSON.parse(msg.data))
  .subscribe(Actions.visitPlanet)

createListPopulator(state.list, state.dangerZone, START_URL)
  .subscribe(Actions.replaceInList)

Yolk.render(<App {...state} />, document.querySelector(`#container`))
