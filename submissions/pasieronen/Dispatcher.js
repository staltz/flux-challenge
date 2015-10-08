import Bacon from 'baconjs';

const buses = {};

function dispatch(actionType, value) {
  if (buses[actionType])
    buses[actionType].push(value);
}

function _getOrCreateBus(actionType) {
  if (!buses[actionType]) 
    buses[actionType] = new Bacon.Bus();
  return buses[actionType];
}

// Used by a store to listen for the given action types. 
// Returns an array of Bacon EventStreams (in the same order as parameters)
// (Note: stores should not use bus.push(), instead use dispatch() above)
function register(...actionTypes) {
  return actionTypes.map(_getOrCreateBus);
}

export default { dispatch, register };
