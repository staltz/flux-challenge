var Dispatcher = require('../dispatcher/Dispatcher');

module.exports = {
  'newWorld': function(worldId, worldName) {
    var action = {
      'type': 'NEW_WORLD',
      'id': worldId,
      'name': worldName
    };
    Dispatcher.dispatch(action);
    return action;
  }
};
