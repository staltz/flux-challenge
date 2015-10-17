'use strict';

import {Actions} from 'store.js';

/** Jedi Master **/
export class Jedi {

  constructor(name) {
    this.name = name;
  }
}

/** Sith Lord **/
export class SithLord {

  constructor({name, id, homeworld, apprentice, master}) {
    this.id = id;
    this.name = name;
    this.homeworld = new Planet(homeworld);
    this.apprentice = apprentice;
    this.master = master;
  }

  isFromPlanet(planet) {
    return planet && this.homeworld.id === planet.id;
  }

  hasMaster() {
    return this.master && this.master.id;
  }

  hasApprentice() {
    return this.apprentice && this.apprentice.id;
  }

}

/** Planet in space, has a name and an unique identifier **/
export class Planet {
  constructor({name: name, id: id}) {
    this.name = name;
    this.id = id;
  }
}

/** Spaceship - travels in space, lands on different planets **/
export class Spacecraft {

  constructor(name, pilot) {
    this.name = name;
    this.pilot = pilot;
  }

  /*
    Ground Control to Major Tom
    Take your protein pills and put your helmet on
    Ground Control to Major Tom
    Commencing countdown, engines on
  */
  start(route) {
    if (this.ws) {
      this.ws.close();
    }
    this.ws = new WebSocket(route);
    this.ws.onmessage = (message => {
      var nextPlanet = new Planet(JSON.parse(message.data));
      Actions.planetLanding(nextPlanet);
    });
  }

  stop() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}