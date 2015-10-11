
/**
 * World View
 * @author Brian Clarke <https://github.com/clarkeadg>
 */

(function(App, $) {

  var view = {
    $el: {},
    init: function($cont) {
      this.$el = $('<h1 class="css-planet-monitor"></h1>');
      $cont.append(this.$el);
      var ws = new WebSocket(App.config.api.websocket);
      ws.onmessage = function(event) {
        if (typeof event != 'undefined' && event.data) {
          App.actions.world.changed(JSON.parse(event.data));
        }
      };
    },
    render: function(data) {
      this.$el.text('Obi-Wan currently on ' + App.stores.world.name);
    }
  };

  App.views.world = view;

})(App, jQuery);
