
(function (App) {

	App.dispatcher.on('System:worldChanged',function(data){
		console.log('store',data)
		//App.store.set(store.jedis,data,data);
	});

})(App);
