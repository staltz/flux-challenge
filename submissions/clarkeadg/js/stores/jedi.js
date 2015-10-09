
(function (App) {

	App.dispatcher.on('Jedi:getDarthSidious',function(){
		//console.log('Jedi:getDarthSidious');
		
		var call = App.config.api.host + App.config.api.get.jedis + App.config.jedis.darthSidious.id;
		var params = {
		};

		App.req.get(call,params,function(data){
			console.log(data);
			App._views.Jedis.jedis.push(data);
			getMaster(data);
			getAprentice(data);
		});
	});

	App.dispatcher.on('Jedi:getMaster',function(data){
		//console.log('Jedi:getMaster',data);
		
		var call = data.url;
		var params = {
		};

		App.req.get(call,params,function(data){
			console.log('gotMaster',data);
			App._views.Jedis.jedis.unshift(data);
			getMaster(data);
		});
	});

	App.dispatcher.on('Jedi:getAprentice',function(data){
		//console.log('Jedi:getAprentice',data);
		
		var call =  data.url;
		var params = {
		};

		App.req.get(call,params,function(data){
			console.log('gotAprentice',data);
			App._views.Jedis.jedis.push(data);
			getAprentice(data);
		});
	});

	function getMaster(data) {
		if (data.master && data.master.url) {
			App.actions.jedi.getMaster(data.master);
		}
	}

	function getAprentice(data) {
		if (data.apprentice && data.apprentice.url) {
			App.actions.jedi.getAprentice(data.apprentice);
		}
	}

})(App);
