
/**
 * Jedis View
 */

(function (App, $) {

	var view = {
		$el: {},
		$buttonUp: {},
		$buttonDown: {},
		$slots: {},
		disabledButtonClass: '',
		disabledSlotClass: '',
		init: function($cont) {			
			this.disabledButtonClass = 'css-button-disabled';
			this.disabledSlotClass = 'css-slot-disabled';
			this.$el = $([
				'<section class="css-scrollable-list">',
					'<ul class="css-slots">',
					'</ul>',
					'<div class="css-scroll-buttons">',
						'<button class="css-button-up"></button>',
						'<button class="css-button-down"></button>',
					'</div>',
				'</section>'
			].join('\n'));
			this.$buttonUp = this.$el.find('.css-button-up');
			this.$buttonDown = this.$el.find('.css-button-down');
			this.$slots = this.$el.find('.css-slots');
			$cont.append(this.$el)
			this.disableScroll();
			App.actions.jedi.getFirstJedi();
			this.bindClicks();
		},
		bindClicks: function() {
			this.$buttonUp.bind('click',function(e){
				e.preventDefault();
				if ($(this).hasClass(this.disabledButtonClass)) return false;
				App.actions.jedi.scrollUp();
			});

			this.$buttonDown.bind('click',function(e){
				e.preventDefault();
				if ($(this).hasClass(this.disabledButtonClass)) return false;
				App.actions.jedi.scrollDown();
			});
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
					'<li class="css-slot '+(foundJedi ? this.disabledSlotClass : '')+'">',
						jedi.name ? '<h3>'+jedi.name+'</h3>' : '',
	                	jedi.homeworld && jedi.homeworld.name ? '<h6>Homeworld: '+jedi.homeworld.name+'</h6>' : '',
	                '</li>'
				].join('\n');
			});
			this.$slots.html(htmlString);
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
			this.$buttonUp.addClass(this.disabledButtonClass);
		},
		disableScrollDown: function() {
			this.$buttonDown.addClass(this.disabledButtonClass);
		},
		enableScroll: function() {
			if (!App.stores.jedis.length) return false;
			this.enableScrollUp();
			this.enableScrollDown();
		},
		enableScrollUp: function() {
			if (!App.stores.jedis.length) return false;
			this.$buttonUp.removeClass(this.disabledButtonClass);
		},
		enableScrollDown: function() {
			if (!App.stores.jedis.length) return false;
			this.$buttonDown.removeClass(this.disabledButtonClass);
		}
	};

	App.views.jedis = view;

})(App, jQuery);
