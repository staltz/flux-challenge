import React from 'react';
import Component from 'Component';
import AppStore from 'stores/AppStore';

import css from './styles/TitleDisplay.css';

export default class TitleDisplay extends Component {

  syncState() {
    return {
      currentPlanet: AppStore.getCurrentPlanet()
    };
  }

  render() {
    return (
      <h1 className={css.base}>
        Obi-Wan currently on {this.state.currentPlanet}
      </h1>
    );
  }

}
