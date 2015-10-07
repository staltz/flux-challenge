import React from 'react';
import { connect } from 'react-redux';

import {
  getJediSlots,
  wasJediBornInCurrentPlanet,
  wasAnyJediBornInCurrentPlanet
} from './queries';

import JediSlot from './JediSlot';
import NavButton from './NavButton';

function noFullJediIn(slots, position) {
  return !slots[position] || slots[position].fetching;
}

function jediWithMasterIn(slots, position) {
  return slots[position] && slots[position].master && slots[position].master.id;
}

function jediWithApprenticeIn(slots, position) {
  return slots[position] && slots[position].apprentice && slots[position].apprentice.id;
}

class App extends React.Component {
  render() {
    const { currentPlanet, slots, wasAnyJediBornInCurrentPlanet } = this.props;

    const canGoUp = !wasAnyJediBornInCurrentPlanet && (
      jediWithMasterIn(slots, 0) ||
      (jediWithMasterIn(slots, 1) && noFullJediIn(slots, 0)) ||
      (jediWithMasterIn(slots, 2) && noFullJediIn(slots, 1))
    );

    const canGoDown = !wasAnyJediBornInCurrentPlanet && (
      jediWithApprenticeIn(slots, 4) ||
      (jediWithApprenticeIn(slots, 3) && noFullJediIn(slots, 4)) ||
      (jediWithApprenticeIn(slots, 2) && noFullJediIn(slots, 3))
    );

    return <div className="css-root">
      <h1 className="css-planet-monitor">
        {currentPlanet ? `Obi-Wan currently on ${currentPlanet.name}` : '--'}
      </h1>

      <section className="css-scrollable-list">
        <ul className="css-slots">
          {slots.map((jedi, index) =>
            <JediSlot key={(jedi && jedi.id) || index} jedi={jedi} />
          )}
        </ul>

        <div className="css-scroll-buttons">
          <NavButton
            direction="up"
            disabled={!canGoUp}
            onClick={this.props.onGoUp} />
          <NavButton
            direction="down"
            disabled={!canGoDown}
            onClick={this.props.onGoDown} />
        </div>
      </section>
    </div>;
  }
}

export default connect(state => ({
  currentPlanet: state.currentPlanet,
  slots: getJediSlots(state).map(jedi => {
    return jedi ? {
      ...jedi,
      isInCurrentPlanet: wasJediBornInCurrentPlanet(state, jedi)
    } : null;
  }),
  wasAnyJediBornInCurrentPlanet: wasAnyJediBornInCurrentPlanet(state)
}), dispatch => ({
  onGoUp() { dispatch({ type: 'GO_UP' }) },
  onGoDown() { dispatch({ type: 'GO_DOWN' }) }
}))(App);
