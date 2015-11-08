const Yolk = require(`yolk`)

module.exports = function ListItem ({item, danger}) {
  const name$ = item.map(p => p.get(`name`))
  const homeworld$ = item.map(p => p.getIn([`homeworld`, `name`]))

  const style$ = danger.map(bool => {
    return {
      color: bool ? `red` : ``
    }
  })

  return (
    <li style={style$} className="css-slot">
      <h3>{name$}</h3>
      <h6>Homeworld: {homeworld$}</h6>
    </li>
  )
}
