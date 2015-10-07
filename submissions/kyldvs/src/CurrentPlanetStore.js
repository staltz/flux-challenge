/**
 * @flow
 */

'use strict';

import type {Action} from './Actions';

import Dispatcher from './Dispatcher';
import {ReduceStore} from 'flux/utils';

class CurrentPlanetStore extends ReduceStore<string> {
  getInitialState() {
    return 'Unknown Planet';
  }

  reduce(state: string, action: Action): string {
    switch (action.type) {
      case 'change-current-planet':
        return action.name;

      default:
        return state;
    }
  }
}

export default new CurrentPlanetStore(Dispatcher);
