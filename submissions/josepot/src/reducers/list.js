import R from 'ramda';
import {
  SITH_LOADED, UP, DOWN
} from '../actions';
import {
  MAX_VISIBLE_SITHS, N_SITHS_TO_SCROLL
} from '../config';

const initialState = {
  siths: [],
  paddingTop : 0
};

export default function list(state = initialState, action) {

  switch (action.type) {

    case SITH_LOADED: {
      const siths = action.direction === UP ?
        [action.sith, ...state.siths] :
        [...state.siths, action.sith];
      const paddingTop = action.direction == UP ?
        state.paddingTop - 1:
        state.paddingTop;

      return { siths, paddingTop };
    }

    case UP: {
      const paddingTop =
        R.min(state.paddingTop + N_SITHS_TO_SCROLL, MAX_VISIBLE_SITHS - 1);
      const nSiths = R.min(state.siths.length, MAX_VISIBLE_SITHS - paddingTop);
      const siths = state.siths.slice(0, nSiths);

      return { siths, paddingTop };
    }

    case DOWN: {
      let paddingTop = state.paddingTop - N_SITHS_TO_SCROLL;
      let siths = state.siths;

      if (paddingTop < 0) {
        const nSithsToRemove = R.min(
          Math.abs(paddingTop),
          state.siths.length - 1
        );

        siths = state.siths.slice(nSithsToRemove);
        paddingTop = 0;
      }

      return { siths, paddingTop };
    }

    default:
      return state;
  }
}
