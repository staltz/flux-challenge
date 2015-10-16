import { SITHS_API } from '../config';
import R from 'ramda';
import xhr from 'xhr';
import { redMatch, getAvailableSpots, getNextSithToLoad } from '../selectors';

export const OBI_WAN_MOVED = 'OBI_WAN_MOVED';
export const UP = 'UP';
export const DOWN = 'DOWN';
export const LOADING_SITH = 'LOADING_SITH';
export const ABORT_REQUEST = 'ABORT_REQUEST';
export const SITH_LOADED = 'SITH_LOADED';
const ABORT_MSG = 'Internally aborted request';

function getRequest(sithId) {
  let request;
  const promise = new Promise((resolve, reject) => {
    request = xhr({uri: `${SITHS_API}/${sithId}`}, (err, resp, body) => {
      if(err) {
        reject(resp.statusCode === 0 ? new Error(ABORT_MSG) : err);
      } else if(resp.statusCode !== 200) {
        reject(new Error(
          `Wrong Request with code: ${resp.statusCode} and body: ${body}`
        ));
      } else {
        resolve(JSON.parse(body));
      }
    });
  });

  return { request, promise };
}

function getOppositeDirection(direction) {
  return direction === UP ? DOWN : UP;
}

function loadSiths(directions) {
  return (dispatch, getState) => {
    directions.forEach((direction) => {
      const nextSith = getNextSithToLoad(getState())(direction);

      if(nextSith && !R.isNil(nextSith.id)) {
        const requestWrap = getRequest(nextSith.id);

        dispatch({
          type: LOADING_SITH,
          direction,
          request: requestWrap.request
        });

        requestWrap.promise.then((sith) => {
          dispatch({
            type: SITH_LOADED,
            direction,
            sith
          });
          dispatch(
            redMatch(getState()) ?
              cancelUnnecessaryRequests([UP, DOWN]) :
              loadSiths([direction])
          );
        }, (err) => {
          if(err.message !== ABORT_MSG) throw err;
        });
      }
    });
  }
}

function cancelUnnecessaryRequests(directions) {
  return (dispatch, getState) => {
    const state = getState();

    directions.forEach((direction) => {
      const requestToCancel =
        (redMatch(state) || getAvailableSpots(state)(direction) === 0) &&
        state.onGoingRequests[direction];

      if(requestToCancel) {
        requestToCancel.abort();
        dispatch({
          type: ABORT_REQUEST,
          direction
        });
      }
    });
  }
}

export function initialRequest() {
  return (dispatch) => dispatch(loadSiths([DOWN]));
}

export function scroll(direction) {
  return (dispatch) => {
    dispatch({ type: direction });
    dispatch(cancelUnnecessaryRequests([getOppositeDirection(direction)]));
    dispatch(loadSiths([direction]));
  }
}

export function obiWanMoved(planet) {
  return (dispatch, getState) => {
    const homeworldFoundPrev = redMatch(getState());
    dispatch({
      type: OBI_WAN_MOVED,
      planet
    });
    const homeworldFoundPost = redMatch(getState());

    if(homeworldFoundPrev !== homeworldFoundPost) {
      const action = homeworldFoundPost ? cancelUnnecessaryRequests : loadSiths;
      R.compose(dispatch, R.partial(action, [UP, DOWN]))();
    }
  }
}
