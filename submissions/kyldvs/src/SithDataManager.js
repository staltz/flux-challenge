/**
 * @flow
 */

'use strict';

import Dispatcher from './Dispatcher';
import Sith from './Sith';
import xhr from 'xhr';

const URL = 'http://localhost:3000/dark-jedis/';

// Keep track of requests so we can abort them later.
let counter = 1;
const requests = new Map();

const SithDataManager = {
  abort(requestID: ?number): void {
    if (requestID && requests.has(requestID)) {
      requests.get(requestID).abort();
      requests.delete(requestID);
    }
  },

  loadDarthSidius(): number {
    return SithDataManager.loadSith('3616');
  },

  loadSith(id: string): number {
    const requestID = counter++;
    const request = xhr({uri: URL + id}, (err, resp, body) => {
      requests.delete(requestID);
      validateErr(err);
      validateStatusCode(resp.statusCode);
      const data = JSON.parse(body);
      Dispatcher.dispatch({
        type: 'sith-loaded',
        sith: new Sith({
          apprenticeID: data.apprentice && data.apprentice.id,
          homeworldName: data.homeworld.name,
          masterID: data.master && data.master.id,
          name: data.name,
          requestID,
        }),
      });
    });
    requests.set(requestID, request);
    return requestID;
  }
}

function validateErr(err) {
  if (err) {
    throw err;
  }
}

function validateStatusCode(code) {
  if (code !== 200) {
    throw new Error('Request Failed with code: ' + code);
  }
}

export default SithDataManager;
