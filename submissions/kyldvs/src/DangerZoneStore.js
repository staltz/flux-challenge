/**
 * @flow
 */

'use strict';

import type {Action} from './Actions';

import CurrentPlanetStore from './CurrentPlanetStore';
import Dispatcher from './Dispatcher';
import {ReduceStore} from 'flux/utils';
import SithStore from './SithStore';

const STORES = [CurrentPlanetStore, SithStore];
const TOKENS = STORES.map(store => store.getDispatchToken());

class DangerZoneStore extends ReduceStore<boolean> {
  getInitialState() {
    return false;
  }

  // Cooler name.
  inTheDangerZone() {
    return this.getState();
  }

  reduce(state: boolean, action: Action): boolean {
    // This is cheap enough we could just compute it on the fly every single
    // time in render, but building it as a derived store just to show how.
    Dispatcher.waitFor(TOKENS);
    if (STORES.some(store => store.hasChanged())) {
      const currentPlanet = CurrentPlanetStore.getState();
      return SithStore
        .getState()
        .some(sith => sith.homeworldName === currentPlanet);
    }
    return state;
  }
}

export default new DangerZoneStore(Dispatcher);
