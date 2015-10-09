
(function (App) {

	var actions = {
		
		up: function () {
			App.dispatcher.trigger('Scroll:up');
		},

		down: function () {
			App.dispatcher.trigger('Scroll:down');
		}

	};

	App.actions.user = actions;

})(App);
