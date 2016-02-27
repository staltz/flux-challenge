import Dispatcher from 'Dispatcher';

export const ADD_SITH = Symbol('ADD_SITH');
export const DELETE_SITH = Symbol('DELETE_SITH');

const API_PATH = 'http://localhost:3000';

// Makes a GET request to a specific url and wraps it up in a promise and an abort function
// Params:
//          url: String
// Returns:
//          {
//            promise: Promise - a promise that describes the GET request
//                               to url, resolving as the request response
//            abort: Function - A function to abort the request if necessary
//          }
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

  requestSith(sithId) {
    if (this.requests[sithId]) return;
    let payload = get(`${API_PATH}/dark-jedis/${sithId}`);
    payload.promise.then((response) => {
      Dispatcher.dispatch({type: ADD_SITH, data: JSON.parse(response)});
      delete this.requests[sithId];
    });
    this.requests[sithId] = payload;
  }

  cancelSithRequest(sithId) {
    if (this.requests[sithId]) {
      this.requests[sithId].abort();
      delete this.requests[sithId];
    }
  }

}

export default new SithActions();
