import R from 'ramda';
import { combineReducers } from 'redux';
import currentPlanet from './currentPlanet';
import list from './list';
import onGoingRequests from './onGoingRequests';
import redMatch from './redMatch';

function mainReducer(state, action) {
  return {
    currentPlanet: currentPlanet(state.currentPlanet, action),
    list: list(state.list, action),
    onGoingRequests: onGoingRequests(state.onGoingRequests, action)
  };
}

export default function rootReducer(state = {}, action) {
  return R.merge(
    redMatch(state, action),
    mainReducer(state, action)
  );
}

