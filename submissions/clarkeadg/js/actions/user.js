
(function (App) {

	var actions = {
		
		scrollUp: function () {
			App.dispatcher.trigger('User:scrollUp');
		},

		scrollDown: function () {
			App.dispatcher.trigger('User:scrollDown');
		}

	};

	App.actions.user = actions;

})(App);
