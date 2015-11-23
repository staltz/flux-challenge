import _ from 'lodash';

import Store from 'Store';
import {SET_CURRENT_PLANET} from 'actions/AppActions';

class AppStore {

  getState() {
    return Store.getState().app;
  }

  getCurrentPlanet() {
    return this.getState().currentPlanet;
  }

  reduce(state = {currentPlanet: 'Coruscant'}, action) {
    switch (action.type) {
    case SET_CURRENT_PLANET:
      return _.assign({}, state, {currentPlanet: action.data});
    default:
      return state;
    }
  }

}

export default new AppStore();
