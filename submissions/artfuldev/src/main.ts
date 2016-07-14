import { ISources, ISinks, IApplicationState } from './definitions';
import intent from './intent';
import model from './model';
import view from './view';
import { Stream } from 'xstream';
import jediRequests, { isJediUrl, IJedi } from './jedis';
import { ResponseStream } from '@cycle/http';

function main(sources: ISources): ISinks {
  const http = sources.http;
  const jedi$ =
    http
      .filter(response$ => isJediUrl(response$.request.url))
      .response$$
      .flatten()
      .map(response => JSON.parse(response.body) as IJedi);
  const planet$ = sources.planets.planet$;
  const state$ = model(planet$, jedi$, intent(sources));
  const vDom$ = view(state$);
  const jediRequest$ = jediRequests(http, state$);
  const sinks = {
    dom: vDom$,
    http: jediRequest$
  };
  return sinks;
}

export default main;
