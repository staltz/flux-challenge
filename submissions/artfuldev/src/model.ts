import { Stream } from 'xstream';
import { IIntent } from './intent';
import reducers, { InitialState } from './reducers';
import { IState } from './definitions';
import { IPlanet } from './drivers/planets';

function model(planet$: Stream<IPlanet>, intent: IIntent): Stream<IState> {
  const reducer$ = reducers(planet$, intent);
  const state$ = reducer$.fold((next, reducer) => reducer(next), InitialState);
  return state$;
}

export default model;
