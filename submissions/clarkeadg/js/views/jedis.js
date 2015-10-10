
(function (App, $) {

	$('.css-button-up').bind('click',function(e){
		e.preventDefault();
		App.actions.jedi.scrollUp();
	});

	$('.css-button-down').bind('click',function(e){
		e.preventDefault();
		App.actions.jedi.scrollDown();
	});

})(App, jQuery);
