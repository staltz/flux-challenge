const Yolk = require(`yolk`)
const Actions = require(`./Actions`)

module.exports = function ListControls ({upDisabled, downDisabled}) {
  const upDisabledClass$ = upDisabled.map(bool => bool ? `css-button-disabled` : ``)
  const downDisabledClass$ = downDisabled.map(bool => bool ? `css-button-disabled` : ``)

  const handleClickUp = this.createEventHandler()
  const handleClickDown = this.createEventHandler()

  handleClickUp.subscribe(Actions.shiftListDown)
  handleClickDown.subscribe(Actions.shiftListUp)

  return (
    <div className="css-scroll-buttons">
      <button className={["css-button-up", upDisabledClass$]} disabled={upDisabled} onClick={handleClickUp}></button>
      <button className={["css-button-down", downDisabledClass$]} disabled={downDisabled} onClick={handleClickDown}></button>
    </div>
  )
}
