'use strict';

import {DIRECTION, SITH_LORD_LIST} from 'constants.js' ;
import * as Utils from 'utils.js' ;
import {SithLord} from 'empire.js';


/** Sith Lord list.
 *  Wraps list of loaded Sith Lords and add placeholders for empty rows
 *  Immutable, any 'change' operation (add/scroll) produces a new list instance
 **/
class SithLordsList {

  constructor(sithLords = Utils.emptyList()) {
    this.sithLords = sithLords;
  }

  /* return only 'real' Sith Lords, no placeholders */
  getLoaded() {
    return _.reject(this.sithLords, {isEmptyObject: true});
  }

  /* 'true' if any of List Lords is from this 'planet' */
  hasSomeOneFrom(planet) {
    return _.any(this.getLoaded(), sithLord => {
      return sithLord.isFromPlanet(planet);
    });
  }

  /* first loaded Sith Lord from list of its index */
  getFirstLoaded() {
    var sithLords = this.getLoaded(),
      first = _.first(sithLords);
    return {
      sithLord: first,
      index: this.sithLords.indexOf(first)
    };
  }

  /*  last loaded Sith Lord from list of its index */
  getLastLoaded() {
    var sithLords = this.getLoaded(),
      last = _.last(sithLords);
    return {
      sithLord: last,
      index: this.sithLords.indexOf(last)
    };
  }

  /* add master's apprentice in list */
  addApprentice(apprentice, master) {
    var masterIndex = this.sithLords.indexOf(master),
      head = _.slice(this.sithLords, 0, masterIndex + 1),
      tail = _.slice(this.sithLords, masterIndex + 2);
    return new SithLordsList(head.concat([apprentice]).concat(tail));
  }

  /* add apprentice's master in list */
  addMaster(apprentice, master) {
    var apprenticeIndex = this.sithLords.indexOf(apprentice),
      head = _.slice(this.sithLords, 0, apprenticeIndex - 1),
      tail = _.slice(this.sithLords, apprenticeIndex);
    return new SithLordsList(head.concat([master]).concat(tail));
  }

  /* add new Sith Lord in list depending on its role - 'master'/'apprentice' */
  add(sithLord) {
    var master = _.find(this.sithLords, {apprentice: {id: sithLord.id}}),
      apprentice = _.find(this.sithLords, {master: {id: sithLord.id}});
    if (master) {
      return this.addApprentice(sithLord, master);
    } else if (apprentice) {
      return this.addMaster(apprentice, sithLord);
    } else {
      return new SithLordsList([sithLord].concat(_.slice(this.sithLords, 1)));
    }
  }

  /* moves rows in list 'up' */
  scrollDown() {
    var head = _.slice(this.sithLords, SITH_LORD_LIST.SCROLL_MOVE_POSITIONS),
      tail = Utils.emptyList(SITH_LORD_LIST.SCROLL_MOVE_POSITIONS);
    return new SithLordsList(head.concat(tail));
  }

  /* moves rows in list 'down' */
  scrollUp() {
    var head = Utils.emptyList(SITH_LORD_LIST.SCROLL_MOVE_POSITIONS),
      tail = _.slice(this.sithLords, 0, SITH_LORD_LIST.SIZE - SITH_LORD_LIST.SCROLL_MOVE_POSITIONS);
    return new SithLordsList(head.concat(tail));
  }

  /* moves rows in list 'down' or 'up' if it is possible, otherwise just creates a copy of current list*/
  scroll(direction) {
    if (_.isEmpty(this.getLoaded())) {
      return new SithLordsList(this.sithLords);
    }

    var first = this.getFirstLoaded(),
      last = this.getLastLoaded(),
      minAllowedIndex = SITH_LORD_LIST.SCROLL_MOVE_POSITIONS,
      maxAllowedIndex = SITH_LORD_LIST.SIZE - SITH_LORD_LIST.SCROLL_MOVE_POSITIONS - 1;

    if (direction === DIRECTION.UP && first.index <= maxAllowedIndex) {
      return this.scrollUp();
    } else if (direction === DIRECTION.DOWN && last.index >= minAllowedIndex){
      return this.scrollDown();
    } else {
      return new SithLordsList(this.sithLords);
    }
  }
}

/** Application 'actions' for components communication **/
export var Actions = Reflux.createActions([
  'planetLanding',
  'sithLordInformationLoading',
  'scrollSithLordsList'
]);

/** Planet store. Contains planet, where spacecraft has landed **/
export var PlanetStore = Reflux.createStore({

  state: {
    planet: null
  },

  init() {
    this.listenTo(Actions.planetLanding, this.onPlanetLanding);
  },

  onPlanetLanding(planet) {
    this.state = {planet: planet};
    this.trigger(this.state);
  }
});

/** Sith Lords list store. Contains Sith Lords list **/
export var SithLordsListStore = Reflux.createStore({

  state: {
    list: new SithLordsList()
  },

  init() {
    this.listenTo(Actions.sithLordInformationLoading, this.onSithLordInformationLoading);
    this.listenTo(Actions.scrollSithLordsList, this.onScrollSithLordsList);
  },

  onSithLordInformationLoading(sithLord) {
    this.state = {list: this.state.list.add(sithLord)};
    this.trigger(this.state);
  },

  onScrollSithLordsList(direction) {
    this.state = {list: this.state.list.scroll(direction)};
    this.trigger(this.state);
  }
});

/** Main application store. Combines information about planet, Sith Lords list, pending Sith Lord loading requests, UI state **/
export var Store = Reflux.createStore({

  state: {
    planet: PlanetStore.state.planet,
    list: SithLordsListStore.state.list,
    nextRequests: [],
    isFrozen: false
  },

  init() {
    this.listenTo(PlanetStore, this.newState);
    this.listenTo(SithLordsListStore, this.newState);
  },

  newState({planet = this.state.planet, list = this.state.list}) {
    var nextRequests = [],
      isFrozen = planet && list.hasSomeOneFrom(planet);

    // if any of loaded Sith Lords is from this planet - ' freeze' UI and no request
    if (!isFrozen) {
      // decide which Sith Lords load next
      var first = list.getFirstLoaded(),
        last = list.getLastLoaded();

      if (first.sithLord && first.sithLord.hasMaster() && first.index !== 0) {
        nextRequests.push(first.sithLord.master.url);
      }
      if (last.sithLord && last.sithLord.hasApprentice() && last.index !== list.sithLords.length - 1) {
        nextRequests.push(last.sithLord.apprentice.url);
      }
    }

    // application state
    this.state = {
      planet: planet,
      list: list,
      nextRequests: nextRequests,
      isFrozen: isFrozen
    };

    this.trigger(this.state);
  }

});
