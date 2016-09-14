import { ISources, ISinks } from './definitions';
import intent from './intent';
import model from './model';
import view from './view';
import requests from './requests';

function main(sources: ISources): ISinks {
  const jedi$ = sources.jedis.jedi$;
  const planet$ = sources.planets.planet$;
  const state$ = model(planet$, jedi$, intent(sources));
  const vNode$ = view(state$);
  const id$ = requests(state$);
  const sinks = {
    dom: vNode$,
    jedis: id$
  };
  return sinks;
}

export default main;
