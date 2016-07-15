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
  nextId: -1,
  pendingIds: [],
  down: false,
  up: false
});

class ApplicationState extends ApplicationStateRecord implements IApplicationState {
  planet: IPlanet;
  jedis: IJedi[];
  nextId: number;
  pendingIds: number[];
  down: boolean;
  up: boolean;
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
  nextId: 3616,
  pendingIds: [3616],
  down: false,
  up: false
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
            var index = 0;
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

  const nextIdReducer$ =
    xs.merge(
      jedi$.mapTo((state: IApplicationState) => {
        const jedis = state.jedis;
        const nextId = state.nextId;
        const pendingIds = state.pendingIds;
        var newNextId = -1;
        const appState = state as ApplicationState;
        for (var i = 0; i < 5; i++) {
          const jedi = jedis[i];
          if (jedi == null)
            continue;
          if (i > 0 && !jedis[i - 1] && jedi.master && jedi.master.id) {
            newNextId = jedi.master.id;
            break;
          }
          if (i < 4 && !jedis[i + 1] && jedi.apprentice && jedi.apprentice.id) {
            newNextId = jedi.apprentice.id;
            break;
          }
        }
        if (pendingIds.indexOf(newNextId) !== -1)
          newNextId = -1;
        const nextState = appState.set('nextId', newNextId) as ApplicationState;
        return nextState;
      }),
      intent.scrollUp$.mapTo((state: IApplicationState) => {
        const jedis = state.jedis;
        const nextId = state.nextId;
        const pendingIds = state.pendingIds;
        var newNextId = -1;
        const appState = state as ApplicationState;
        for (var i = 0; i < 5; i++) {
          const jedi = jedis[i];
          if (jedi == null)
            continue;
          if (i > 0 && !jedis[i - 1] && jedi.master && jedi.master.id) {
            newNextId = jedi.master.id;
            break;
          }
        }
        if (pendingIds.indexOf(newNextId) !== -1)
          newNextId = -1;
        const nextState = appState.set('nextId', newNextId) as ApplicationState;
        return nextState;
      }),
      intent.scrollDown$.mapTo((state: IApplicationState) => {
        const jedis = state.jedis;
        const nextId = state.nextId;
        const pendingIds = state.pendingIds;
        var newNextId = -1;
        const appState = state as ApplicationState;
        for (var i = 4; i > -1; i--) {
          const jedi = jedis[i];
          if (jedi == null)
            continue;
          if (i < 4 && !jedis[i + 1] && jedi.apprentice && jedi.apprentice.id) {
            newNextId = jedi.apprentice.id;
            break;
          }
        }
        if (pendingIds.indexOf(newNextId) !== -1)
          newNextId = -1;
        const nextState = appState.set('nextId', newNextId) as ApplicationState;
        return nextState;
      })
    );

  const pendingIdsReducer$ =
    xs.merge(
      nextIdReducer$
        .mapTo((state: IApplicationState) => {
          const nextId = state.nextId;
          if (nextId === -1)
            return state;
          const pendingIds = state.pendingIds;
          const appState = state as ApplicationState;
          const nextState = appState.set('pendingIds', pendingIds.concat(nextId)) as ApplicationState;
          return nextState;
        }),
      jedi$
        .map(jedi =>
          (state: IApplicationState) => {
            const id = jedi.id;
            const pendingIds = state.pendingIds;
            const appState = state as ApplicationState;
            const nextState = appState.set('pendingIds', pendingIds.filter(x => x !== id)) as ApplicationState;
            return nextState;
          })
    );


  const downReducer$ =
    jedi$
      .mapTo((state: IApplicationState) => {
        const jedis = state.jedis;
        const lastJedi = jedis.filter(jedi => !!jedi).pop();
        const index = jedis.indexOf(lastJedi);
        const down = lastJedi && lastJedi.apprentice && lastJedi.apprentice.id;
        const appState = state as ApplicationState;
        const nextState = appState.set('down', down) as ApplicationState;
        return nextState;
      });

  const upReducer$ =
    jedi$
      .mapTo((state: IApplicationState) => {
        const jedis = state.jedis;
        const firstJedi = jedis.filter(jedi => !!jedi).shift();
        const index = jedis.indexOf(firstJedi);
        const up = firstJedi && firstJedi.master && firstJedi.master.id;
        const appState = state as ApplicationState;
        const nextState = appState.set('up', up) as ApplicationState;
        return nextState;
      });

  return xs.merge(
    planetReducer$,
    jedisReducer$,
    nextIdReducer$,
    pendingIdsReducer$,
    downReducer$,
    upReducer$
  );
}

export default reducers;
