import {
  AGENT,
  LOAD_SITH_LORD_REQUEST,
  LOAD_SITH_LORD_SUCCESS,
  LOAD_SITH_LORD_ERROR,
  LOAD_NEXT_SITH_LORDS,
  LOAD_PREV_SITH_LORDS,
} from '../constants';

import { fetchDarkJedi } from '../api';

function loadSithLord(requestID, position) {
  return {
    [AGENT]: {
      types: [
        LOAD_SITH_LORD_REQUEST,
        LOAD_SITH_LORD_SUCCESS,
        LOAD_SITH_LORD_ERROR,
      ],
      payload: fetchDarkJedi(requestID),
      meta: {
        position,
        requestID,
      },
    },
  };
}

function loadNextSithLords() {
  return {
    type: LOAD_NEXT_SITH_LORDS,
  };
}

function loadPrevSithLords() {
  return {
    type: LOAD_PREV_SITH_LORDS,
  };
}

export default {
  loadSithLord,
  loadNextSithLords,
  loadPrevSithLords,
};
