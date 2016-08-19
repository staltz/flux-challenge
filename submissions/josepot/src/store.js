import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

const store = compose(
  applyMiddleware(sagaMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)(rootReducer);

store.runSaga = sagaMiddleware.run;

export default store;
