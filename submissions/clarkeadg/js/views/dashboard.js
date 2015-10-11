
/**
 * Dashboard View
 */

(function (App, $) {

	var view = {
		$el: {},
		init: function($cont) {
			this.$el = $('<div class="css-root"></div>');
			$cont.append(this.$el);

			App.views.world.init(this.$el);
			App.views.jedis.init(this.$el);
		}	
	};

	App.views.dashboard = view;

})(App, jQuery);
