import main from './main';
import { makeDOMDriver } from '@cycle/dom';
import { run } from '@cycle/xstream-run';
import { makeWebSocketDriver } from './drivers';

run(main, {
  dom: makeDOMDriver('#app'),
  ws: makeWebSocketDriver('ws://localhost:4000')
})
