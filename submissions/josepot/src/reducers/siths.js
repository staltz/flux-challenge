import { DOWN, SITH_LOADED, UP } from '../actions';
import { MAX_VISIBLE_SITHS, N_SITHS_TO_SCROLL } from '../config';
import initialState from './initial-state';

export default (oldPaddingTop, newPaddingTop) =>
  (state = initialState.siths, { type, payload: { direction, sith } = {} }) => {
    switch (type) {
      case UP: {
        const maxSize = MAX_VISIBLE_SITHS - newPaddingTop;
        return state.size > maxSize ?
          state.setSize(maxSize) :
          state;
      }
      case DOWN:
        return (newPaddingTop === 0 && oldPaddingTop < N_SITHS_TO_SCROLL) ?
          state.skip(
            Math.min(N_SITHS_TO_SCROLL - oldPaddingTop, state.size - 1)
          ) :
          state;
      case SITH_LOADED:
        return direction === DOWN ?
          state.push(sith) :
          state.unshift(sith);
      default:
        return state;
    }
  };
