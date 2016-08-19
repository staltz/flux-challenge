import { combineReducers } from 'redux';

import currentPlanet from './current-planet';
import initialState from './initial-state';
import paddingTop from './padding-top';
import siths from './siths';

export default (state = initialState, action) => {
  const newPaddingTop = paddingTop(state.paddingTop, action);

  return combineReducers({
    currentPlanet,
    paddingTop: () => newPaddingTop,
    siths: siths(state.paddingTop, newPaddingTop),
  })(state, action);
};
