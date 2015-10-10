
(function (App) {

	var limit = 5;
	var increment = 2;
	var total;
	var jedis = [];
	var $cont = $('.css-slots');

	App.dispatcher.on('Jedi:getDarthSidious',function(){
		//console.log('Jedi:getDarthSidious');
		total = 1;
		
		var call = App.config.api.host + App.config.api.get.jedis + App.config.jedis.darthSidious.id;
		var params = {
		};

		App.request.get(call,params,function(data){
			//console.log('gotDarthSidious',data);
			//jedis = App._views.Jedis.jedis;
			addDarthSidious(data);
		});
	});

	App.dispatcher.on('Jedi:getMaster',function(data){
		//console.log('Jedi:getMaster',data);
		
		var call = data.url;
		var params = {
		};

		App.request.get(call,params,function(data){
			//console.log('gotMaster',data);
			addJedi(data,true);		
		});
	});

	App.dispatcher.on('Jedi:getApprentice',function(data){
		//console.log('Jedi:getAprentice',data);
		
		var call =  data.url;
		var params = {
		};

		App.request.get(call,params,function(data){
			//console.log('gotAprentice',data);
			addJedi(data);
		});
	});	

	App.dispatcher.on('Jedi:scrollUp',function(){
		if (!jedis[0].name) return false;
		//console.log('Jedi:scrollUp');	
		getMaster(jedis[0]);			
		for(var i=0;i<increment;i++) {
			jedis.pop();
			jedis.unshift({});
		}
		renderJedis($cont,jedis);
	});

	App.dispatcher.on('Jedi:scrollDown',function(){
		if (!jedis[jedis.length-1].name) return false;
		//console.log('Jedi:scrollDown',jedis[jedis.length-1]);
		getApprentice(jedis[jedis.length-1]);
		for(var i=0;i<increment;i++) {
			jedis.shift({});
			jedis.push({});
		}
		renderJedis($cont,jedis);
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

	function checkJedis(jedis) {
		total = 1;
		for(var i=0,c=jedis.length;i<c;i++) {
			if (jedis[i].name) {
				total++;
			}
		}
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
					//console.log(i,data)
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
					//console.log(i,data)
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
		renderJedis($cont,jedis)		
	}

	function renderJedis($el,jedis) {
		var htmlString = '';
		$.each(jedis,function(i,jedi){
			htmlString+= [
				'<li class="css-slot">',
					jedi.name ? '<h3>'+jedi.name+'</h3>' : '',
                	jedi.homeworld && jedi.homeworld.name ? '<h6>Homeworld: '+jedi.homeworld.name+'</h6>' : '',
                '</li>'
			].join('\n');
		});
		$el.html(htmlString);
	}

})(App);
