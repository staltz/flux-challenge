
/**
 * Jedi Actions
 * @author Brian Clarke <https://github.com/clarkeadg>
 */

(function(App) {

  var actions = {

    getFirstJedi: function() {
      App.dispatcher.trigger('Jedi:getFirstJedi');
    },

    getMaster: function(data) {
      App.dispatcher.trigger('Jedi:getMaster', data);
    },

    getApprentice: function(data) {
      App.dispatcher.trigger('Jedi:getApprentice', data);
    },

    scrollUp: function(data) {
      App.dispatcher.trigger('Jedi:scrollUp', data);
    },

    scrollDown: function(data) {
      App.dispatcher.trigger('Jedi:scrollDown', data);
    }

  };

  App.actions.jedi = actions;

})(App);
