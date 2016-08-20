import { DOWN, SITH_LOADED, UP } from '../actions';
import { MAX_VISIBLE_SITHS, N_SITHS_TO_SCROLL } from '../config';
import initialState from './initial-state';

export default (state = initialState.paddingTop, { type, payload }) => {
  switch (type) {
    case UP:
      return Math.min(MAX_VISIBLE_SITHS - 1, state + N_SITHS_TO_SCROLL);
    case DOWN:
      return Math.max(0, state - N_SITHS_TO_SCROLL);
    case SITH_LOADED:
      return payload.direction === UP && state > 0 ? state - 1 : state;
    default:
      return state;
  }
};
