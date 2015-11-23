import _ from 'lodash';
import Dispatcher from 'Dispatcher';

const API_PATH = 'http://localhost:3000';

export const ADD_SITH = Symbol('ADD_SITH');
export const DELETE_SITH = Symbol('DELETE_SITH');

function get(url) {
  let req = new XMLHttpRequest();
  return {
    promise: new Promise((resolve, reject) => {
      req.open('GET', url);
      req.onload = () => {
        if (req.status === 200) resolve(req.response);
        else reject(Error(req.statusText));
      };
      req.onerror = () => reject(Error('Network Error'));
      req.send();
    }),
    abort: () => req.abort()
  };
}

class SithActions {

  constructor() {
    this.requests = {}; // sithId -> {promise, abort()}
  }

  deleteSith(sithId) {
    Dispatcher.dispatch({type: DELETE_SITH, data: sithId});
    if (this.requests[sithId]) {
      this.requests[sithId].abort();
      delete this.requests[sithId];
    }
  }


  requestSith(partialSith) {
    _.extend(partialSith, {name: '', homeworld: {name: ''}, master: {id: null, url: null}, apprentice: {id: null, url: null}});
    Dispatcher.dispatch({type: ADD_SITH, data: partialSith});

    let payload = get(`${API_PATH}/dark-jedis/${partialSith.id}`);
    payload.promise.then((response) => {
      Dispatcher.dispatch({type: ADD_SITH, data: JSON.parse(response)});
      delete this.requests[partialSith.id];
    });
    this.requests[partialSith.id] = payload;
  }

}

export default new SithActions();
