import _ from 'lodash';
import {createStore, applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
// import {devTools} from 'redux-devtools';
import {fluxEnhancer} from 'redux-flux-store';

import AppStore from 'stores/AppStore';
import SithStore from 'stores/SithStore';

let logger = createLogger({
  level: 'info',
  duration: true,
  actionTransformer: (action) => _.assign({}, action, {type: action.type.toString()})
});

let middleware = [thunk];
if (true) {// dev
  middleware.push(logger);
  middleware.push(require('redux-immutable-state-invariant')());
}

let finalCreateStore = compose(
  fluxEnhancer({
    app: AppStore,
    siths: SithStore
  }),
  applyMiddleware(...middleware)
)(createStore);

let store = finalCreateStore();

export default store;
