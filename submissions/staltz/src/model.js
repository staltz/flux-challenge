import {Observable} from 'rx'
import Immutable from 'immutable'
import {thereIsAMatch, firstSithHasMaster, lastSithHasApprentice} from './util'

const initialState = Immutable.fromJS({
  planet: null,
  list: [null, null, null, null, null],
})

const calculateHomeworldMatches = planet => list =>
  list.map(sith => {
    if (sith) {
      return sith.set('matched', sith.get('homeworld').get('id') === planet.get('id'))
    } else {
      return sith
    }
  })

const fitNewSithIntoList = newSith => list => {
  const indexAsMaster = list
    .findIndex(sith => sith && sith.get('master').get('id') === newSith.get('id')) - 1
  const indexAsApprentice = list
    .findIndex(sith => sith && sith.get('apprentice').get('id') === newSith.get('id')) + 1

  if (indexAsMaster >= 0 && indexAsMaster < list.size - 1) {
    return list.set(indexAsMaster, newSith)
  }
  if (indexAsApprentice >= 1 && indexAsApprentice < list.size) {
    return list.set(indexAsApprentice, newSith)
  }
  if (list.every(x => x === null)) {
    return list.set(Math.floor(list.size / 2), newSith)
  }
  return list
}

function makeUpdate$(planet$, sithResponse$, actions) {
  const updateStateWithPlanet$ = planet$
    .map(x => Immutable.fromJS(x))
    .map(planet => function updateStateWithPlanet(oldState) {
      return oldState
        .set('planet', planet)
        .update('list', calculateHomeworldMatches(planet))
    })

  const updateStateWithResponse$ = sithResponse$
    .map(x => Immutable.fromJS(x))
    .map(sith => function updateStateWithResponse(oldState) {
      return oldState
        .update('list', fitNewSithIntoList(sith))
        .update('list', calculateHomeworldMatches(sith))
    })

  const updateStateWhenScrolled$ = actions.scroll$
    .map(delta => function updateStateWhenScrolled(oldState) {
      if (thereIsAMatch(oldState.toJS())) {
        return oldState
      }
      const amount = Math.abs(delta)
      if (delta > 0 && firstSithHasMaster(oldState.toJS())) {
        return oldState.update('list', list =>
          list.unshift(...Array(amount)).skipLast(amount).map(x => x ? x : null)
        )
      }
      if (delta < 0 && lastSithHasApprentice(oldState.toJS())) {
        return oldState.update('list', list =>
          list.push(...Array(amount)).skip(amount).map(x => x ? x : null)
        )
      }
      return oldState
    })

  return Observable.merge(
    updateStateWithPlanet$,
    updateStateWithResponse$,
    updateStateWhenScrolled$
  )
}

function model(planet$, response$, actions) {
  const update$ = makeUpdate$(planet$, response$, actions)
  return update$
    .startWith(initialState)
    .scan((state, update) => update(state))
    .map(s => s.toJS())
    .shareReplay(1)
}

export default model
