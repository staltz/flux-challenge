import { Stream } from 'xstream';
import { IIntent } from './intent';
import { ISources, IApplicationState } from './definitions';
import { Record } from 'immutable';
import { IPlanet } from './drivers/planets';
import { IJedi } from './drivers/jedis';

const JediRecord = Record({
  name: 'some name',
  home: 'some home'
});

class Jedi extends JediRecord implements IJedi {
  name: string;
  home: string;
  constructor(props: IJedi) {
    super(props);
  }
}

const ApplicationStateRecord = Record({
  planet: null,
  jedis: new Array<IJedi>(),
  jediRequests: new Array<number>()
});

class ApplicationState extends ApplicationStateRecord implements IApplicationState {
  planet: IPlanet;
  jedis: IJedi[];
  jediRequests: number[];
  constructor(props: IApplicationState) {
    super(props);
  }
}

export const InitialState: IApplicationState = new ApplicationState({
  planet: null,
  jedis: [
    null,
    null,
    null,
    null,
    null
  ],
  jediRequests: [
    3616
  ]
});

function reducers(planet$: Stream<IPlanet>, intent: IIntent): Stream<(state: IApplicationState) => IApplicationState> {
  const planetReducer$ =
    planet$
      .map(planet =>
        (state: IApplicationState) => {
          return (state as ApplicationState).set('planet', planet) as ApplicationState;
        });
  return planetReducer$;
}

export default reducers;
