
(function (App, $) {

	var $cont = $('.css-slots');
	var $buttonUp = $('.css-button-up');
	var $buttonDown = $('.css-button-down');

	var disabledButtonClass = 'css-button-disabled';
	var disabledSlotClass = 'css-slot-disabled';

	$buttonUp.bind('click',function(e){
		e.preventDefault();
		if ($(this).hasClass(disabledButtonClass)) return false;
		App.actions.jedi.scrollUp();
	});

	$buttonDown.bind('click',function(e){
		e.preventDefault();
		if ($(this).hasClass(disabledButtonClass)) return false;
		App.actions.jedi.scrollDown();
	});

	var view = {
		init: function() {
			this.disableScroll();
			App.actions.jedi.getFirstJedi();
		},
		render: function() {
			var htmlString = '';
			var foundJedi = false;
			$.each(App.stores.jedis,function(i,jedi){
				foundJedi = false;
				if (jedi.homeworld && jedi.homeworld.name && jedi.homeworld.name == App.stores.world.name) {
					foundJedi = true;
				}
				htmlString+= [
					'<li class="css-slot '+(foundJedi ? disabledSlotClass : '')+'">',
						jedi.name ? '<h3>'+jedi.name+'</h3>' : '',
	                	jedi.homeworld && jedi.homeworld.name ? '<h6>Homeworld: '+jedi.homeworld.name+'</h6>' : '',
	                '</li>'
				].join('\n');
			});
			$cont.html(htmlString);
			if (foundJedi) {
				this.disableScroll();
			}
			console.log('RENDER JEDIS')		
		},
		disableScroll: function() {
			this.disableScrollUp();
			this.disableScrollDown();
		},
		disableScrollUp: function() {
			$buttonUp.addClass(disabledButtonClass);
		},
		disableScrollDown: function() {
			$buttonDown.addClass(disabledButtonClass);
		},
		enableScrollUp: function() {
			$buttonUp.removeClass(disabledButtonClass);
		},
		enableScrollDown: function() {
			$buttonDown.removeClass(disabledButtonClass);
		}
	};

	App.views.jedis = view;

})(App, jQuery);
