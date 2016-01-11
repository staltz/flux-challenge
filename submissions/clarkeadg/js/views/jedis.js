
/**
 * Jedis View
 * @author Brian Clarke <https://github.com/clarkeadg>
 */

(function(App, $) {

  var stop = false;

  var view = {
    $el: {},
    $buttonUp: {},
    $buttonDown: {},
    $slots: {},
    disabledButtonClass: '',
    disabledSlotClass: '',
    foundJedi: false,
    init: function($cont) {
      this.disabledButtonClass = 'css-button-disabled';
      this.disabledSlotClass = 'css-slot-disabled';
      this.foundJedi = false;
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
      var z = this;

      this.$buttonUp.bind('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass(z.disabledButtonClass)) return false;
        App.actions.jedi.scrollUp();
      });

      this.$buttonDown.bind('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass(z.disabledButtonClass)) return false;
        App.actions.jedi.scrollDown();
      });
    },
    render: function() {
      if (stop) return false;
      var z = this;
      var htmlString = '';
      z.foundJedi = false;
      $.each(App.stores.jedis, function(i, jedi) {
        var foundJedi = false;
        if (jedi.homeworld && jedi.homeworld.name && jedi.homeworld.name == App.stores.world.name) {
          z.foundJedi = true;
          foundJedi = true;
          z.disableScroll();
          console.log('FOUND JEDI', App.stores.world.name, jedi.name)
        }
        htmlString += [
          '<li class="css-slot ' + (foundJedi ? z.disabledSlotClass : '') + '">',
          jedi.name ? '<h3>' + jedi.name + '</h3>' : '',
          jedi.homeworld && jedi.homeworld.name ? '<h6>Homeworld: ' + jedi.homeworld.name + '</h6>' : '',
          '</li>'
        ].join('\n');
      });
      z.$slots.html(htmlString);
      if (!z.foundJedi) {
        z.enableScroll();
      }
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
      if (!App.stores.jedis.length || !App.stores.jedis[0].id || !App.stores.jedis[App.stores.jedis.length - 1].id) return false;
      this.enableScrollUp();
      this.enableScrollDown();
    },
    enableScrollUp: function() {
      if (!App.stores.jedis.length || this.foundJedi || !App.stores.jedis[0].master || !App.stores.jedis[0].master.url) return false;
      this.$buttonUp.removeClass(this.disabledButtonClass);
    },
    enableScrollDown: function() {
      if (!App.stores.jedis.length || this.foundJedi || !App.stores.jedis[App.stores.jedis.length - 1].apprentice || !App.stores.jedis[App.stores.jedis.length - 1].apprentice.url) return false;
      this.$buttonDown.removeClass(this.disabledButtonClass);
    }
  };

  App.views.jedis = view;

})(App, jQuery);
