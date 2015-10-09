
var Jedis = (function (App, Jedis) {

	return App.Collection(Jedis, {
		options: {
			read: {
				//url: App.config.api.host + App.config.api.get.jedis
			}
		}
	});

})(App, Jedis);
