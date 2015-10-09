
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

	return App;	

})(Config, Req, Dispatcher, Store);
