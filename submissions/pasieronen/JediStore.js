import Dispatcher from './Dispatcher';
import * as JediConstants from './JediConstants';
import Bacon from 'baconjs';
import * as $ from 'jquery';

const LIST_SIZE = 5;
const SCROLL_BY = 2;

const [start, scrollUp, scrollDown, jediLoaded, worldChanged] = Dispatcher.register(
  JediConstants.START, 
  JediConstants.SCROLL_UP, 
  JediConstants.SCROLL_DOWN, 
  JediConstants.JEDI_LOADED, 
  JediConstants.WORLD_CHANGED
);

// The store state consists of two Bacon.js properties (streams of immutable values):
// - currentWorld: as received from the web socket (or undefined in the beginning)
// - jedis: a five-element array, where each element is either undefined, a loading 
//   placeholder, or as received from the server (with a "worldMatched" boolean added)

start.onValue(value => { 
  const ws = new WebSocket(value.websocketUrl);
  Bacon.fromEventTarget(ws, "message").onValue(event => {
    Dispatcher.dispatch(JediConstants.WORLD_CHANGED, JSON.parse(event.data));
  });
});

const currentWorld = worldChanged.toProperty(undefined);

const jedis = Bacon.update(Array(LIST_SIZE),
  [start], (state, value) => {
    return [loadOne(value.firstJediId, value.firstJediUrl), ...state.slice(1)];
  },
  [scrollUp], (state) => {
    cancelRequests(state.slice(-SCROLL_BY));
    return loadMore([...Array(SCROLL_BY), ...state.slice(0, -SCROLL_BY)]);
  },
  [scrollDown], (state) => {
    cancelRequests(state.slice(0, SCROLL_BY));
    return loadMore([...state.slice(SCROLL_BY), ...Array(SCROLL_BY)]);
  },
  [jediLoaded, currentWorld], (state, newJedi, world) => {
    return cancelOrLoadMore(state.map(jedi => (jedi && jedi.id == newJedi.id) ? updateJediWorldMatched(newJedi, world) : jedi));
  },
  [worldChanged], (state, world) => {
    return cancelOrLoadMore(state.map(jedi => updateJediWorldMatched(jedi, world)));
  }
);

const combinedState = Bacon.combineTemplate({
  currentWorld,
  jedis
});

export { combinedState as state };

function cancelOrLoadMore(jedis) {
  const shouldCancel = jedis.find(jedi => jedi && jedi.worldMatched);
  return shouldCancel ? cancelRequests(jedis) : loadMore(jedis);
}

// Find undefined slots in the "jedis" array, and load them if possible
function loadMore(jedis) {
  const ret = [];
  for (let i = 0; i < jedis.length; i++) {
    if (!jedis[i]) {
      let me;
      if (jedis[i-1] && jedis[i-1].apprentice && jedis[i-1].apprentice.url)
        me = jedis[i-1].apprentice;
      else if (jedis[i+1] && jedis[i+1].master && jedis[i+1].master.url)
        me = jedis[i+1].master;
      else
        me = undefined; 
      ret.push(me ? loadOne(me.id, me.url) : undefined);
    } else {
      ret.push(jedis[i]);
    }
  }
  return ret;
}

// Start loading one jedi, trigger JEDI_LOADED action when done, return a loading placeholder
function loadOne(id, url) {
  // note: second argument means unsubscribe calls .abort()
  const ajax = Bacon.fromPromise($.get(url), true);
  const unsubscribe = ajax.subscribe(event => {
    if (event.isNext())
      Dispatcher.dispatch(JediConstants.JEDI_LOADED, event.value())
  });
  return { loading: true, id, unsubscribe };
}

function cancelRequests(jedis) {
  return jedis.map(jedi => {
    if (jedi && jedi.loading) {
      jedi.unsubscribe();
      return undefined;
    } else {
      return jedi;
    }
  });
}

// Set worldMatched property for one jedi
function updateJediWorldMatched(jedi, world) {
  if (!jedi)
    return jedi; 
  else
    return {...jedi, worldMatched: (jedi.homeworld && world && jedi.homeworld.id==world.id)};
}
