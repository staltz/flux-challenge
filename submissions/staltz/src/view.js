import {h} from '@cycle/dom';
import hh from 'hyperscript-helpers';
import {thereIsAMatch, firstSithHasMaster, lastSithHasApprentice} from './util'
const {div, h1, h3, h6, ul, li, button, section} = hh(h);

function planetMonitor(state) {
  return h1('.css-planet-monitor',
    state.planet ? `Obi-Wan currently on ${state.planet.name}` : ''
  )
}

function slots(state) {
  return ul('.css-slots', state.list.map(sith =>
    sith ?
    li('.css-slot', {style: {color: sith.matched ? 'red' : null}}, [
      h3(sith.name),
      h6(`Homeworld: ${sith.homeworld.name}`)
    ]) :
    li('.css-slot')
  ))
}

function scrollButtons(state) {
  const upBttnStyle = thereIsAMatch(state) || !firstSithHasMaster(state) ?
    '.css-button-disabled' : ''
  const downBttnStyle = thereIsAMatch(state) || !lastSithHasApprentice(state) ?
    '.css-button-disabled' : ''

  return (
    div('.css-scroll-buttons', [
      button('.scroll-up.css-button-up' + upBttnStyle),
      button('.scroll-down.css-button-down' + downBttnStyle)
    ])
  )
}

function view(state$) {
  return state$.map(state =>
    div('.css-root', [
      planetMonitor(state),
      section('.css-scrollable-list', [
        slots(state),
        scrollButtons(state)
      ])
    ])
  )
}

export default view
