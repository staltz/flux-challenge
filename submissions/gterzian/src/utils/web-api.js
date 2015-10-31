import $ from "jquery"
import Q from "q";
import Immutable from 'immutable';

import WorldActions from '../actions/WorldActions';
import JediActions from '../actions/JediActions';

let lastRequest = null;
let lastSecondRequest = null;

module.exports = {
  openWs() {
    new WebSocket('ws://localhost:4000').onmessage = (event) => {
      const world = JSON.parse(event.data);
      WorldActions.newWorld(world.id, world.name);
    }
  },

  getJedi(url, side) {
    let deferred = Q.defer();
    if(lastRequest) {
      lastRequest.abort();
    }
    lastRequest = $.getJSON(url).done(first => {
      JediActions.newJedi(first);
      if(lastSecondRequest) {
        lastSecondRequest.abort();
      }
      if (side === 'Master') {
        lastSecondRequest = $.getJSON(first.master.url).done(second => {
          JediActions.newJedi(second);
        });
      }
      else {
        lastSecondRequest = $.getJSON(first.apprentice.url).done(second => {
          JediActions.newJedi(second);
        });
      }
      deferred.resolve(first);
    })
    return deferred.promise;
  },

  cancelRequests() {
    Immutable.List([lastRequest, lastSecondRequest]).forEach(req => {
      if (req) {
        req.abort();
      }
    });
  }

};
