/**
 * @flow
 */

'use strict';

import AppView from './AppView';
import {Container} from 'flux/utils';
import CurrentPlanetSocket from './CurrentPlanetSocket';
import CurrentPlanetStore from './CurrentPlanetStore';
import Dispatcher from './Dispatcher';
import React, {Component} from 'react';
import SithStore from './SithStore';

class AppContainer extends Component {
  static getStores() {
    return [
      CurrentPlanetStore,
      SithStore,
    ];
  }

  static calculateState() {
    return {
      currentPlanet: CurrentPlanetStore.getState(),
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
    // There should be no rendering logic in a container. Its only job is to
    // interact with Flux and any other data (sockets in this case).
    return (
      <AppView
        currentPlanet={this.state.currentPlanet}
        siths={this.state.siths}
        onScrollUp={this._scrollUp}
        onScrollDown={this._scrollDown}
      />
    );
  }

  // Any interaction with Flux should be done within the container and passed
  // down to dumb components via props. This includes firing actions.

  _scrollUp() {
    Dispatcher.dispatch({type: 'scroll-up'});
  }

  _scrollDown() {
    Dispatcher.dispatch({type: 'scroll-down'});
  }
}

export default Container.create(AppContainer);
