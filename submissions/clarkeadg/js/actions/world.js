
/**
 * World Actions
 */

(function (App) {

	var actions = {

		changed: function (data) {
			App.dispatcher.trigger('World:changed',data);
		}

	};

	App.actions.world = actions;

})(App);
