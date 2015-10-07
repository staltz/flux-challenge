import request from 'superagent-bluebird-promise';
import { fromJS } from 'immutable';
import uuid from 'node-uuid';

import * as Actions from '../actions/actions';
import * as Effects from '../constants/effects';

const SERVER_URI = 'http://localhost:3000';

const buildSithGetUrl = sithId => `${SERVER_URI}/dark-jedis/${sithId}`;

const requests = {};

export default (effect, dispatch) => {
  const type = effect.type;
  const payload = effect.payload;

  switch (type) {
    case Effects.API_LOAD_SITH:
      const correlationId = uuid.v4();
      requests[correlationId] = request
        .get(buildSithGetUrl(payload.sithId))
        .then((response) => {
          delete requests[correlationId];
          dispatch(Actions.sithLoaded(JSON.parse(response.text), payload.scrollingDown))
        })
        .catch(ex => console.warn('Request has been canceled', ex));

      dispatch(Actions.sithLoadingStarted(payload.sithId, correlationId));
    break;
    case Effects.API_CANCEL_REQUEST:
      if (requests[payload]) {
        requests[payload].cancel();
        delete requests[payload];
      }
    break;
    case Effects.API_CONNECT_WS:
      const websocket = new WebSocket('ws://localhost:4000');
      websocket.onmessage = event => {
        dispatch(Actions.planetChanged(JSON.parse(event.data)));
      };
    break;
    default:
      console.warn(`Unhandled effect ${type}`);
  }
};
