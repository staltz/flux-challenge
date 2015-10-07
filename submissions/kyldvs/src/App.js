/**
 * @flow
 */

'use strict';

import {Container} from 'flux/utils';
import CurrentPlanetSocket from './CurrentPlanetSocket';
import CurrentPlanetStore from './CurrentPlanetStore';
import DangerZoneStore from './DangerZoneStore';
import Dispatcher from './Dispatcher';
import React, {Component} from 'react';
import SithStore from './SithStore';

class App extends Component {
  static getStores() {
    return [
      CurrentPlanetStore,
      DangerZoneStore,
      SithStore,
    ];
  }

  static calculateState() {
    return {
      currentPlanet: CurrentPlanetStore.getState(),
      firstHasMaster: SithStore.firstHasMaster(),
      inTheDangerZone: DangerZoneStore.inTheDangerZone(),
      lastHasApprentice: SithStore.lastHasApprentice(),
      siths: SithStore.getState(),
    };
  }

  componentWillMount() {
    CurrentPlanetSocket.init();
  }

  componentWillUnmount() {
    CurrentPlanetSocket.close();
  }

  render() {
    return (
      <div className="app-container">
        <div className="css-root">
          <h1 className="css-planet-monitor">
            Obi-Wan currently on {this.state.currentPlanet}
          </h1>
          <section className="css-scrollable-list">
            <ul className="css-slots">
              {this._renderListElements()}
            </ul>
            <div className="css-scroll-buttons">
              {this._renderUpButton()}
              {this._renderDownButton()}
            </div>
          </section>
        </div>
      </div>
    );
  }

  _renderListElements() {
    const {currentPlanet} = this.state;
    return this.state.siths.map(sith => {
      const {requestID, name, homeworldName} = sith;
      return (
        <li
          className="css-slot"
          key={requestID}
          style={homeworldName === currentPlanet ? {color: '#f00'} : undefined}>
          <h3>{name ? name : ''}</h3>
          <h6>{homeworldName ? 'Homeworld: ' + homeworldName : ''}</h6>
        </li>
      );
    });
  }

  _renderUpButton() {
    if (!this.state.firstHasMaster || this.state.inTheDangerZone) {
      return <button className="css-button-up css-button-disabled" />;
    }
    return <button className="css-button-up" onClick={this._scrollUp} />;
  }

  _renderDownButton() {
    if (!this.state.lastHasApprentice || this.state.inTheDangerZone) {
      return <button className="css-button-down css-button-disabled" />;
    }
    return <button className="css-button-down" onClick={this._scrollDown} />;
  }

  _scrollUp() {
    Dispatcher.dispatch({type: 'scroll-up'});
  }

  _scrollDown() {
    Dispatcher.dispatch({type: 'scroll-down'});
  }
}

export default Container.create(App);
