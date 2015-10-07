/**
 * @flow
 */

'use strict';

import type {Action} from './Actions';

import Dispatcher from './Dispatcher';
import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import Sith from './Sith';
import SithDataManager from './SithDataManager';

const MAX_LENGTH = 5;
const EMPTY_SITH = new Sith();
const DEFAULT_LIST = Immutable.List(new Array(MAX_LENGTH).fill(EMPTY_SITH));

class SithStore extends ReduceStore<Immutable.List<Sith>> {
  getInitialState() {
    const requestID = SithDataManager.loadDarthSidius();
    return DEFAULT_LIST.set(2, new Sith({requestID}));
  }

  lastHasApprentice(): boolean {
    const state = this.getState();
    return !!state.get(state.size - 1).apprenticeID;
  }

  firstHasMaster(): boolean {
    const state = this.getState();
    return !!state.get(0).masterID;
  }

  reduce(state: Immutable.List<Sith>, action: Action): Immutable.List<Sith> {
    switch (action.type) {
      case 'scroll-down':
        if (this.lastHasApprentice()) {
          SithDataManager.abort(state.get(0).requestID);
          SithDataManager.abort(state.get(1).requestID);
          state = state.shift().shift().push(EMPTY_SITH).push(EMPTY_SITH);
        }
        return loadSiths(state);

      case 'scroll-up':
        if (this.firstHasMaster()) {
          SithDataManager.abort(state.get(state.size - 1).requestID);
          SithDataManager.abort(state.get(state.size - 2).requestID);
          state = state.pop().pop().unshift(EMPTY_SITH).unshift(EMPTY_SITH);
        }
        return loadSiths(state);

      case 'sith-loaded':
        state = state.map(sith => {
          return sith.requestID === action.sith.requestID
            ? action.sith
            : sith;
        });
        return loadSiths(state);

      default:
        return state;
    }
  }
}

/**
 * This will load the siths it has enough information to load. It will never
 * increase the size of the list.
 */
function loadSiths(state: Immutable.List<Sith>): Immutable.List<Sith> {
  return state.map((sith, index, list) => {
    // This is not the sith we are looking for.
    if (sith.requestID) {
      return sith;
    }

    // Check if there is a previous sith we can load the apprentice of.
    if (index > 0) {
      const prev = list.get(index - 1);
      if (prev.apprenticeID) {
        const requestID = SithDataManager.loadSith(prev.apprenticeID);
        return new Sith({requestID});
      }
    }

    // Check if there is a next sith we can load the master of.
    if (index < list.size - 1) {
      const next = list.get(index + 1);
      if (next.masterID) {
        const requestID = SithDataManager.loadSith(next.masterID);
        return new Sith({requestID});
      }
    }

    return sith;
  });
}

export default new SithStore(Dispatcher);
