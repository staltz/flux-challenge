import { ISources, ISinks, IApplicationState } from './definitions';
import intent from './intent';
import model from './model';
import view from './view';
import { Stream } from 'xstream';

function jediRequests(state$: Stream<IApplicationState>): Stream<number> {
  const xs = Stream;
  const jediRequest$ =
    state$
      .map(state => xs.fromArray(state.jediRequests))
      .flatten();
  return jediRequest$;
}

function main(sources: ISources): ISinks {
  const planet$ = sources.planets.planet$;
  const state$ = model(planet$, intent(sources));
  const vDom$ = view(state$);
  const jediRequest$ = jediRequests(state$); 
  const sinks = {
    dom: vDom$,
    jedis: jediRequest$
  };
  return sinks;
}

export default main;
