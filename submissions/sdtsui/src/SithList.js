let Sith = require('./Sith');
let __D = require('./constants');

class SithList {
  constructor(dashboard) {
    this._dashboard = dashboard;
    this._head = 0;
    this._tail = 4;
    this._storage = [];
    this._homeworlds = {};
    this._indices = {
      "0" : null,
      "1" : null,
      "2" : null,
      "3" : null,
      "4" : null,
    }
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
  shiftList(times, dir) {

    let newIndices = {
      "0" : null,
      "1" : null,
      "2" : null,
      "3" : null,
      "4" : null,      
    };
    let __last_removed_sith = undefined;
    if (dir !== 'up' && dir !== 'down') {
      return new Error('2nd parameter must be "up" or "down"')
    };
    
    /**
     * Tech Debt: Use a mapping function.
     */
    for (var key in this._indices) {
      var maybeSith = this._indices[key];
      let num = parseInt(key);
      let newIndex = (dir === 'up') ? num += times : num -= times;
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
        if(!!maybeSith){
          if (!!maybeSith.isPending() && !maybeSith.hasData()){
            maybeSith.cancel();
          } else if (!!maybeSith.hasData()) {
            //maybeSith has data, and is leaving, so we keep last
            //to handle 'empty UI' edge case
            let world = maybeSith.data.homeworld.name;
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
    if(this.numberOfLoadedSith() < 1) {
      //disable UI input first
      let dash = this._dashboard;
      dash._ui.disableAll.bind(dash)();

      //refill UI with last removed sith;
      let LMS = __last_removed_sith;
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

  stopFetchingAll() {
    //cancellAll --- Not needed yet.
  }
  // resumeFetching() {
    
  //   let found = this.findOneSith();
  //   this.fillRemainingSlots(found);
  // }
  shiftListUp() {
    
    return this.shiftList(2, 'up');
  }

  shiftListDown() {
    
    return this.shiftList(2, 'down')
  }

  cancelAllAjax() {
    console.log('cancelling all ajax_____');
    this.mapOverIndices((sith) => {
      if (!sith.hasData()){
        //must be pending
        sith.cancel();
      }
    });
  }

  hasHomeWorld(world) {
    return !!this._homeworlds[world];
  }

  mapOverIndices(cb) {
    let result = {};
    let obj = this._indices;
    for (var key in obj) {
      result[key] = cb(obj[key], key, obj);
    }
    return result;
  }

  toJSON() {
    //Warn: Not used anywhere.
    return JSON.stringify(this._indices);
  }

  //helperMethods:
  addSithAt(url, key) {
    //Dirty cancel;
    if (url === null) {
      console.log("Tech Debt: unexplained null url");
      return;
    };
    let newSith = new Sith(url, key, this);
    this._indices[key] = newSith;
  }

  getSithAt(key) {
    if (typeof key === 'number'){
      return this._indices[key];
    } else if (typeof key === 'string') {
      //will be head or tail
      return this.findOneSith(key) || null;
    } else {
      return new Error('getSithAt, received invalid input');
    }
  }

  sithExistsAt(key) {
    //Warn: Not used anywhere.
    return !!(this._indices[key] instanceof Sith);
  }

  numberOfLoadedSith() {
    /**
     * tech debt: use _ filter
     * @type {Number}
     */
    let count = 0;
    let storage = this._indices;
    for (var key in this._indices) {
      let maybeSith = storage[key];
      if (maybeSith instanceof Sith && maybeSith.hasData()){
        count++;
      };
    }
    return count;
  }

  resumeFetching() {
    let first = this.findOneSith();
    if (!!first) first.fillRemainingSlots(first);
  }

  /**
   * Iterates over _indices and returns the first Sith it finds.
   *
   * Used as a default param for fillRemainingSlots;
   * @return {[type]} [description]
   */
  findOneSith(fromDirection = 'head') {
    let obj = this._indices;
    let maxKey = Object.keys(obj).length;
    if (fromDirection === 'head') {
      for (var key in obj) {
        let s = obj[key];
        if (s instanceof Sith && s.hasData()) {
          return obj[key];
          break;
        }
      }      
    } else if (fromDirection === 'tail') {
      for (var key = maxKey; key >= 0; key--){
        let s = obj[key];
        if (s instanceof Sith && s.hasData()) {
          return obj[key];
          break;
        }
      }
    }

    //list is empty
    return null;
  }

}

module.exports = SithList;