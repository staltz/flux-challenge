import main from './main';
import { makeDOMDriver } from '@cycle/dom';
import { run } from '@cycle/xstream-run';
import { makePlanetsDriver } from './drivers/planets';
import { makeHTTPDriver } from '@cycle/http';

run(main, {
  dom: makeDOMDriver('#app'),
  planets: makePlanetsDriver(),
  http: makeHTTPDriver()
});
