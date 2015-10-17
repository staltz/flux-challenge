import { SITHS_API } from '../config';
import R from 'ramda';
import xhr from 'xhr';
import { redMatch, sithsToLoad, requestsToCancel } from '../selectors';

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

function loadSiths() {
  return (dispatch, getState) => {
    sithsToLoad(getState())
    .map((sithToLoad) => {
      return {
        direction: sithToLoad.direction,
        req: getRequest(sithToLoad.id)
      };
    })
    .forEach(({ direction, req }) => {
      dispatch({
        type: LOADING_SITH,
        direction,
        request: req.request
      });

      req.promise.then((sith) => {
        dispatch({ type: SITH_LOADED, direction, sith });

        const dispatchNext = redMatch(getState()) ?
          cancelUnnecessaryRequests :
          loadSiths;
        R.compose(dispatch, dispatchNext)();
      },
      (err) => {
        if(err.message !== ABORT_MSG) throw err
      });
    });
  }
}

function cancelUnnecessaryRequests() {
  return (dispatch, getState) => {
    requestsToCancel(getState()).forEach(({ request, direction }) => {
      request.abort();
      dispatch({ type: ABORT_REQUEST, direction });
    });
  }
}

export function initialRequest() {
  return (dispatch) => dispatch(loadSiths([DOWN]));
}

export function scroll(direction) {
  return (dispatch) => {
    dispatch({ type: direction });
    dispatch(cancelUnnecessaryRequests());
    dispatch(loadSiths());
  }
}

export function obiWanMoved(planet) {
  return (dispatch, getState) => {
    const redMatchBefore = redMatch(getState());
    dispatch({
      type: OBI_WAN_MOVED,
      planet
    });
    const redMatchAfter = redMatch(getState());

    if(redMatchBefore !== redMatchAfter) {
      const action = redMatchAfter ? cancelUnnecessaryRequests : loadSiths;
      R.compose(dispatch, action)();
    }
  }
}
