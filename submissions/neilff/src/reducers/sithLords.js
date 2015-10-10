import {
  LOAD_SITH_LORD_REQUEST,
  LOAD_SITH_LORD_SUCCESS,
  LOAD_NEXT_SITH_LORDS,
  LOAD_PREV_SITH_LORDS,
  RESET_LOADING_STATE,
} from '../constants';

import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS([
  {
    idx: 0,
    id: null,
    name: null,
    requestID: null,
    isLoading: false,
  },
  {
    idx: 1,
    id: null,
    name: null,
    requestID: null,
    isLoading: false,
  },
  {
    idx: 2,
    id: 3616,
    name: null,
    requestID: null,
    isLoading: false,
  },
  {
    idx: 3,
    id: null,
    name: null,
    requestID: null,
    isLoading: false,
  },
  {
    idx: 4,
    id: null,
    name: null,
    requestID: null,
    isLoading: false,
  },
]);

const sithLordsReducer = handleActions({
  [LOAD_SITH_LORD_SUCCESS]: (state, { payload }) => {
    const requestID = payload.meta.requestID;
    const foundIdx = state.find(i => i.get('requestID') === requestID);

    if (!foundIdx) {
      return state;
    }

    const idx = foundIdx.get('idx');

    state = state.mergeIn([idx], fromJS(payload.data));

    if (idx + 1 <= 4) {
      state = state.setIn([idx + 1, 'id'], payload.data.master.id);
    }

    if (idx - 1 >= 0) {
      state = state.setIn([idx - 1, 'id'], payload.data.apprentice.id);
    }

    return state;
  },
  [LOAD_SITH_LORD_REQUEST]: (state, { payload }) => {
    const idx = payload.meta.position.toString();
    const requestID = payload.meta.requestID;

    if (!idx || !requestID) {
      return state;
    }

    state = state.setIn([idx, 'isLoading'], true);
    return state.setIn([idx, 'requestID'], requestID);
  },
  [LOAD_NEXT_SITH_LORDS]: (state) => {
    const nextId = state.getIn(['4', 'master', 'id']);

    return state
      .skip(2)
      .mergeIn([3], fromJS({
        idx: 3,
        id: nextId,
        name: null,
        isLoading: false,
        requestID: null,
      }))
      .mergeIn([4], fromJS({
        idx: 4,
        id: null,
        name: null,
        isLoading: false,
        requestID: null,
      }))
      .map((i, idx) => i.set('idx', idx));
  },
  [LOAD_PREV_SITH_LORDS]: (state) => {
    const nextId = state.getIn(['0', 'apprentice', 'id']);

    return state
      .take(3)
      .unshift(fromJS({
        idx: 1,
        id: nextId,
        name: null,
        isLoading: false,
        requestID: null,
      }))
      .unshift(fromJS({
        idx: 0,
        id: null,
        name: null,
        isLoading: false,
        requestID: null,
      }))
      .map((i, idx) => i.set('idx', idx));
  },
  [RESET_LOADING_STATE]: (state) => {
    return state.map(i => i.set('isLoading', false));
  },
}, INITIAL_STATE);

export default sithLordsReducer;
