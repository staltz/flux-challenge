import { Stream } from 'xstream';
import { IIntent } from './intent';
import { ISources, IApplicationState } from './definitions';
import { Record } from 'immutable';
import { IPlanet } from './drivers/planets';
import { IJedi, INamedEntity, ILinkableEntity } from './jedis';

const JediRecord = Record({
  name: 'some name',
  home: 'some home'
});

class Jedi extends JediRecord implements IJedi {
  id: number;
  name: string;
  homeworld: INamedEntity;
  master: ILinkableEntity;
  apprentice: ILinkableEntity;
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

function reducers(planet$: Stream<IPlanet>, jedi$: Stream<IJedi>, intent: IIntent): Stream<(state: IApplicationState) => IApplicationState> {
  const xs = Stream;
  const planetReducer$ =
    planet$
      .map(planet =>
        (state: IApplicationState) => {
          const appState = state as ApplicationState;
          return appState.set('planet', planet) as ApplicationState;
        });

  const jedisReducer$ =
    jedi$
      .map(jedi =>
        (state: IApplicationState) => {
          const jedis = state.jedis;
          const masterIndex = state.jedis.map(jedi => jedi.master.id).indexOf(jedi.id);
          const appState = state as ApplicationState;
          var index = 0;
          if (masterIndex !== -1)
            index = masterIndex - 1;
          else {
            const apprenticeIndex = state.jedis.map(jedi => jedi.apprentice.id).indexOf(jedi.id);
            if (apprenticeIndex !== -1)
              index = apprenticeIndex + 1;
          }
          const newJedis = [];
          jedis.forEach(j => newJedis.push(j ? new Jedi(j) : null));
          return appState.set('jedis', newJedis) as ApplicationState;
        });
  return xs.merge(
    planetReducer$,
    jedisReducer$
  );
}

export default reducers;
