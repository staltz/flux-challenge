(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var SithList = require('./SithList');
var __D = require('./constants');
var Sith = require('./Sith');
var Jedi = require('./SocketComponent');

var Dashboard = (function () {
  function Dashboard() {
    var _this = this;

    var entryPoint = arguments.length <= 0 || arguments[0] === undefined ? document.querySelector('.app-container') : arguments[0];

    _classCallCheck(this, Dashboard);

    this.$el = entryPoint;
    this.render();
    /**
     * Tech Debt: Messy storage of nodes
     * @type {[type]}
     */
    this.el_scrollable_list = document.querySelector('css-scrollable-list');
    this.el_slots = document.querySelector('.css-slots');
    this.el_jedi = document.querySelector('.css-planet-monitor');
    this.el_top_button = document.querySelector('.css-button-up');
    this.el_btm_button = document.querySelector('.css-button-down');

    /**
     * Components:
     *   - obiwan
     *   - button controller for UI input
     *   - sithList is a SithList instance, stores Sith instances
     * @type {SithList}
     */
    this._sithlist = new SithList(this);
    this._jedi = new Jedi(__D.socketHost, this);

    /**
     * This object is a candidate for use of function composition.
     * It is inherently stateless.
     * Tech Debt: Turn into another class.
     * @type {Object}
     */
    this._ui = {
      buttons: [this.el_top_button, this.el_btm_button],
      _frozen: false,
      topIsActive: function topIsActive() {},
      btmIsActive: function btmIsActive() {},
      respondToClick: function respondToClick(event) {
        var t = event.currentTarget;
        if (!t.classList.contains('css-button-disabled')) {
          //not disabled, so invoke shift
          var sList = _this._sithlist;
          var fnKey = t.classList.contains('css-button-up') ? 'shiftListUp' : 'shiftListDown';
          sList[fnKey].bind(_this._sithlist)();
        } else {
          //do nothing, button is disabled
        }
      },
      disableIfActive: function disableIfActive(btn) {
        if (!btn.classList.contains('css-button-disabled')) {
          btn.classList.toggle('css-button-disabled');
        }
      },
      //must bind this to dashboard
      enableIfInactive: function enableIfInactive(btn) {
        if (_this._ui._frozen === false) {
          if (btn.classList.contains('css-button-disabled')) {
            btn.classList.toggle('css-button-disabled');
          }
        }
        //if UI isn't frozen.
        //rules: UI is not frozen.
        //  top if top has a master
        //  bottom if bottom has a master
      },
      forEachButton: function forEachButton(cb) {
        _this._ui.buttons.forEach(cb);
      },
      //must bind this to dashboard
      disableAll: function disableAll(target) {
        var ui = _this._ui;
        //disables all if no params past
        if (target === 'top') {
          ui.disableIfActive(ui.buttons[0]);
        } else if (target === 'btm') {
          ui.disableIfActive(ui.buttons[1]);
        } else {
          ui.forEachButton(ui.disableIfActive);
        }
      },
      enableAll: function enableAll(target) {
        var ui = _this._ui;
        //disables all if no params past
        if (target === 'top') {
          ui.enableIfInactive(ui.buttons[0]);
        } else if (target === 'btm') {
          ui.enableIfInactive(ui.buttons[1]);
        } else {
          ui.forEachButton(ui.enableIfInactive);
        }
      }
    };

    //must bind This to dashboard
    this.render(this.el_slots);
    this._ui.buttons.forEach((function (btn) {
      btn.addEventListener('mousedown', _this._ui.respondToClick.bind(_this._sithList));
    }).bind(this));

    //disable to start
    this._ui.forEachButton(this._ui.disableIfActive);

    this._jedi.connectSocket();

    //when events are fired that end a planet conflict, remember to re-trigger
    //'resumefetching'
  }

  /**
   * [renderList description]
   * @return {[type]} [description]
   */

  _createClass(Dashboard, [{
    key: 'renderList',
    value: function renderList() {
      var fn = this.render.bind(this, this.el_slots);
      fn();
    }
  }, {
    key: 'renderObi',
    value: function renderObi() {
      var fn = this.render.bind(this, this.el_obiwan);
      fn();
    }
  }, {
    key: 'checkIfWorldMatch',
    value: function checkIfWorldMatch(worldName) {
      console.log('check completed. Match : ', !!this._sithlist._homeworlds[worldName]);
      var found = this._sithlist._homeworlds[worldName];
      if (!!found) {

        this._ui.disableAll();
        this._sithlist.cancelAllAjax();
        this.markSith(worldName);
      }
    }
  }, {
    key: 'markSith',
    value: function markSith(worldName) {
      var slots = document.querySelectorAll('.css-slot');
      for (var i = 0; i < slots.length; i++) {
        var texts = slots[i].childNodes;
        if (texts[1].innerText.includes(worldName)) {
          texts[0].style.color = 'red';
          texts[1].style.color = 'red';
        }
      }
    }
  }, {
    key: 'render',
    value: function render(node) {
      //log homeworlds at every rerender:
      //
      //
      if (this._sithlist) {
        console.log('Homeworlds Before Rerender: ');
        console.log(this._sithlist._homeworlds);
      }

      var templateString = undefined;
      var _HTML = undefined;
      if (node === undefined) {
        templateString = '<div class="css-root">\n        <h1 class="css-planet-monitor"></h1>\n        <section class="css-scrollable-list">\n          <ul class="css-slots">\n          </ul>\n          <div class="css-scroll-buttons">\n            <button class="css-button-up"></button>\n            <button class="css-button-down"></button>\n          </div>\n        </section>\n      </div>';
        document.querySelector('.app-container').innerHTML = templateString;
      } else if (node === this.el_slots) {
        node.innerHTML = '';
        var m = this._sithlist._indices;
        for (var key in m) {
          var sith = m[key];
          var _name = !!sith && sith.hasData() ? sith.data.name : "";
          var homeworld = !!sith && sith.hasData() ? 'Homeworld: ' + sith.data.homeworld.name : "";
          var newSlot = document.createElement('li');
          newSlot.innerHTML = '<h3>' + _name + '</h3><h6>' + homeworld + '</h6>';
          newSlot.classList.toggle('css-slot');
          node.appendChild(newSlot);
          // Tech Debt : Why wasn't this working?
          // _HTML += ('<li class="css-slot"><h3>' +
          //   name +
          //   '</h3><h6>' +
          //   homeworld +
          //   '</h6></li>');
        }
      } else if (node === this.el_obiwan) {} else if (node === this.el_top_button || node === this.el_btm_button) {}
    }
  }]);

  return Dashboard;
})();

module.exports = Dashboard;

},{"./Sith":2,"./SithList":3,"./SocketComponent":4,"./constants":6}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var __D = require('./constants');

