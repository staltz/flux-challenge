'use strict';

import {SithLord} from 'empire.js';
import {Store, Actions} from 'store.js';

/** Request abstraction, has state (active/finished) and can be aborted **/
class Request {

  constructor(url) {
    this.url = url;
    this.isActive = false;
    this.isFinished = false;
  }

  start(callback) {
    this.process = superagent.get(this.url);
    this.isActive = true;
    this.process.end((err, res) => {
      this.isActive = false;
      this.isFinished = true;
      callback(res);
    });
  }

  abort() {
    if (this.isActive) {
      this.process.abort();
      this.isActive = false;
      this.isFinished = true;
    }
  }
}

/** Sith Lords database, only one active request in a time **/
export class SithLordsDataBase {

  constructor() {
    this.requestsQueue = [];

    Store.listen(state => {
      // if UI is 'frozen' - stop all current request and clean up the queue
      if (state.isFrozen) {
        this.stopLoading();
        this.removeAll();
      } else if (!_.isEmpty(state.nextRequests)) {
        // if there are new Sith Lords to load - merge them with current:
        // 1. stop and remove all 'out of date' requests (no need them anymore in list)
        var expiredRequests = _.filter(this.requestsQueue, request => { return !_.contains(state.nextRequests, request.url); });
        this.stopLoading(expiredRequests);
        this.removeFinished();
        // 2. add 'new' requests in the queue, avoiding duplications
        var newRequests = _.filter(state.nextRequests, url => {
          return !_.find(this.requestsQueue, {url: url});
        });
        if (!_.isEmpty(newRequests)) {
          _.each(newRequests, this.load.bind(this));
        } else {
          this.startLoading();
        }
      }
    });
  }

  hasActiveRequests() {
    return _.any(this.requestsQueue, {isActive: true});
  }

  stopLoading(requests = this.requestsQueue) {
    _.each(requests, request => { request.abort(); });
  }

  removeFinished() {
    this.requestsQueue = _.filter(this.requestsQueue, {isFinished: false});
  }

  removeAll() {
    this.requestsQueue = [];
  }

  /* start loading all pending request one by one */
  startLoading() {
    if (!this.hasActiveRequests() && !_.isEmpty(this.requestsQueue)) {
      var request = _.first(this.requestsQueue);
      request.start(res => {
        this.removeFinished();
        this.startLoading();
        Actions.sithLordInformationLoading(new SithLord(res.body));
      });
    }
  }

  /* add a new request in a queue */
  load(url) {
    this.requestsQueue.push(new Request(url));
    this.startLoading();
  }
}