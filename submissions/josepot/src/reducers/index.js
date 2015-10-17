import { combineReducers } from 'redux';
import currentPlanet from './currentPlanet';
import list from './list';
import onGoingRequests from './onGoingRequests';

export default combineReducers({
  currentPlanet,
  list,
  onGoingRequests
});
