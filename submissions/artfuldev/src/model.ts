import { Stream } from 'xstream';
import { IIntent } from './intent';
import reducers, { InitialState } from './reducers';
import { IApplicationState } from './definitions';
import { IPlanet } from './drivers/planets';
import { IJedi } from './jedis';

function model(planet$: Stream<IPlanet>, jedi$: Stream<IJedi>, intent: IIntent): Stream<IApplicationState> {
  const reducer$ = reducers(planet$, jedi$, intent);
  const state$ = reducer$.fold((next, reducer) => reducer(next), InitialState);
  return state$;
}

export default model;
