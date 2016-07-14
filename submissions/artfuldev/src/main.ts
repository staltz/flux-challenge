import { ISources, ISinks, IApplicationState } from './definitions';
import intent from './intent';
import model from './model';
import view from './view';
import { Stream } from 'xstream';
import { jediRequests, jedis } from './jedis';
import { ResponseStream } from '@cycle/http';

function main(sources: ISources): ISinks {
  const http = sources.http;
  const jedi$ = jedis(http);
  const planet$ = sources.planets.planet$;
  const state$ = model(planet$, jedi$, intent(sources));
  const dom$ = view(state$);
  const request$ = jediRequests(http, state$);
  const sinks = {
    dom: dom$,
    http: request$
  };
  return sinks;
}

export default main;
