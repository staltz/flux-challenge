import _ from 'lodash';
import Store from 'Store';

import AppStore from './AppStore';
import {ADD_SITH, DELETE_SITH} from 'actions/SithActions';
import {REQUEST_MASTER, REQUEST_APPRENTICE} from 'actions/AppActions';

/*
  Sith: {
    id: Number,
    name: String,
    url: String,
    homeworld: {
      id: Number,
      name: String
    },
    master: {
      url: String,
      id: Number
    },
    apprentice: {
      url: String,
      id: Number
    }
  }
}

*/

class SithStore {

  getSiths() {
    return Store.getState().siths;
  }

  getHighestMaster(sithId = null) {
    let siths = this.getSiths();
    sithId = sithId || _.keys(siths)[0];
    let sith = siths[sithId] || null;
    if (sith && sith.master && siths[sith.master.id]) {
      return this.getHighestMaster(sith.master.id);
    } else {
      return sith;
    }
  }

  getLowestApprentice(sithId = null) {
    let siths = this.getSiths();
    sithId = sithId || _.keys(siths)[0];
    let sith = siths[sithId] || null;
    if (sith && sith.apprentice && siths[sith.apprentice.id]) {
      return this.getLowestApprentice(sith.apprentice.id);
    } else {
      return sith;
    }
  }

  handleMasterRequest(oldSiths) {
    let siths = _.assign({}, oldSiths);
    let masterRequests = AppStore.getMasterRequests();
    if (masterRequests.requestCount + _.size(siths) > AppStore.getMaxItems()) {
      let lastSith = this.getLowestApprentice();
      delete siths[lastSith.id];
    }
    return siths;
  }

  handleApprenticeRequest(oldSiths) {
    let siths = _.assign({}, oldSiths);
    let apprenticeRequests = AppStore.getApprenticeRequests();
    if (apprenticeRequests.requestCount + _.size(siths) > AppStore.getMaxItems()) {
      let topSith = this.getHighestMaster();
      delete siths[topSith.id];
    }
    return siths;
  }

  storeDependencies = [AppStore]

  reduce(siths = {}, action) {
    switch (action.type) {
    case ADD_SITH:
      let update = {}; update[action.data.id] = action.data;
      return _.assign({}, siths, update);
    case DELETE_SITH:
      return _.omit(siths, action.data);
    case REQUEST_MASTER:
      return this.handleMasterRequest(siths);
    case REQUEST_APPRENTICE:
      return this.handleApprenticeRequest(siths);
    default:
      return siths;
    }
  }
}

export default new SithStore();
