import _ from 'lodash';
import Store from 'Store';

import {ADD_SITH, DELETE_SITH} from 'actions/SithActions';

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

  reduce(siths = {}, action) {
    switch (action.type) {
    case ADD_SITH:
      let update = {}; update[action.data.id] = action.data;
      return _.assign({}, siths, update);
    case DELETE_SITH:
      return _.omit(siths, action.data);
    default:
      return siths;
    }
  }
}

export default new SithStore();
