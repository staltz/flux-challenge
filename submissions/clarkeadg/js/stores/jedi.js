
(function (App) {

	var limit = 5;
	var increment = 2;
	var total = 0;
	var jedis = [];	

	App.dispatcher.on('Jedi:getFirstJedi',function(){
		var call = App.config.api.host + App.config.api.get.jedis + App.config.api.get.firstJedi;
		var params = {
		};
		App.request.get(call,params,function(data){
			addFirstJedi(data);
		});
	});

	App.dispatcher.on('Jedi:getMaster',function(data){	
		var call = data.url;
		var params = {
		};
		App.request.get(call,params,function(data){
			addJedi(data,true);		
		});
	});

	App.dispatcher.on('Jedi:getApprentice',function(data){
		var call =  data.url;
		var params = {
		};
		App.request.get(call,params,function(data){
			addJedi(data);
		});
	});	

	App.dispatcher.on('Jedi:scrollUp',function(){
		if (!jedis[0].name) return false;
		getMaster(jedis[0]);			
		for(var i=0;i<increment;i++) {
			jedis.pop();
			jedis.unshift({});
		}
		dataChanged();
	});

	App.dispatcher.on('Jedi:scrollDown',function(){
		if (!jedis[jedis.length-1].name) return false;
		getApprentice(jedis[jedis.length-1]);
		for(var i=0;i<increment;i++) {
			jedis.shift({});
			jedis.push({});
		}
		dataChanged();
	});

	function dataChanged() {		
		if (!jedis.length) {
			App.views.jedis.disableScrollUp();
			App.views.jedis.disableScrollDown();
			return;
		}

		App.views.jedis.render(jedis);
		checkTop() ? App.views.jedis.enableScrollUp() : App.views.jedis.disableScrollUp();
		checkBottom() ? App.views.jedis.enableScrollDown() : App.views.jedis.disableScrollDown();
	}

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

	function addFirstJedi(data) {
		total++;
		jedis.push(data);
		getMaster(data);
		getApprentice(data);
	}

	function checkJedis(jedis) {
		total = 1;
		for(var i=0,c=jedis.length;i<c;i++) {
			if (jedis[i].name) {
				total++;
			}
		}
	}

	function checkTop() {
		if (!jedis.length) return false;
		if (jedis[0].name && jedis[0].master && jedis[0].master.url) return true;
		return false;
	}

	function checkBottom() {
		if (!jedis.length) return false;
		if (jedis[jedis.length-1].name && jedis[jedis.length-1].apprentice && jedis[jedis.length-1].apprentice.url) return true;
		return false;
	}

	function addJedi(data,master) {
		checkJedis(jedis);
		if (total > limit) return false;

		//console.log('addJedi',total,data,master);

		var check = false;

		if(master) {

			// iterate backwards			
			for(var c=-1,i=jedis.length-1;i>c;i--) {
				if (!jedis[i].name) {
					check = true;
					jedis[i] = data;
					break;
				}
			}

			if (!check) {
				jedis.unshift(data);
			}			

			getMaster(data);

		} else {
			
			for(var i=0,c=jedis.length;i<c;i++) {
				if (!jedis[i].name) {
					check = true;
					jedis[i] = data;
					break;
				}
			}

			if (!check) {
				jedis.push(data);
			}

			getApprentice(data);
		}
		//console.log(jedis);
		dataChanged();	
	}

	App.stores.jedis = jedis;	

})(App);
