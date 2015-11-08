const Rx = require(`rx`)
const Im = require(`immutable`)

module.exports = function State () {
  const initialState = Im.fromJS({
    planet: {id: null, name: null},
    list: [null, null, null, null, null],
  })

  this.updates = new Rx.BehaviorSubject(initialState)
  this.asObservable = this.updates.scan((state, op) => op(state)).shareReplay(1)

  this.planet = this.asObservable.map(p => p.get(`planet`))
  this.list = this.asObservable.map(p => p.get(`list`))

  // hiiiiigh way to the danger zooooone #topgun
  this.dangerZone = this.planet.combineLatest(this.list, (planet, list) => {
    return !!list.find(item => item && item.get(`homeworld`).equals(planet))
  })
}
