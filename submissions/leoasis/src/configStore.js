import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'
import reducer from './reducer';

export default function configStore() {
  return applyMiddleware(createLogger())(createStore)(reducer);
}
