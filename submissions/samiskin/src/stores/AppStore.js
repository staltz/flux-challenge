import _ from 'lodash';

import Store from 'Store';
import {SET_CURRENT_PLANET, REQUEST_MASTER, REQUEST_APPRENTICE} from 'actions/AppActions';
import {ADD_SITH} from 'actions/SithActions';
import SithStore from './SithStore';

const MAX_ITEMS = 5;

class AppStore {

  getState() {
    return Store.getState().app;
  }

  getCurrentPlanet() {
    return this.getState().currentPlanet;
  }

  getMasterRequests() {
    return this.getState().masterRequests;
  }

  getApprenticeRequests() {
    return this.getState().apprenticeRequests;
  }

  getMaxItems() {
    return MAX_ITEMS;
  }

  _lowerRequests(requestTracker) {
    requestTracker.requestCount -= 1;
    if (requestTracker.requestCount === 0) {
      requestTracker.currentRequest = null;
    }
  }

  requestMaster(state) {
    let masterRequests = _.assign({}, state.masterRequests);
    if (masterRequests.requestCount === 0) {
      masterRequests.currentRequest = SithStore.getHighestMaster().master.id;
    }
    masterRequests.requestCount++;

    let apprenticeRequests = _.assign({}, state.apprenticeRequests);
    if (apprenticeRequests.requestCount > 0) {
      this._lowerRequests(apprenticeRequests);
    }

    return _.assign({}, state, {masterRequests, apprenticeRequests});
  }

  requestApprentice(state) {
    let apprenticeRequests = _.assign({}, state.apprenticeRequests);
    if (apprenticeRequests.requestCount === 0) {
      apprenticeRequests.currentRequest = SithStore.getLowestApprentice().apprentice.id;
    }
    apprenticeRequests.requestCount++;

    let masterRequests = _.assign({}, state.masterRequests);
    if (masterRequests.requestCount > 0) {
      this._lowerRequests(masterRequests);
    }

    return _.assign({}, state, {masterRequests, apprenticeRequests});
  }

  handleNewSith(state, sith) {
    let masterRequests = _.assign({}, state.masterRequests);
    let apprenticeRequests = _.assign({}, state.apprenticeRequests);
    if (sith.id === masterRequests.currentRequest) {
      this._lowerRequests(masterRequests);
      if (masterRequests.requestCount > 0) {
        masterRequests.currentRequest = sith.master.id;
      }
    }
    if (sith.id === apprenticeRequests.currentRequest) {
      this._lowerRequests(apprenticeRequests);
      if (apprenticeRequests.requestCount > 0) {
        apprenticeRequests.currentRequest = sith.apprentice.id;
      }
    }

    return _.assign({}, state, {masterRequests, apprenticeRequests});
  }

  initialState = {
    currentPlanet: {
      name: 'Coruscant',
      id: 58
    },
    masterRequests: {
      currentRequest: null,
      requestCount: 0
    },
    apprenticeRequests: {
      currentRequest: 3616,
      requestCount: MAX_ITEMS
    }
  }

  reduce(state = this.initialState, action) {
    switch (action.type) {
    case SET_CURRENT_PLANET:
      return _.assign({}, state, {currentPlanet: action.data});
    case REQUEST_MASTER:
      return this.requestMaster(state);
    case REQUEST_APPRENTICE:
      return this.requestApprentice(state);
    case ADD_SITH:
      return this.handleNewSith(state, action.data);
    default:
      return state;
    }
  }

}

export default new AppStore();
