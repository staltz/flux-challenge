
var Jedi = (function (App) {

	return App.Model({
		id: App.Property(),
		name: App.Property(),
		homeworld: App.Property(),
		master: App.Property(),
		apprentice: App.Property()
	});

})(App);
