import { Stream } from 'xstream';
import { IIntent } from './intent';
import { ISources, IState, IJedi } from './definitions';
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

const StateRecord = Record({
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

class State extends StateRecord implements IState {
  planet: IPlanet;
  jedis: IJedi[];
  constructor(props: IState) {
    super(props);
  }
}

export const InitialState: IState = new State({
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

function reducers(planet$: Stream<IPlanet>, intent: IIntent): Stream<(state: IState) => IState> {
  const planetReducer$ =
    planet$
      .map(planet =>
        (state: IState) => {
          return (state as State).set('planet', planet) as State;
        });
  return planetReducer$;
}

export default reducers;
