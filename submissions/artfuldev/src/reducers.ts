import { Stream } from 'xstream';
import { IIntent } from './intent';
import { ISources, IApplicationState } from './definitions';
import { Record } from 'immutable';
import { IPlanet } from './drivers/planets';
import { IJedi, INamedEntity, ILinkableEntity } from './drivers/jedis';

const JediRecord = Record({
  id: 0,
  name: null,
  homeworld: null,
  master: null,
  apprentice: null
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
  down: false,
  up: false,
  matchedId: -1
});

class ApplicationState extends ApplicationStateRecord implements IApplicationState {
  planet: IPlanet;
  jedis: IJedi[];
  down: boolean;
  up: boolean;
  matchedId: number;
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
  down: false,
  up: false,
  matchedId: -1
});

function reducers(planet$: Stream<IPlanet>, jedi$: Stream<IJedi>, intent: IIntent): Stream<(state: IApplicationState) => IApplicationState> {
  const xs = Stream;

  const planetReducer$ =
    planet$
      .map(planet =>
        (state: IApplicationState) => {
          const appState = state as ApplicationState;
          const nextState = appState.set('planet', planet) as ApplicationState;
          return nextState;
        });

  const jedisReducer$ =
    xs.merge(
      jedi$
        .map(jedi =>
          (state: IApplicationState) => {
            const jedis = state.jedis || new Array<IJedi>(5);
            const masterIndex =
              jedis
                .map(j => (j && j.master) ? j.master.id : -1)
                .indexOf(jedi.id);
            const appState = state as ApplicationState;
            var index = 2;
            if (masterIndex !== -1)
              index = masterIndex - 1;
            else {
              const apprenticeIndex =
                jedis
                  .map(j => (j && j.apprentice) ? j.apprentice.id : -1)
                  .indexOf(jedi.id);
              if (apprenticeIndex !== -1)
                index = apprenticeIndex + 1;
            }
            const newJedis =
              jedis
                .map((j, i) =>
                  i === index
                    ? new Jedi(jedi)
                    : j);
            const nextState = appState.set('jedis', newJedis) as ApplicationState;
            return nextState;
          }),
      intent.scrollUp$
        .mapTo((state: IApplicationState) => {
          const jedis = state.jedis;
          const newJedis =
            jedis
              .map((jedi, i, array) => (i < 2) ? null : array[i - 2]);
          const appState = state as ApplicationState;
          const nextState = appState.set('jedis', newJedis) as ApplicationState;
          return nextState;
        }),
      intent.scrollDown$
        .mapTo((state: IApplicationState) => {
          const jedis = state.jedis;
          const newJedis =
            jedis
              .map((jedi, i, array) => (i > 2) ? null : array[i + 2]);
          const appState = state as ApplicationState;
          const nextState = appState.set('jedis', newJedis) as ApplicationState;
          return nextState;
        })
    );

  const downReducer$ =
    xs.merge<{}>(
      jedi$,
      intent.scrollUp$
    ).mapTo((state: IApplicationState) => {
      const jedis = state.jedis;
      const lastJedi = jedis.filter(jedi => !!jedi).pop();
      const index = jedis.indexOf(lastJedi);
      const down = lastJedi && lastJedi.apprentice && lastJedi.apprentice.id;
      const appState = state as ApplicationState;
      const nextState = appState.set('down', down) as ApplicationState;
      return nextState;
    });

  const upReducer$ =
    xs.merge<{}>(
      jedi$,
      intent.scrollDown$
    ).mapTo((state: IApplicationState) => {
      const jedis = state.jedis;
      const firstJedi = jedis.filter(jedi => !!jedi).shift();
      const index = jedis.indexOf(firstJedi);
      const up = firstJedi && firstJedi.master && firstJedi.master.id;
      const appState = state as ApplicationState;
      const nextState = appState.set('up', up) as ApplicationState;
      return nextState;
    });
  
  const matchedIdReducer$ =
    xs.merge<{}>(
      jedi$,
      planet$
    ).mapTo((state: IApplicationState) => {
      const planet = state.planet;
      const appState = state as ApplicationState;
      const noMatchState = appState.set('matchedId', -1) as ApplicationState; 
      if(!planet || !planet.id)
        return noMatchState;
      const planetId = planet.id;
      const matchedJedi =
        state.jedis
          .filter(jedi => !!jedi && jedi.homeworld.id === planetId)
          .pop();
      if(!matchedJedi)
        return noMatchState;
      const nextState = noMatchState.set('matchedId', matchedJedi.id) as ApplicationState;
      return nextState;
    });

  return xs.merge(
    planetReducer$,
    jedisReducer$,
    downReducer$,
    upReducer$,
    matchedIdReducer$
  );
}

export default reducers;
