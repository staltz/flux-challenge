var Dispatcher = require('../dispatcher/Dispatcher');

module.exports = {

  newJedi(jedi) {
    var action = {
      'type': 'NEW_JEDI',
      'jedi': jedi
    };
    Dispatcher.dispatch(action);
    return action;
  },

  seekMasters() {
    var action = {
      'type': 'SEEK_MASTERS',
    };
    Dispatcher.dispatch(action);
    return action;
  },

  seekApprentices() {
    var action = {
      'type': 'SEEK_APPRENTICES',
    };
    Dispatcher.dispatch(action);
    return action;
  }

};
