
(function (App) {

	App.dispatcher.on('App:start',function(){
		console.log('App:start',App.config.api.websocket);
		var ws = new WebSocket(App.config.api.websocket);
		ws.onmessage = function (event) {
			//if (typeof event != 'undefined' && event.data) {
				App.actions.world.changed(JSON.parse(event.data));
			//}
		};

		App.actions.jedi.getDarthSidious();
	});

})(App);
