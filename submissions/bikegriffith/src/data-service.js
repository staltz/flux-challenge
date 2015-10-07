const PLANET_WS_ADDRESS = 'ws://localhost:4000';
const SITH_ENDPOINT = 'http://localhost:3000/dark-jedis';
const FIRST_SITH_ID = 3616;


class ObiWanTracker {

  constructor() {
    this.ws = new WebSocket(PLANET_WS_ADDRESS);
    this.ws.onmessage = this.onWSMessage.bind(this);
    this.listeners = [];
    this.obiWanCurrentPlanet = {};
  }

  subscribe(callback) {
    this.listeners.push(callback);
  }

  onWSMessage(message) {
    this.obiWanCurrentPlanet = JSON.parse(message.data);
    this.listeners.forEach( cb => cb(this.obiWanCurrentPlanet) );
  }
}


class DataService {

  constructor() {
    this.obiWanTracker = new ObiWanTracker();
  }

  subscribe(callback) {
    this.obiWanTracker.subscribe(callback);
  }

  getLastObiWanPlanet() {
    return this.obiWanTracker.obiWanCurrentPlanet;
  }

  getSithLords(options, callback) {
    console.log('getting sith lords', options);
    var result = options.current;
    var next = function(id) {
      this.xhr = fetch(SITH_ENDPOINT+'/'+id)
                  .then(result => result.json())
                  .then(sithLord => {
                    console.log('got sith', sithLord);
                    if (options.reverse) {
                      result.splice(0, 0, sithLord);
                    } else {
                      result.push(sithLord);
                    }
                    if (result.length < options.max) {
                      next(options.reverse ? sithLord.apprentice.id : sithLord.master.id);
                      callback(result);
                    } else {
                      callback(result);
                    }
                  })
                  .catch(function(ex) {
                    console.error('failed', ex);
                  });
    }.bind(this);
    next(FIRST_SITH_ID);
  }
  
}

// Singleton
var dataService = new DataService();
export default dataService;
