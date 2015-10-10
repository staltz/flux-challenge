
(function (App, $) {

	var $cont = $('.css-slots');
	var $buttonUp = $('.css-button-up');
	var $buttonDown = $('.css-button-down');

	var disabledClass = 'css-button-disabled';

	$buttonUp.bind('click',function(e){
		e.preventDefault();
		App.actions.jedi.scrollUp();
	});

	$buttonDown.bind('click',function(e){
		e.preventDefault();
		App.actions.jedi.scrollDown();
	});

	var view = {
		init: function() {
			this.disableScrollUp();
			this.disableScrollDown();
			App.actions.jedi.getFirstJedi();
		},
		render: function(data) {
			var htmlString = '';
			$.each(data,function(i,jedi){
				htmlString+= [
					'<li class="css-slot">',
						jedi.name ? '<h3>'+jedi.name+'</h3>' : '',
	                	jedi.homeworld && jedi.homeworld.name ? '<h6>Homeworld: '+jedi.homeworld.name+'</h6>' : '',
	                '</li>'
				].join('\n');
			});
			$cont.html(htmlString);			
		},
		disableScrollUp: function() {
			$buttonUp.addClass(disabledClass);
		},
		disableScrollDown: function() {
			$buttonDown.addClass(disabledClass);
		},
		enableScrollUp: function() {
			$buttonUp.removeClass(disabledClass);
		},
		enableScrollDown: function() {
			$buttonDown.removeClass(disabledClass);
		}
	};

	App.views.jedis = view;

})(App, jQuery);