var Sith = (function () {
  function Sith(url, index, sithlist) {
    _classCallCheck(this, Sith);

    if (index === undefined) return new Error('No index');
    this._sithlist = sithlist;
    this.data = undefined;
    this.url = url;
    this.pending = undefined; // not always updated correctly :(
    this.index = index;

    this.fetch(this.url, this.updateData);
  }

  _createClass(Sith, [{
    key: 'fetch',
    value: function fetch(url, cb) {
      this.pending = superagent.get(url).end(cb.bind(this));
    }
  }, {
    key: 'updateData',
    value: function updateData(err, res) {
      if (err) return; //fail silently
      var data = this.data = JSON.parse(res.text);
      this._sithlist._homeworlds[data.homeworld.name] = this;

      /**
       * 
       */
      //Tech Debt: Refactor reaching out later:
      //Problematic...
      var dash = this._sithlist._dashboard;
      dash.renderList();
      dash._ui.forEachButton(dash._ui.enableIfInactive.bind(dash));
      /**
       * 
       */
      //call fetch again, with specific params to end or do nothing
      this.fillRemainingSlots(this);
    }
  }, {
    key: 'fillRemainingSlots',
    value: function fillRemainingSlots() {
      var sith = arguments.length <= 0 || arguments[0] === undefined ? this._sithlist.findOneSith() : arguments[0];

      var maybeFetch = this.maybeFetch(sith);
      if (maybeFetch) this._sithlist.addSithAt(maybeFetch.url, maybeFetch.idx);
    }
  }, {
    key: 'maybeFetch',
    value: function maybeFetch(sith) {
      var ui = this._sithlist._dashboard._ui;
      var apprentice = this.maybeFetchDown(sith);
      var master = this.maybeFetchUp(sith);
      /**
       * Tech Debt: this is button disabling logic, abstract out asap
       * @type {[type]}
       */
      var head = this._sithlist.getSithAt('head');
      if (!!head && head.data.master.url === null) {
        ui.disableAll('top');
      }

      var tail = this._sithlist.getSithAt('tail');
      if (!!tail && tail.data.apprentice.url === null) {
        ui.disableAll('btm');
      }
      // /\
      return apprentice ? apprentice : master ? master : null;
    }

    // checks for what to request next: returns {url,index}, or null
    // Checks apprentices.
    //
    /**
     * Tech Debt: Up/Down -- cleaner way to implement this?
     * @param  {[type]} sith [description]
     * @return {[type]}      [description]
     */
  }, {
    key: 'maybeFetchDown',
    value: function maybeFetchDown(sith) {
      var fetchParams = {
        url: null,
        idx: null,
        noMoreToFetch: false
      };

      var next = this.next();
      var idx = sith.index;
      if (!sith.hasData()) {
        //see if in progress
        return fetchParams;
      } else if (idx === 4 || sith.data.apprentice.url === null) {
        //base case: reach the bottom, can't fetch more
        return null;
      } else if (next instanceof Sith) {
        return sith.maybeFetchDown(next);
      } else {
        //found a sith with apprentice, and not at bottom
        var _fetchParams = { url: sith.data.apprentice.url, idx: sith.index + 1 };
        return _fetchParams;
      }
    }

    // checks for what to request next: returns {url,index}, or null
    // Checks masters.
  }, {
    key: 'maybeFetchUp',
    value: function maybeFetchUp(sith) {
      var prev = sith.prev();
      var idx = sith.index;
      //base case: reach the top, can't fetch more
      if (!sith.hasData()) {
        //see if in progress
        return null;
      } else if (idx === 0 || sith.data.master.url === null) {
        //at bottom, or url = null
        return null;
      } else if (prev instanceof Sith) {
        return sith.maybeFetchUp(prev);
      } else {
        //found a sith with master, and not at top
        var fetchParams = { url: sith.data.master.url, idx: sith.index - 1 };
        return fetchParams;
      }
    }
  }, {
    key: 'next',
    value: function next() {
      return this._sithlist.getSithAt(this.index + 1);
    }
  }, {
    key: 'prev',
    value: function prev() {
      return this._sithlist.getSithAt(this.index - 1);
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      if (this.pending && this.data === undefined) this.pending.abort();
      this.pending = undefined;
    }

    //Helper Methods
  }, {
    key: 'isPending',
    value: function isPending() {
      //Warn: seems unnecessary
      return !!this.pending;
    }
  }, {
    key: 'hasData',
    value: function hasData() {
      //Warn: seems unnecessary, but used by SithList.
      return !!(this.data !== undefined);
    }
  }, {
    key: 'getHomeworld',
    value: function getHomeworld() {
      if (this.data.homeworld) return this.data.homeworld;
    }
  }, {
    key: 'getName',
    value: function getName() {
      if (this.data.name) return this.data.name;
    }
  }]);

  return Sith;
})();

