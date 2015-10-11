import { Observable, DOM } from 'rx-dom';
import ReactDOM from 'react-dom';

import configureStore from './configureStore.js';
import dashboard from './component/dashboard.js';
import timetravel from './component/timeTravel.js';
import DarkJediFetcher from './DarkJediFetcher.js';

const timeTravelNode = document.getElementById("time-travel");
const dashboardNode = document.getElementById('app-container');
const states = [];

const changePlanetAction$ = DOM.fromWebSocket('ws://localhost:4000').map(data => {
  return {
    type: 'NEXT_PLANET',
    payload: JSON.parse(event.data)
  };
});

let app;

function setupApp(state) {
  const store = configureStore(state);

  if(!states.length) {
    states.push(store.getState());
  }

  store.subscribe(() => {
    states.push(store.getState());
  });

  const {
    element: Dashboard,
    events: { upClick$, downClick$ }
  } = dashboard(store.state$);

  const darkJediFetcher = new DarkJediFetcher();

  const sithLordAction$ = store.state$
    .flatMap(darkJediFetcher.handle)
    .map(sithLord => {
      return {
        type: 'NEXT_SITH_LORD',
        payload: sithLord
      };
    });

  const action$ = Observable.merge(
    changePlanetAction$,
    sithLordAction$,
    upClick$.map(() => {
      return { type: 'SCROLL_UP'};
    }),
    downClick$.map(() => {
      return { type: 'SCROLL_DOWN'};
    })
  );

  // re-render entire app to get upClick$ and downClick$ work.
  ReactDOM.unmountComponentAtNode(dashboardNode);
  ReactDOM.render(Dashboard, dashboardNode);

  let subscription;

  function start() {
    while (state !== states[states.length - 1]) {
      states.pop();
    }

    subscription = action$.subscribe(store.dispatch);
  };

  function pause() {
    if (subscription) {
      subscription.dispose();
      subscription = null;
    }
  }

  function isRunning() {
    return !!subscription;
  }

  return { start, pause, isRunning };
}

app = setupApp();
app.start();



// ========================
// Setup time travel widget
// ========================

const { element: TimeTravel, sliderEv$, click$: tmClick$ } = timetravel(states);
ReactDOM.render(TimeTravel, timeTravelNode);

tmClick$.subscribe((e) => {
  if (app.isRunning()) {
    app.pause();
  } else {
    app.start();
  }
});

sliderEv$.subscribe((e) => {
  const index = e.target.value;
  app = setupApp(states[index]);
});
