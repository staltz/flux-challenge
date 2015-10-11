
/**
 * Dashboard View
 * @author Brian Clarke <https://github.com/clarkeadg>
 */

(function (App, $) {

	var view = {
		$el: {},
		init: function($cont) {
			this.$el = $('<div class="css-root"></div>');
			$cont.append(this.$el);
			if (App.config.enableWorld) App.views.world.init(this.$el);
			if (App.config.enableJedis) App.views.jedis.init(this.$el);
		}	
	};

	App.views.dashboard = view;

})(App, jQuery);
