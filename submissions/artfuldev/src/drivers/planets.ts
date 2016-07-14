import { Stream, Producer, Listener } from 'xstream';

export interface IPlanet {
  id: number;
  name: string;
}

export class PlanetsDriver {
  planet$: Stream<IPlanet>;
  constructor() {
    const xs = Stream;
    const producer: Producer<IPlanet> = {
      start: function (listener: Listener<IPlanet>) {
        this.connection = new WebSocket('ws://localhost:4000');
        this.connection.onmessage =
          msg =>
            listener.next(JSON.parse(msg.data as string) as IPlanet);
        this.connection.onerror =
          err => listener.error(err);
      },
      stop: function () {
        this.connection.close();
      }
    };
    this.planet$ = xs.create(producer);
  }
}

export function makePlanetsDriver() {
  function planetsDriver() {
    return new PlanetsDriver();
  }
  return planetsDriver;
}
