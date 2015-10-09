
(function (App) {

	var actions = {

		worldChanged: function (data) {
			App.dispatcher.trigger('System:worldChanged',data);	
		}

	};

	App.actions.system = actions;

})(App);
