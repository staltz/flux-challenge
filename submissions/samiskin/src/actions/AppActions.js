import Dispatcher from 'Dispatcher';

export const SET_CURRENT_PLANET = Symbol('SET_CURRENT_PLANET');
export const REQUEST_MASTER = Symbol('REQUEST_MASTER');
export const REQUEST_APPRENTICE = Symbol('REQUEST_APPRENTICE');

class AppActions {

  setCurrentPlanet(planet) {
    Dispatcher.dispatch({type: SET_CURRENT_PLANET, data: planet});
  }

  requestMaster() {
    Dispatcher.dispatch({type: REQUEST_MASTER});
  }

  requestApprentice() {
    Dispatcher.dispatch({type: REQUEST_APPRENTICE});
  }

}

export default new AppActions();
