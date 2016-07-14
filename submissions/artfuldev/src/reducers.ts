import { Stream } from 'xstream';
import { IIntent } from './intent';
import { IState, IJedi } from './definitions';
import { Record } from 'immutable';

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
  planet: 'some planet',
  jedis: [
    new Jedi({
      name: 'some name',
      home: 'some home'
    })
  ]
});

class State extends StateRecord implements IState {
  planet: string;
  jedis: IJedi[];
  constructor(props: IState) {
    super(props);
  }
}

export const InitialState: IState = new State({
  planet: 'some planet',
  jedis: [{
    name: 'some name',
    home: 'some home'
  }]
});

function reducers(intent: IIntent): Stream<(state: IState) => IState> {
  const planetReducer$ =
    intent.planet$
      .map(planet =>
        (state: IState) => {
          return (state as State).set('planet', planet) as State;
        });
  return planetReducer$;
}

export default reducers;
