const Rx = require(`rx`)
const Yolk = require(`yolk`)
const ListItem = require(`./ListItem`)
const EmptyListItem = require(`./EmptyListItem`)
const ListControls = require(`./ListControls`)
const {firstNonNullValue, lastNonNullValue} = require(`./util`)

module.exports = function App (props) {
  const planet$ = props.planet.distinctUntilChanged()
  const list$ = props.list.distinctUntilChanged()
  const dangerZone$ = props.dangerZone.distinctUntilChanged()

  const scrollUpDisabled$ =
    list$
    .map(firstNonNullValue)
    .filter(x => x)
    .map(item => !item.getIn([`master`, `id`]))
    .startWith(false)
    .combineLatest(dangerZone$, (a,b) => a || b)

  const scrollDownDisabled$ =
    list$
    .map(lastNonNullValue)
    .filter(x => x)
    .map(item => !item.getIn([`apprentice`, `id`]))
    .startWith(false)
    .combineLatest(dangerZone$, (a,b) => a || b)

  const slots$ =
    planet$.combineLatest(list$, (planet, list) => {
      return list.map(obj => {
        if (!obj) {
          return <EmptyListItem />
        }

        const danger = obj.get(`homeworld`).equals(planet)
        return <ListItem item={obj} danger={danger} />
      })
    })

  return (
    <div className="app-container">
      <div className="css-root">
        <h1 className="css-planet-monitor">Obi-Wan currently on {planet$.map(s => s.get(`name`))}</h1>

        <section className="css-scrollable-list">
          <ul className="css-slots">
            {slots$}
          </ul>

          <ListControls upDisabled={scrollUpDisabled$} downDisabled={scrollDownDisabled$} />
        </section>
      </div>
    </div>
  )
}
