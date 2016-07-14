import { Stream } from 'xstream';
import { IIntent } from './intent';
import reducers, { InitialState } from './reducers';
import { IState } from './definitions';

function model(intent: IIntent): Stream<IState> {
  const reducer$ = reducers(intent);
  const state$ = reducer$.fold((next, reducer) => reducer(next), InitialState);
  return state$;
}

export default model;
