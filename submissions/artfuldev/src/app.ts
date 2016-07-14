import main from './main';
import { makeDOMDriver } from '@cycle/dom';
import { run } from '@cycle/xstream-run';
import { makePlanetsDriver } from './drivers/planets';
import { makeJedisDriver } from './drivers/jedis';

run(main, {
  dom: makeDOMDriver('#app'),
  planets: makePlanetsDriver(),
  jedis: makeJedisDriver()
});
