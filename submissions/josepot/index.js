import 'babel-core/polyfill';
import configureStore from './store/configureStore';

const store = configureStore();

import {
  SCROLL_UP, SCROLL_DOWN,
  initialRequest, scroll, obiWanMoved
} from './actions';

console.log(store.getState());

let unsubscribe = store.subscribe( () =>
  console.log(store.getState())
);

store.dispatch(obiWanMoved({name: 'Mars', id: 1}));

store.dispatch(initialRequest());
