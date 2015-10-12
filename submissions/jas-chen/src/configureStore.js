import { combineReducers, createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'
import { Observable } from 'rx';
import slots from './reducer/slots.js';
import obiWanLocation from './reducer/obiWanLocation.js';

const rootReducer = combineReducers({ slots, obiWanLocation });

export default function configureStore(initialState) {
  // enable redux logger if you want
  // const newCreateStore = applyMiddleware(createLogger())(createStore);
  // const store = newCreateStore(rootReducer, initialState);
  const store = createStore(rootReducer, initialState);

  const state$ = Observable.create(observer => {
    observer.onNext(store.getState());
    store.subscribe(() => observer.onNext(store.getState()));
  });

  store.state$ = state$;

  return store;
}
