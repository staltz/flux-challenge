import { Stream } from 'xstream';
import { IIntent } from './intent';
import reducers, { InitialState } from './reducers';
import { IState, IPlanet } from './definitions';

function model(planet$: Stream<IPlanet>, intent: IIntent): Stream<IState> {
  const planetName$ = planet$.map(planet => planet.name);
  const reducer$ = reducers(planetName$, intent);
  const state$ = reducer$.fold((next, reducer) => reducer(next), InitialState);
  return state$;
}

export default model;
