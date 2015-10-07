/**
 * @flow
 */

'use strict';

import type {Action} from './Actions';

import CurrentPlanetStore from './CurrentPlanetStore';
import Dispatcher from './Dispatcher';
import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import Sith from './Sith';
import SithDataManager from './SithDataManager';

type State = Immutable.List<Sith>;

const MAX_LENGTH = 5;
const EMPTY_SITH = new Sith();
const DEFAULT_LIST = Immutable.List(new Array(MAX_LENGTH).fill(EMPTY_SITH));

class SithStore extends ReduceStore<State> {
  getInitialState(): State {
    const requestID = SithDataManager.loadDarthSidius();
    return DEFAULT_LIST.set(2, new Sith({requestID}));
  }

  reduce(state: State, action: Action): State {
    switch (action.type) {
      case 'scroll-down':
        if (state.last().apprenticeID) {
          state = shift2(state);
        }
        return loadSiths(state);

      case 'scroll-up':
        if (state.first().masterID) {
          state = pop2(state);
        }
        return loadSiths(state);

      case 'sith-loaded':
        state = sithLoaded(state, action.sith);
        state = loadSiths(state);
        state = abortIfInDanger(state, getCurrentPlanet());
        return state;

      // Since there is only one action in CurrentPlanetStore this is trivial
      // to add here. If there were many actions in CurrentPlanetStore instead
      // we could wait for the store and check CurrentPlanetStore.hasChanged().
      case 'change-current-planet':
        state = loadSiths(state);
        state = abortIfInDanger(state, getCurrentPlanet());
        return state;

      default:
        return state;
    }
  }
}

function sithLoaded(state: State, next: Sith): State {
  return state.map(sith => sith.requestID === next.requestID ? next : sith);
}

/**
 * Helper function to shift and abort the first 2 Sith. It will push 2 empty
 * Sith in order to not change the size of the state.
 */
function shift2(state: State): State {
  SithDataManager.abort(state.get(0).requestID);
  SithDataManager.abort(state.get(1).requestID);
  return state.shift().shift().push(EMPTY_SITH).push(EMPTY_SITH);
}

/**
 * Helper function to pop and abort the last 2 Sith. It will unshift 2 empty
 * Sith in order to not change the size of the state.
 */
function pop2(state: State): State {
  SithDataManager.abort(state.get(state.size - 1).requestID);
  SithDataManager.abort(state.get(state.size - 2).requestID);
  return state.pop().pop().unshift(EMPTY_SITH).unshift(EMPTY_SITH);
}

/**
 * This will load the siths it has enough information to load. It will never
 * increase the size of the list.
 */
function loadSiths(state: State): State {
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

/**
 * This will abort any requests that have no completed when any homeworlds
 * match the current planet.
 */
function abortIfInDanger(state: State, currentPlanet: string): State {
  const inDanger = state.some(sith => sith.homeworldName === currentPlanet);
  if (inDanger) {
    return state.map(sith => {
      // This is one way to check if the request is in flight.
      if (sith.requestID && !sith.name) {
        SithDataManager.abort(sith.requestID);
        return EMPTY_SITH;
      }
      return sith;
    });
  }
  return state;
}

/**
 * This is a getter for the current planet. It makes the assumption that we
 * are in a dispatch. If used outside of a dispatch it will invariant.
 *
 * Note that this function is not pure. Simple functions with a very clear
 * purpose are one way to connect information between two stores without having
 * to collapse them into one larger store.
 */
function getCurrentPlanet(): string {
  Dispatcher.waitFor([CurrentPlanetStore.getDispatchToken()]);
  return CurrentPlanetStore.getState();
}

export default new SithStore(Dispatcher);
