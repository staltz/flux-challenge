
(function (App) {

	var actions = {

		getDarthSidious: function() {
			App.dispatcher.trigger('Jedi:getDarthSidious');
		},

		getMaster: function(data) {
			App.dispatcher.trigger('Jedi:getMaster',data);
		},

		getAprentice: function(data) {
			App.dispatcher.trigger('Jedi:getAprentice',data);
		}

	};

	App.actions.jedi = actions;

})(App);
