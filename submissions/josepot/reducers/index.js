import { combineReducers } from 'redux';
import {
  OBI_WAN_MOVED, SCROLL_UP, SCROLL_DOWN,
  LOADING_SITH, ABORT_REQUEST, SITH_LOADED
} from '../actions';
import {
  MAX_VISIBLE_SITHS, N_SITHS_TO_SCROLL,
  INITIAL_SITH_ID
} from '../config';

const initialState = {
  currentPlanet : {},
  paddingTop : Math.trunc(MAX_VISIBLE_SITHS / 2),
  siths : [],
  onGoingMasterRequest : null,
  onGoingApprenticeRequest: {
    id: INITIAL_SITH_ID,
    rawRequest: null,
    promiseRequest: null
  }
}

function getOnGoingPropertyFromDirection(direction) {
  return direction == SCROLL_UP ?
    'onGoingApprenticeRequest' :
    'onGoingMasterRequest';
}

export default function rootReducer(state = initialState, action) {
  const requestProperty = getOnGoingPropertyFromDirection(action.direction);

  switch (action.type) {
    case LOADING_SITH:
      return Object.assign({}, state, {
        [requestProperty]: action.request,
      });

    case ABORT_REQUEST:
      return Object.assign({}, state, {
        [requestProperty]: null
      });

    case SITH_LOADED: {
      if(state[requestProperty].id !== action.sith.id) return state;

      const siths = (action.direction == SCROLL_UP) ?
        [...state.siths, action.sith] :
        [action.sith, ...state.siths]

      const paddingTop = (action.direction == SCROLL_UP) ?
        state.paddingTop :
        state.paddingTop - 1;

      return Object.assign({}, state, {
        [requestProperty]: null,
        paddingTop: paddingTop,
        siths: siths
      });
    }

    case SCROLL_DOWN: {
      let paddingTop = state.paddingTop - N_SITHS_TO_SCROLL;
      let siths = states.siths.slice(0);

      if (paddingTop < 0) {
        siths = state.siths.slice(
          R.min(Math.abs(paddingTop), state.siths.length - 1)
        );
        paddingTop = 0;
      }

      return Object.assign({}, state, {
        paddingTop: paddingTop,
        siths: siths
      });
    }

    case SCROLL_UP: {
      const paddingTop =
        R.min(state.paddingTop + N_SITHS_TO_SCROLL, MAX_VISIBLE_SITHS - 1);
      const nSiths = R.min(state.siths.length, MAX_VISIBLE_SITHS - paddingTop);
      const siths = state.siths.slice(0, nSiths);

      return Object.assign({}, state, {
        paddingTop: paddingTop,
        siths: siths
      });
    }

    case OBI_WAN_MOVED:
      return Object.assign({}, state, {
        currentPlanet: action.planet
      });

    default:
      return state;
  }
}
