
(function (App, $) {

	var $el = $('.css-planet-monitor');

	var view = {
		init: function() {
			var ws = new WebSocket(App.config.api.websocket);
			ws.onmessage = function (event) {
				if (typeof event != 'undefined' && event.data) {
					App.actions.world.changed(JSON.parse(event.data));
				}
			};
		},
		render: function(data) {
			$el.text('Obi-Wan currently on '+data);
		}
	};

	App.views.world = view;

})(App, jQuery);
