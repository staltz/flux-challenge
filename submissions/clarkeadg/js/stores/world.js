
(function (App) {

	App.dispatcher.on('World:changed',function(data){
		//console.log('World:changed',data)
		App._views.Jedis.world(data.name);
	});

})(App);
