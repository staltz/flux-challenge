import { combineReducers } from 'redux';
import planet from './planet';
import sithLords from './sithLords';

const rootReducer = combineReducers({
  planet,
  sithLords,
});

export default rootReducer;
