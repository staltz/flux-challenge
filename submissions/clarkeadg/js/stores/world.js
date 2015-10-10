
(function (App) {

	var store = {
		name: ''
	};

	App.dispatcher.on('World:changed',function(data){
		//console.log('World:changed',data)
		if (typeof data != 'undefined' && data.name) {
			store.name = data.name;
			App.views.world.render();
			App.views.jedis.render();
		}
	});

	App.stores.world = store;

})(App);
