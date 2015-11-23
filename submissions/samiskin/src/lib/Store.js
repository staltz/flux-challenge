import _ from 'lodash';
import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
// import {devTools} from 'redux-devtools';

/*
   This class stores the main Redux Store and provides a wrapper
   class to it.  All app state is stored here, and each immediate
   property can be bound to a Store class.  An example of this
   would be if all user data was stored in a users property.
   The getStoreMap() function would then be:

    getStoreMap() {
      return {
        users: UserStore.getUsers()
      };
    }

 */

let stateStoreMap = {
};

class Store {
  constructor() {
    this.initializeStoreMap();
    this.partiallyReducedState = null;
    let logger = createLogger({
      level: 'info',
      duration: true,
      actionTransformer: (action) => _.assign({}, action, {type: action.type.toString()})
    });
    let createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
    this.store = createStoreWithMiddleware(this.reducer.bind(this));
  }

  initializeStoreMap() {
    let invertedMap = _.transform(stateStoreMap, (map, store, prop) => {
      return map.set(store, prop);
    }, new Map());

    let waitingSet = new Set();
    this.storeMap = new Map();
    _.forEach(stateStoreMap, (store) => waitingSet.add(store));

    let assignStore = (store) => {
      if (this.storeMap.has(store)) return;
      if (store === undefined || !waitingSet.has(store)) {
        throw new Error('Undefined store, check for circular dependencies in storeDependencies');
      }

      waitingSet.delete(store);
      if (Array.isArray(store.storeDependencies)) {
        store.storeDependencies.forEach((dependency) => assignStore(dependency));
      }
      this.storeMap.set(store, invertedMap.get(store));
    };

    while (waitingSet.size > 0) {
      let store = waitingSet.entries().next().value[0];
      assignStore(store);
    }
  }

  reduceFromStores(state, action) {
    let newState = {};
    this.partiallyReducedState = _.assign({}, state);

    for (let entry of this.storeMap) {
      let key = entry[1];
      let store = entry[0];

      if (!store.reduce) throw new Error(`${store.constructor.name} must provide a reduce function`);
      let value = store.reduce.bind(store)(state[key], action);
      if (!value) throw new Error(`${store.constructor.name}.reduce must provide a default value`);
      newState[key] = value || state[key]; // Default to old value
      this.partiallyReducedState[key] = newState[key];
    }
    this.partiallyReducedState = null;

    return newState;
  }


  getState() {
    return this.partiallyReducedState || this.store.getState();
  }

  subscribe(listener) {
    return this.store.subscribe(listener);
  }

  dispatch(action) {
    this.store.dispatch(action);
  }

  reducer(state = {}, action) {
    return this.reduceFromStores(state, action);
  }
}

export default new Store();
