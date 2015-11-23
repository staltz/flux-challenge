import Dispatcher from 'Dispatcher';

export const SET_CURRENT_PLANET = Symbol('SET_CURRENT_PLANET');

class AppActions {

  setCurrentPlanet(planet) {
    Dispatcher.dispatch({type: SET_CURRENT_PLANET, data: planet});
  }

}

export default new AppActions();
