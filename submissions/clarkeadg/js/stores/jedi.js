
/**
 * Jedi Store
 * @author Brian Clarke <https://github.com/clarkeadg>
 */

(function(App) {

  var limit = App.config.limit;
  var increment = App.config.increment;
  var total = 0;
  var jedis = [];

  App.dispatcher.on('Jedi:getFirstJedi', function() {
    var call = App.config.api.host + App.config.api.get.jedis + App.config.api.get.firstJedi;
    var params = {};
    App.request.get(call, params, function(data) {
      addFirstJedi(data);
    });
  });

  App.dispatcher.on('Jedi:getMaster', function(data) {
    var call = data.url;
    var params = {};
    App.request.get(call, params, function(data) {
      addJedi(data, true);
    });
  });

  App.dispatcher.on('Jedi:getApprentice', function(data) {
    var call = data.url;
    var params = {};
    App.request.get(call, params, function(data) {
      addJedi(data);
    });
  });

  App.dispatcher.on('Jedi:scrollUp', function() {
    if (!jedis[0].name) return false;
    getMaster(jedis[0]);
    for (var i = 0; i < increment; i++) {
      jedis.pop();
      jedis.unshift({});
    }
    dataChanged();
  });

  App.dispatcher.on('Jedi:scrollDown', function() {
    if (!jedis[jedis.length - 1].name) return false;
    getApprentice(jedis[jedis.length - 1]);
    for (var i = 0; i < increment; i++) {
      jedis.shift({});
      jedis.push({});
    }
    dataChanged();
  });

  function dataChanged() {
    if (!jedis.length) {
      App.views.jedis.disableScroll();
      return;
    }

    App.views.jedis.render(jedis);

    if (App.views.jedis.foundJedi) {
      App.views.jedis.disableScroll();
      return;
    }

    checkTop() ? App.views.jedis.enableScrollUp() : App.views.jedis.disableScrollUp();
    checkBottom() ? App.views.jedis.enableScrollDown() : App.views.jedis.disableScrollDown();
  }

  function getMaster(data) {
    if (data.master && data.master.url) {
      App.actions.jedi.getMaster(data.master);
    }
  }

  function getApprentice(data) {
    if (data.apprentice && data.apprentice.url) {
      App.actions.jedi.getApprentice(data.apprentice);
    }
  }

  function checkTop() {
    if (!jedis.length) return false;
    if (jedis[0].name && jedis[0].master && jedis[0].master.url) return true;
    return false;
  }

  function checkBottom() {
    if (!jedis.length) return false;
    if (jedis[jedis.length - 1].name && jedis[jedis.length - 1].apprentice && jedis[jedis.length - 1].apprentice.url) return true;
    return false;
  }

  function checkForJedi(jedi) {
    for (var i = 0, c = jedis.length; i < c; i++) {
      if (jedis[i].name == jedi.name) {
        return true;
      }
    }
    return false;
  }

  function getTopSlot() {
    // iterate backwards			
    for (var c = -1, i = jedis.length - 1; i > c; i--) {
      if (!jedis[i].name) {
        return i;
      }
    }
    return false;
  }

  function getBottomSlot() {
    for (var i = 0, c = jedis.length; i < c; i++) {
      if (!jedis[i].name) {
        return i;
      }
    }
    return false;
  }

  function countJedis() {
    var total = 0;
    for (var i = 0, c = jedis.length; i < c; i++) {
      if (jedis[i].name) {
        total++;
      }
    }
    return total;
  }

  function addFirstJedi(data) {
    jedis.push(data);
    dataChanged();
    getMaster(data);
    getApprentice(data);
  }

  function addJedi(data, master) {
    if (checkForJedi(data)) return false;
    total = countJedis();
    if (total > limit - 1) return false;
    master ? addMaster(data) : addApprentice(data);
    dataChanged();
  }

  function addMaster(data) {
    var slot = getTopSlot();
    if (slot === false) {
      jedis.unshift(data);
    }
    if (slot || slot === 0) {
      if (typeof jedis[slot + 1] != 'undefined' && jedis[slot + 1].master && jedis[slot + 1].master.id == data.id) {
        jedis[slot] = data;
      }
    }
    getMaster(data);
  }

  function addApprentice(data) {
    var slot = getBottomSlot();
    if (slot === false) {
      jedis.push(data);
    }
    if (slot || slot === 0) {
      if (typeof jedis[slot - 1] != 'undefined' && jedis[slot - 1].apprentice && jedis[slot - 1].apprentice.id == data.id) {
        jedis[slot] = data;
      }
    }
    getApprentice(data);
  }

  App.stores.jedis = jedis;

})(App);
