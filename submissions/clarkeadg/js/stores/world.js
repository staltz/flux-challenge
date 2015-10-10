
(function (App) {	

	App.dispatcher.on('World:changed',function(data){
		//console.log('World:changed',data)
		if (typeof data != 'undefined' && data.name) {
			App.views.world.render(data.name);		
		}
	});

})(App);
