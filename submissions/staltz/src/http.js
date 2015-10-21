import {Observable} from 'rx'
import {thereIsAMatch} from './util'

const API_PATH = 'http://localhost:3000'
const DARTH_SIDIOUS_ID = 3616

function isSithInList(sith, list) {
  return list.findIndex(s => s !== null && s.id === sith.id) !== -1
}

function isSithMissingFromList(sith, list) {
  const first = list[0]
  const last = list[list.length - 1]
  const isMasterOfFirst = first !== null && first.master.id === sith.id
  const isApprenticeOfLast = last !== null && last.apprentice.id === sith.id
  return !isSithInList(sith, list) && !isMasterOfFirst && !isApprenticeOfLast
}

function missingSiths(state) {
  return Observable.from(state.list)
    .filter(sith => sith !== null)
    .flatMap(sith => [sith.master, sith.apprentice])
    .filter(sith =>
      sith.id !== null &&
      isSithMissingFromList(sith, state.list) &&
      !thereIsAMatch(state)
    )
}

function stateHash(state) {
  const matchedHash = String(state.list.findIndex(s => s !== null && s.matched))
  const listHash = state.list.map(s => s ? s.id : 'null').join('-')
  return listHash + matchedHash
}

function http(HTTPSource, state$) {
  const request$ = state$
    .distinctUntilChanged(stateHash)
    .flatMap(missingSiths)
    .map(sith => sith.url)
    .startWith(API_PATH + `/dark-jedis/${DARTH_SIDIOUS_ID}`)

  const response$ = HTTPSource
    // When there is match, cancel all previous pending requests
    // `switch` has the cancelling logic.
    .merge(state$.filter(thereIsAMatch).map(() => Observable.just(null)))
    .switch()
    .filter(x => Boolean(x))
    .map(res => res.body)
    .shareReplay(1)

  return {request$, response$}
}

export default http
