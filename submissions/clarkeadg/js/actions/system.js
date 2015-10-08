
(function (App) {

	var actions = {

		start: function () {
			App.dispatcher.trigger('System:start');
		},

		worldChanged: function () {
			App.dispatcher.trigger('System:worldChanged');	
		}

	};

	App.actions.system = actions;

})(App);
