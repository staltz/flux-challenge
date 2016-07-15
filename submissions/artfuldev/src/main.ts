import { ISources, ISinks, IApplicationState } from './definitions';
import intent from './intent';
import model from './model';
import view from './view';
import xs from 'xstream';
import { ResponseStream } from '@cycle/http';

function main(sources: ISources): ISinks {
  const jedi$ = sources.jedis.jedi$;
  const planet$ = sources.planets.planet$;
  const state$ = model(planet$, jedi$, intent(sources));
  const vNode$ = view(state$);
  const id$ = state$.map(state => xs.fromArray(state.jediRequests)).flatten();
  const sinks = {
    dom: vNode$,
    jedis: id$
  };
  return sinks;
}

export default main;
