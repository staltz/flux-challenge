import { Observable, DOM } from 'rx-dom';
import ReactDOM from 'react-dom';

import configureStore from './configureStore.js';
import dashboard from './component/dashboard.js';
import timetravel from './component/timeTravel.js';
import DarkJediFetcher from './DarkJediFetcher.js';

const timeTravelNode = document.getElementById("time-travel");
const dashboardNode = document.getElementById('app-container');

const states = [];
const obiWanLocation$ = DOM.fromWebSocket('ws://localhost:4000');

let app;
let timeTraveled = false;

function setupApp(initState) {
  const store = configureStore(initState);

  // init states
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
  const darkJedi$ = store.state$.flatMap(darkJediFetcher.handle);

  const action$ = Observable.merge(
    obiWanLocation$.map(data => {
      return {
        type: 'NEXT_PLANET',
        payload: JSON.parse(event.data)
      };
    }),
    darkJedi$.map(darkJedi => {
      return {
        type: 'NEXT_SITH_LORD',
        payload: darkJedi
      };
    }),
    upClick$.map(() => {
      return {
        type: 'SCROLL_UP'
      };
    }),
    downClick$.map(() => {
      return {
        type: 'SCROLL_DOWN'
      };
    })
  );

  // re-render entire app to get upClick$ and downClick$ work.
  ReactDOM.unmountComponentAtNode(dashboardNode);
  ReactDOM.render(Dashboard, dashboardNode);

  let subscription = null;

  function start() {
    if (timeTraveled) {
      // pop states after doing time travel
      while (initState !== states[states.length - 1]) {
        if (states.length === 0) {
          throw new Error('cannot pop anymore');
        }

        states.pop();
      }

      timeTraveled = false;
    }

    subscription = action$.subscribe(store.dispatch);
  };

  function pause() {
    subscription.dispose();
    subscription = null;
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
  timeTraveled = true;
  const index = e.target.value;
  app = setupApp(states[index]);
});
