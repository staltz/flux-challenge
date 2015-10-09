
var App = (function (Config, Req, Dispatcher, Store) {
	
	var App = blocks.Application({
		history: 'pushState'
	});

	App.config = Config;
	App.req = Req;
	App.dispatcher = Dispatcher;
	App.store = Store;
	App.stores = {};
	App.actions = {};

	var ws = new WebSocket(App.config.api.websocket);
	ws.onmessage = function (event) {
		var data = JSON.parse(event.data);
		App.actions.system.worldChanged(data);
	};

	return App;	

})(Config, Req, Dispatcher, Store);
