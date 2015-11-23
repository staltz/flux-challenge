import _ from 'lodash';
import Dispatcher from 'Dispatcher';

const API_PATH = 'http://localhost:3000';

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
    this.requestingSiths = new Set();
    this.requests = {}; // sithId -> {promise, abort()}
  }

  setCurrentSithRequests(siths = []) {
    if (siths.length === 0) {
      siths = [{id: 3616}];
    }
    let requestingSiths = new Set(this.requestingSiths);
    let newSithRequests = new Set();
    _.forEach(siths, (sith) => {
      if (requestingSiths.has(sith.id)) {
        requestingSiths.delete(sith.id);
      } else {
        newSithRequests.add(sith.id);
      }
    });

    // Any siths not being requested anymore need to have their requests cancelled
    for (let sithId of requestingSiths) {
      this.requestingSiths.delete(sithId);
      this.requests[sithId].abort();
    }

    for (let sithId of newSithRequests) {
      let payload = get(`${API_PATH}/dark-jedis/${sithId}`);
      payload.promise.then((response) => {
        console.log(response);
        this.requestingSiths.delete(sithId);
        delete this.requests[sithId];
      });
      this.requestingSiths.add(sithId);
      this.requests[sithId] = payload;
    }

    // let {promise, abort} = get(`${API_PATH}/dark-jedis/3616`);
    // let response = await promise;
  }

}

export default new SithActions();
