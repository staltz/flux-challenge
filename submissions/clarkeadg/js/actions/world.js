
/**
 * World Actions
 * @author Brian Clarke <https://github.com/clarkeadg>
 */

(function(App) {

  var actions = {

    changed: function(data) {
      App.dispatcher.trigger('World:changed', data);
    }

  };

  App.actions.world = actions;

})(App);
