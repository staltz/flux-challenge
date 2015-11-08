const Rx = require(`rx`)
const Im = require(`immutable`)

const Actions = {
  visitPlanet: new Rx.Subject(),
  replaceInList: new Rx.Subject(),
  shiftListDown: new Rx.Subject(),
  shiftListUp: new Rx.Subject(),
}

const visitPlanet$ =
  Actions.visitPlanet
  .map(planet => state => {
    const imPlanet = Im.fromJS(planet)
    return state.set(`planet`, imPlanet)
  })

const replaceInList$ =
  Actions.replaceInList
  .map(({obj, index}) => state => {
    const imObj = Im.fromJS(obj)
    return state.update(`list`, list => list.set(index, imObj))
  })

const shiftListDown$ =
  Actions.shiftListDown
  .map(() => state => {
    return state.update(`list`, list => list.unshift(null).unshift(null).pop().pop())
  })

const shiftListUp$ =
  Actions.shiftListUp
  .map(() => state => {
    return state.update(`list`, list => list.push(null).push(null).shift().shift())
  })

const register$ = Rx.Observable.merge(
  visitPlanet$,
  replaceInList$,
  shiftListDown$,
  shiftListUp$
)

Actions.register = (updates => register$.subscribe(updates))

module.exports = Actions
