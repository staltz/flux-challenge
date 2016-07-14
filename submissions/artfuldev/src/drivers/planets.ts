import { Stream, Producer, Listener } from 'xstream';

export interface IPlanet {
  id: number;
  name: string;
}

export class PlanetDriver {
  planet$: Stream<IPlanet>;
  constructor() {
    const xs = Stream;
    const connection = new WebSocket('ws://localhost:4000');
    const producer: Producer<IPlanet> = {
      start: function (listener: Listener<IPlanet>) {
        connection.onmessage =
          msg =>
            listener.next(JSON.parse(msg.data as string) as IPlanet);
        connection.onerror =
          err => listener.error(err);
      },
      stop: function () {
        connection.close();
      }
    };
    this.planet$ = xs.create(producer);
  }
}

export function makePlanetsDriver() {
  function planetsDriver() {
    return new PlanetDriver();
  }
  return planetsDriver;
}
