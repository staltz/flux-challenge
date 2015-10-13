import { combineReducers } from 'redux';
import currentPlanet from './currentPlanet';
import list from './list';
import onGoingRequests from './onGoingRequests';

const rootReducer  = combineReducers({
  currentPlanet,
  list,
  onGoingRequests
});

export default rootReducer;
