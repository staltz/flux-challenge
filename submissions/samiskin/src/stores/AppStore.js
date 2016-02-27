import _ from 'lodash';

import Store from 'Store';
import {SET_CURRENT_PLANET, REQUEST_MASTER, REQUEST_APPRENTICE} from 'actions/AppActions';
import {ADD_SITH} from 'actions/SithActions';
import SithStore from './SithStore';

const DEFAULT_REQUEST = 3616;
const MAX_ITEMS = 5;


// This store describes the current app state.  These are temporary states
// that are reset when the user opens the page again.
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

  // Helper function to lower the request count of masterRequests or apprenticeRequests
  // requestTracker: {requestCount: Number, currentRequest: Object}
  _lowerRequests(requestTracker) {
    requestTracker.requestCount -= 1;
    if (requestTracker.requestCount === 0) {
      requestTracker.currentRequest = null;
    }
  }


  // Helper function to request a new sith, either a master or apprentice
  // state:     Object
  // isMaster:  Boolean  - assumed apprentice if false
  _requestSith(state, isMaster) {
    let sithRequests = _.assign({}, isMaster ? state.masterRequests : state.apprenticeRequests);
    let otherRequests = _.assign({}, isMaster ? state.apprenticeRequests : state.masterRequests);

    if (sithRequests.requestCount === 0) {
      let nextSith = isMaster ?
        SithStore.getHighestMaster().master : SithStore.getLowestApprentice().apprentice;
      sithRequests.currentRequest = nextSith.id;
    }
    sithRequests.requestCount++;

    // If we were also currently requesting a sith of the other type,
    // cancel the latest other request, since we only allow a constant
    // number of updated siths (MAX_ITEMS)
    if (otherRequests.requestCount > 0) {
      this._lowerRequests(otherRequests);
    }

    let masterRequests = isMaster ? sithRequests : otherRequests;
    let apprenticeRequests = isMaster ? otherRequests : sithRequests;
    return _.assign({}, state, {masterRequests, apprenticeRequests});
  }

  requestMaster(state) {
    return this._requestSith(state, true);
  }

  requestApprentice(state) {
    return this._requestSith(state, false);
  }

  handleNewSith(state, sith) {
    let masterRequests = _.assign({}, state.masterRequests);
    let apprenticeRequests = _.assign({}, state.apprenticeRequests);

    // If a master request was completed
    if (sith.id === masterRequests.currentRequest) {
      this._lowerRequests(masterRequests);
      if (masterRequests.requestCount > 0) {
        masterRequests.currentRequest = sith.master.id;
      }
    }
    // If an apprentice request was completed
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
      currentRequest: DEFAULT_REQUEST, // We start out requesting apprentices
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
