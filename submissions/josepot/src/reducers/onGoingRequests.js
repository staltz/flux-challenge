import R from 'ramda';
import {
  LOADING_SITH, ABORT_REQUEST, SITH_LOADED
} from '../actions';
import { INITIAL_SITH_ID } from '../config';

const initialState = {
  UP: null,
  DOWN: null
};

export default function onGoingRequests(state = initialState, action) {
  const direction = action.direction;
  const result = R.compose(
    R.merge(state),
    R.createMapEntry(direction)
  );

  switch (action.type) {
    case LOADING_SITH:
      return result(action.request);

    case ABORT_REQUEST:
    case SITH_LOADED:
      return result(null);

    default:
      return state;
  }
}
