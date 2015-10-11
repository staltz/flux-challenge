import { URL, INITIAL_SITH_ID, MAX_VISIBLE_SITHS } from '../config';
import R from 'ramda';
import xhr from 'xhr';

export const OBI_WAN_MOVED = 'OBI_WAN_MOVED';
export const SCROLL_UP = 'SCROLL_UP';
export const SCROLL_DOWN = 'SCROLL_DOWN';
export const LOADING_SITH = 'LOADING_SITH';
export const ABORT_REQUEST = 'ABORT_REQUEST';
export const SITH_LOADED = 'SITH_LOADED';

function getEmptyMasterSpots(state) {
  return state.paddingTop;
}

function getEmptyApprenticeSpots(state) {
  return MAX_VISIBLE_SITHS - state.siths.length - state.paddingTop;
}

function getNextSithId(state, direction) {
  const topSith = R.head(state.siths);
  const bottomSith = R.last(state.siths);

  return (
    direction == SCROLL_DOWN &&
    getEmptyApprenticeSpots(state) > 0 &&
    R.isNil(state.onGoingApprenticeRequest) &&
    bottomSith.apprentice &&
    bottomSith.apprentice.id
  ) || (
    direction == SCROLL_UP &&
    getEmptyMasterSpots(state) > 0 &&
    R.isNil(state.onGoingMasterRequest) &&
    topSith.master &&
    topSith.master.id
  );
}

function getRequest(sithId) {
  let rawRequest;
  const promiseRequest = new Promise((resolve, reject) => {
    rawRequest = xhr({uri: `${URL}/${sithId}`}, (err, resp, body) => {
      if(err) {
        reject(err);
      } else if(resp.statusCode !== 200) {
        reject(new Error(
          `Wrong Request with code: ${resp.statusCode} and body: ${body}`
        ));
      } else {
        resolve(JSON.parse(body));
      }
    });
  });

  return { id: sithId, rawRequest, promiseRequest };
}

function cancelRequestIfNeeded(direction) {
  return (dispatch, getState) => {
    const state = getState();
    const requestToCancel = (
      direction == SCROLL_DOWN &&
      getEmptyMasterSpots(state) === 0 &&
      state.onGoingMasterRequest
    ) || (
      direction == SCROLL_UP &&
      getEmptyApprenticeSpots(state) === 0 &&
      state.onGoingApprenticeRequest
    );

    if(requestToCancel) {
      requestToCancel.rawRequest.abort();
      const oppositeDirection = direction == SCROLL_UP ?
        SCROLL_DOWN : SCROLL_UP;
      dispatch( {type: ABORT_REQUEST, direction: oppositeDirection });
    }
  }
}

function loadSithIfNeeded(direction) {
  return (dispatch, getState) => {
    const sithId = getNextSithId(getState(), direction);
    if(sithId) {
      const request = getRequest(sithId);
      dispatch({ type: LOADING_SITH, direction, request });
      request.promiseRequest.then((sith) => {
        dispatch({ type: SITH_LOADED, direction, sith });
        dispatch(loadSithIfNeeded(direction));
      });
    }
  }
}

export function initialRequest() {
  return (dispatch) => {
    getRequest(INITIAL_SITH_ID).promiseRequest.then((sith) => {
      dispatch({ type: SITH_LOADED, direction : SCROLL_DOWN, sith });
      dispatch(loadSithIfNeeded(SCROLL_UP));
      dispatch(loadSithIfNeeded(SCROLL_DOWN));
    });
  }
}

export function scroll(direction) {
  return (dispatch) => {
    dispatch({type: direction});
    dispatch(cancelRequestIfNeeded(direction));
    dispatch(loadSithIfNeeded(direction));
  }
}

export function obiWanMoved(planet) {
  return {
    type: OBI_WAN_MOVED,
    planet
  };
}
