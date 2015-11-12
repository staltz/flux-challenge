const Rx = require(`rx-dom`)
const {firstNonNullValue, lastNonNullValue} = require(`./util`)

function listHasEmptySlots (list) {
  const count = list.count(x => x === null)
  return (count > 0 && count < 5)
}

function mapUrlAndIndexForNeighbourOfNullValue (list) {
  if (list.first() === null) {
    const first = firstNonNullValue(list)
    const index = list.indexOf(first) - 1
    const url = first.getIn([`master`, `url`])
    return {url, index}
  }

  const last = lastNonNullValue(list)
  const index = list.indexOf(last) + 1
  const url = last.getIn([`apprentice`, `url`])

  return {url, index}
}

module.exports = function createListPopulator (list$, dangerZone$, startWithUrl) {
  const enabled$ = dangerZone$.distinctUntilChanged().filter(bool => bool === false)
  const disabled$ = dangerZone$.distinctUntilChanged().filter(bool => bool === true)

  return enabled$.flatMapLatest(() => {
    return list$
      .distinctUntilChanged()
      .filter(listHasEmptySlots)
      .map(mapUrlAndIndexForNeighbourOfNullValue) // get the neighbour of the first null space
      .filter(({url}) => url !== null) // neighbour next to null does not have a master/apprentice to fill null space
  })
  .startWith({url: startWithUrl, index: 0})
  .flatMapLatest(({url, index}) => {
    return Rx.DOM.getJSON(url).map(obj => ({obj, index})).takeUntil(disabled$)
  })
}
