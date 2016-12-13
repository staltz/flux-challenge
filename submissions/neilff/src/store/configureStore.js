import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import Immutable from 'Immutable';
import agentMiddleware from '../middleware/agent';
import rootReducer from '../reducers';
import { devTools } from 'redux-devtools';

const logger = createLogger({
  collapsed: true,
  level: 'info',
  transformer: (state) => {
    const newState = {};
    for (const i of Object.keys(state)) {
      if (Immutable.Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    }
    return newState;
  },
});

export default function configureStore(initialState = {}) {
  const store = compose(
    applyMiddleware(
      agentMiddleware,
      thunkMiddleware,
      logger
    ),
    devTools(),
  )(createStore)(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
