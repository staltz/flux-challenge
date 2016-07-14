import { Stream } from 'xstream';
import { IIntent } from './intent';
import { ISources, IApplicationState, IJedi } from './definitions';
import { Record } from 'immutable';
import { IPlanet } from './drivers/planets';

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
  planet: {
    name: 'some planet',
    id: 0
  },
  jedis: [
    new Jedi({
      name: 'some name',
      home: 'some home'
    })
  ]
});

class ApplicationState extends ApplicationStateRecord implements IApplicationState {
  planet: IPlanet;
  jedis: IJedi[];
  constructor(props: IApplicationState) {
    super(props);
  }
}

export const InitialState: IApplicationState = new ApplicationState({
  planet: null,
  jedis: []
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
