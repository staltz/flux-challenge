
(function (App, $) {

	var $world = $('.css-planet-monitor');

	App.dispatcher.on('World:changed',function(data){
		//console.log('World:changed',data)
		if (typeof data != 'undefined' && data.name) {
			$world.text('Obi-Wan currently on '+data.name);
		}
	});

})(App, jQuery);
