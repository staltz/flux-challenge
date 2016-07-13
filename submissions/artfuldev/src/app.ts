import main from './main';
import { makeDOMDriver } from '@cycle/dom';
import { run } from '@cycle/xstream-run';

run(main, {
  dom: makeDOMDriver('#app')
})
