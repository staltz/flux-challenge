
(function (App) {

	var actions = {

		getDarthSidious: function() {
			App.dispatcher.trigger('Jedi:getDarthSidious');
		},

		getMaster: function(data) {
			App.dispatcher.trigger('Jedi:getMaster',data);
		},

		getApprentice: function(data) {
			App.dispatcher.trigger('Jedi:getApprentice',data);
		}

	};

	App.actions.jedi = actions;

})(App);
