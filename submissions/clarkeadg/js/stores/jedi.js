
(function (App) {

	var limit = 5;
	var total;
	var jedis;

	App.dispatcher.on('Jedi:getDarthSidious',function(){
		//console.log('Jedi:getDarthSidious');
		total = 1;
		
		var call = App.config.api.host + App.config.api.get.jedis + App.config.jedis.darthSidious.id;
		var params = {
		};

		App.req.get(call,params,function(data){
			//console.log('gotDarthSidious',data);
			jedis = App._views.Jedis.jedis;
			addDarthSidious(data);
		});
	});

	App.dispatcher.on('Jedi:getMaster',function(data){
		//console.log('Jedi:getMaster',data);
		
		var call = data.url;
		var params = {
		};

		App.req.get(call,params,function(data){
			//console.log('gotMaster',data);
			addJedi(data,true);		
		});
	});

	App.dispatcher.on('Jedi:getApprentice',function(data){
		//console.log('Jedi:getAprentice',data);
		
		var call =  data.url;
		var params = {
		};

		App.req.get(call,params,function(data){
			//console.log('gotAprentice',data);
			addJedi(data);
		});
	});

	function getMaster(data) {
		if (data.master && data.master.url) {
			App.actions.jedi.getMaster(data.master);
		}
	}

	function getApprentice(data) {
		if (data.apprentice && data.apprentice.url) {
			App.actions.jedi.getApprentice(data.apprentice);
		}
	}

	function addDarthSidious(data) {
		total++;
		jedis.push(data);
		getMaster(data);
		getApprentice(data);
	}

	function addJedi(data,master) {
		if (total > limit) return false;
		//console.log('addJedi',data);
		if(master) {
			jedis.unshift(data);
			getMaster(data);
		} else {
			jedis.push(data);
			getApprentice(data);
		}
		total++;		
	}

})(App);
