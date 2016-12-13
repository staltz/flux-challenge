import {
  AGENT,
  ON_PLANET_UPDATE,
  LOAD_SITH_LORD_SUCCESS,
  RESET_LOADING_STATE,
} from '../constants';

import {
  isPromise,
  isDefined,
  isArray,
} from '../utils';

import invariant from 'invariant';
import R from 'ramda';

let pendingRequests = {};

function cancelAllPendingRequests() {
  const keys = R.keys(pendingRequests);
  console.info('Canceling all requests :: ', keys);

  keys.map(i => {
    pendingRequests[i].abort();
    delete pendingRequests[i];
  });
}

export default function agentMiddleware({ getState, dispatch }) {
  return next => action => {
    if (action.type === LOAD_SITH_LORD_SUCCESS || action.type === ON_PLANET_UPDATE) {
      const planetId = action.payload.id || getState().planet.id;
      const planetMatches = getState().sithLords.filter(i => {
        return i.getIn(['homeworld', 'id']) === planetId;
      }).size > 0;

      if (planetMatches) {
        dispatch({
          type: RESET_LOADING_STATE,
        });

        cancelAllPendingRequests();
      }
    }

    if (typeof action[AGENT] === 'undefined') {
      return next(action);
    }

    const {
      types,
      payload,
      meta,
    } = action[AGENT];

    if (pendingRequests[meta.requestID]) {
      console.info('Request is already pending :: ', meta.requestID);
      return false;
    }

    invariant(
      isDefined(types) && isArray(types) && types.length === 3,
      '[AGENT] types property must contain an array with three action types.'
    );

    invariant(
      isPromise(payload),
      '[AGENT] payload must be a promise.'
    );

    const [
      PENDING,
      FULFILLED,
      REJECTED,
    ] = types;

    dispatch({
      type: PENDING,
      payload: {
        meta,
        requestObject: payload,
      },
    });

    pendingRequests[meta.requestID] = payload;

    const visibleLordsIDs = getState().sithLords.map(i => i.get('id')).toJS();
    const pendingRequestIDs = R.map(i => parseInt(i))(R.keys(pendingRequests));
    const deadRequests = R.difference(pendingRequestIDs, visibleLordsIDs);

    console.info('Current Lord IDs :: ', visibleLordsIDs);
    console.info('Pending Requests :: ', pendingRequestIDs);
    console.info('Dead Requests :: ', deadRequests);

    deadRequests.map(i => {
      pendingRequests[i].abort();
      delete pendingRequests[i];
    });

    payload
      .end((err, res) => {
        delete pendingRequests[meta.requestID];

        if (err) {
          const response = {
            ...error,
            meta,
          };

          dispatch({
            type: REJECTED,
            payload: response,
          });
        } else {
          const response = {
            data: res.body,
            meta,
          };

          dispatch({
            type: FULFILLED,
            payload: response,
          });
        }
      });
  };
}
