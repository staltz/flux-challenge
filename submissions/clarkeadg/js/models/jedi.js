
var Jedi = (function (App) {

	return App.Model({
		id: App.Property(),
		name: App.Property(),
		homeworld: {
			id: App.Property(),
			name: App.Property()
		},
		master: {
			id: App.Property(),
			url: App.Property()
		},
		apprentice: {
			id: App.Property(),
			url: App.Property()
		}
	});

})(App);