module.exports = Sith;

},{"./constants":6}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Sith = require('./Sith');
var __D = require('./constants');

var SithList = (function () {
  function SithList(dashboard) {
    _classCallCheck(this, SithList);

    this._dashboard = dashboard;
    this._head = 0;
    this._tail = 4;
    this._storage = [];
    this._homeworlds = {};
    this._indices = {
      "0": null,
      "1": null,
      "2": null,
      "3": null,
      "4": null
    };
    this.addSithAt(__D.sidiousPath, 2);
  }

  //logic for fetching master/apprentice stays in here

  /**
   * Shifts the list `times` times in `dir` direction.
   * returns an array of removed Sith.
   * @param  {[type]} times [description]
   * @param  {[type]} dir   [description]
   * @return {[type]}       [description]
   */

  _createClass(SithList, [{
    key: 'shiftList',
    value: function shiftList(times, dir) {

      var newIndices = {
        "0": null,
        "1": null,
        "2": null,
        "3": null,
        "4": null
      };
      var __last_removed_sith = undefined;
      if (dir !== 'up' && dir !== 'down') {
        return new Error('2nd parameter must be "up" or "down"');
      };

      /**
       * Tech Debt: Use a mapping function.
       */
      for (var key in this._indices) {
        var maybeSith = this._indices[key];
        var num = parseInt(key);
        var newIndex = dir === 'up' ? num += times : num -= times;
        if (num <= this._tail && num >= this._head) {
          //Is in range, we are keeping this sith.
          newIndices[num] = maybeSith;
          //must update index in maybeSith
          if (!!maybeSith) maybeSith.index = num;
        } else {
          //Is not in range, we are removing this sith.
          /**
           * Warn: Cancelling logic is coupled:: only happens here.
           */
          if (!!maybeSith) {
            if (!!maybeSith.isPending() && !maybeSith.hasData()) {
              maybeSith.cancel();
            } else if (!!maybeSith.hasData()) {
              //maybeSith has data, and is leaving, so we keep last
              //to handle 'empty UI' edge case
              var world = maybeSith.data.homeworld.name;
              delete this._homeworlds[world];
              __last_removed_sith = maybeSith;
              /**
               * implementation detail: 
               *   when going down, last sith will be 4th index, at bottom
               *   when going up, last removed sith will be 1st index...
               *   since 0th index is above it and will be looped over last
               */
            }
          } else {
              //is null
            }
        }
      }
      this._indices = newIndices; //old data will be GC'd

      this._dashboard.renderList();
      if (this.numberOfLoadedSith() < 1) {
        //disable UI input first
        var dash = this._dashboard;
        dash._ui.disableAll.bind(dash)();

        //refill UI with last removed sith;
        var LMS = __last_removed_sith;
        if (!LMS) {
          return new Error("error, UI empty, should have last removed sith");
        }
        if (dir === 'down') {
          //load an apprentice to 2nd slot
          this.addSithAt(LMS.data.apprentice.url, 2);
        } else if (dir === 'up') {
          //load a master to 2nd slot
          this.addSithAt(LMS.data.master.url, 2);
        }
      } else {
        //more sith, can find one. resume fetching like normal:
        this.resumeFetching();
      }
      /**
       * 
       */
      // Tech Debt or effective decoupling? Not returning the removed Sith.
      // return sithRemoved;
    }
  }, {
    key: 'stopFetchingAll',
    value: function stopFetchingAll() {}
    //cancellAll --- Not needed yet.

    // resumeFetching() {

    //   let found = this.findOneSith();
    //   this.fillRemainingSlots(found);
    // }

  }, {
    key: 'shiftListUp',
    value: function shiftListUp() {

      return this.shiftList(2, 'up');
    }
  }, {
    key: 'shiftListDown',
    value: function shiftListDown() {

      return this.shiftList(2, 'down');
    }
  }, {
    key: 'cancelAllAjax',
    value: function cancelAllAjax() {
      console.log('cancelling all ajax_____');
      this.mapOverIndices(function (sith) {
        if (!sith.hasData()) {
          //must be pending
          sith.cancel();
        }
      });
    }
  }, {
    key: 'hasHomeWorld',
    value: function hasHomeWorld(world) {
      return !!this._homeworlds[world];
    }
  }, {
    key: 'mapOverIndices',
    value: function mapOverIndices(cb) {
      var result = {};
      var obj = this._indices;
      for (var key in obj) {
        result[key] = cb(obj[key], key, obj);
      }
      return result;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      //Warn: Not used anywhere.
      return JSON.stringify(this._indices);
    }

    //helperMethods:
  }, {
    key: 'addSithAt',
    value: function addSithAt(url, key) {
      //Dirty cancel;
      if (url === null) {
        console.log("Tech Debt: unexplained null url");
        return;
      };
      var newSith = new Sith(url, key, this);
      this._indices[key] = newSith;
    }
  }, {
    key: 'getSithAt',
    value: function getSithAt(key) {
      if (typeof key === 'number') {
        return this._indices[key];
      } else if (typeof key === 'string') {
        //will be head or tail
        return this.findOneSith(key) || null;
      } else {
        return new Error('getSithAt, received invalid input');
      }
    }
  }, {
    key: 'sithExistsAt',
    value: function sithExistsAt(key) {
      //Warn: Not used anywhere.
      return !!(this._indices[key] instanceof Sith);
    }
  }, {
    key: 'numberOfLoadedSith',
    value: function numberOfLoadedSith() {
      /**
       * tech debt: use _ filter
       * @type {Number}
       */
      var count = 0;
      var storage = this._indices;
      for (var key in this._indices) {
        var maybeSith = storage[key];
        if (maybeSith instanceof Sith && maybeSith.hasData()) {
          count++;
        };
      }
      return count;
    }
  }, {
    key: 'resumeFetching',
    value: function resumeFetching() {
      var first = this.findOneSith();
      if (!!first) first.fillRemainingSlots(first);
    }

    /**
     * Iterates over _indices and returns the first Sith it finds.
     *
     * Used as a default param for fillRemainingSlots;
     * @return {[type]} [description]
     */
  }, {
    key: 'findOneSith',
    value: function findOneSith() {
      var fromDirection = arguments.length <= 0 || arguments[0] === undefined ? 'head' : arguments[0];

      var obj = this._indices;
      var maxKey = Object.keys(obj).length;
      if (fromDirection === 'head') {
        for (var key in obj) {
          var s = obj[key];
          if (s instanceof Sith && s.hasData()) {
            return obj[key];
            break;
          }
        }
      } else if (fromDirection === 'tail') {
        for (var key = maxKey; key >= 0; key--) {
          var s = obj[key];
          if (s instanceof Sith && s.hasData()) {
            return obj[key];
            break;
          }
        }
      }

      //list is empty
      return null;
    }
  }]);

  return SithList;
})();

