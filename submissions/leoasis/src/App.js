import React from 'react';
import { connect } from 'react-redux';

import {
  getJediSlots,
  wasJediBornInCurrentPlanet,
  wasAnyJediBornInCurrentPlanet
} from './queries';

import JediSlot from './JediSlot';
import NavButton from './NavButton';

class App extends React.Component {
  render() {
    const { currentPlanet, slots, wasAnyJediBornInCurrentPlanet } = this.props;

    const jedis = slots.filter(x => x);
    const firstJedi = jedis[0];
    const lastJedi = jedis[jedis.length - 1];
    const fullJediInTheMiddle = slots[2] && !slots[2].fetching;

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
            disabled={wasAnyJediBornInCurrentPlanet || !fullJediInTheMiddle || (firstJedi.master && !firstJedi.master.id)}
            onClick={this.props.onGoUp} />
          <NavButton
            direction="down"
            disabled={wasAnyJediBornInCurrentPlanet || !fullJediInTheMiddle || (lastJedi.apprentice && !lastJedi.apprentice.id)}
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