module.exports = SithList;

},{"./Sith":2,"./constants":6}],4:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var SocketComponent = (function () {
  function SocketComponent(url, dashboard) {
    _classCallCheck(this, SocketComponent);

    this._dashboard = dashboard;
    this._socket_url = url;
    this._location = null;
    this._location_id = null;
    this._el = document.querySelector('.css-planet-monitor');
    this._socket = new WebSocket(this._socket_url);

    /**
     * Note to self: 
     */
    //store state of the locked UI -- cleaner alternative to redundantly
    //re-assigning and re-ren dering.
    // this.previous_UI_State = false; || {
    //    indices of Match : 2,3,
    //    top-active : false,
    //    bottom-active: true;
    // }

    /**
     * Socket Connection
     * @param  {[type]} 'ws:                 socket.onopen [description]
     * @return {[type]}      [description]
     */
  }

  _createClass(SocketComponent, [{
    key: 'connectSocket',
    value: function connectSocket() {
      var _this = this;

      this._socket.onopen = function () {
        _this._socket.send('Listening to Obi-Wan\'s location');
      };

      var onMessageFn = (function (res) {
        var dash = _this._dashboard;
        var newLoc = _this.updateLocation.bind(_this)(res);
        //rerender the central dashboard
        console.log('rerender');
        dash.render(dash.el_slots);

        console.log('re-enable all buttons');
        dash._ui.enableAll();

        console.log('disable the same old buttons, and restart fetching');
        var sl = dash._sithlist;
        var found = sl.findOneSith();
        if (found) {
          found.fillRemainingSlots(found);
        }

        //activate both arrows
        //  deactivate in Sith logic already present: pretend a new one came in
        dash.checkIfWorldMatch.bind(dash)(newLoc);
      }).bind(this);
      this._socket.onmessage = onMessageFn;
    }
  }, {
    key: 'getLocation',
    value: function getLocation() {
      return {
        name: this._location_id,
        id: this._location
      };
    }
  }, {
    key: 'formatLocation',
    value: function formatLocation(suffix) {
      return "Obi-Wan currently on " + suffix;
    }
  }, {
    key: 'updateLocation',
    value: function updateLocation(res) {
      var data = JSON.parse(res.data);
      this._location = data.name;
      this._location_id = data.id;
      this._el.innerHTML = this.formatLocation(data.name);
      return data.name;
    }
  }]);

  return SocketComponent;
})();

module.exports = SocketComponent;

},{}],5:[function(require,module,exports){
'use strict';
// import * as __D from './constants';
// import * as Dashboard from './Dashboard';
// import Sith from './Sith';
// import SithList from './SithList';

var Jedi = require('./SocketComponent');
var Dashboard = require('./Dashboard');
var Sith = require('./Sith');
var SithList = require('./SithList');
var __D = require('./constants');

var appContainer = document.querySelector('.app-container');
var dash = new Dashboard(appContainer);

},{"./Dashboard":1,"./Sith":2,"./SithList":3,"./SocketComponent":4,"./constants":6}],6:[function(require,module,exports){
"use strict";

var __D = {
  sidiousPath: "http://localhost:3000/dark-jedis/3616",
  socketHost: "ws://localhost:4000"
};

module.exports = __D;

},{}]},{},[5])


//# sourceMappingURL=app.js.map
