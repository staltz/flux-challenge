import { Observable, DOM } from 'rx-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './configureStore.js';
import * as actions from './actions.js';
import dashboard from './component/dashboard.js';
import timetravel from './component/timeTravel.js';
import DarkJediFetcher from './DarkJediFetcher.js';

const timeTravelNode = document.getElementById("time-travel");
const dashboardNode = document.getElementById('app-container');

const states = [];
const obiWanLocation$ = DOM.fromWebSocket('ws://localhost:4000')
  .map(event => JSON.parse(event.data));

let app;

function setupApp(initState) {
  const store = configureStore(initState);

  const {
    element: Dashboard,
    events: { upClick$, downClick$ }
  } = dashboard(store.state$);

  // if we write `ReactDOM.render(Dashboard, dashboardNode);`
  // click event streams will not work after doing time travel.
  // so we need to wrap Dashboard to a React component.
  class App extends React.Component {
    render() {
      return Dashboard;
    }
  }

  ReactDOM.render(<App />, dashboardNode);



  let subscription = null;

  function start() {
    // pop states after doing time travel
    while (initState && states.length && initState !== states[states.length - 1]) {
      states.pop();
    }

    if(!states.length) {
      states.push(store.getState());
    }

    store.subscribe(() => states.push(store.getState()));

    const darkJediFetcher = new DarkJediFetcher(store.state$);

    const action$ = Observable.merge(
      obiWanLocation$.map(actions.nextPlanet),
      darkJediFetcher.darkJedi$.map(actions.nextDarkJedi),
      upClick$.map(actions.scrollUp),
      downClick$.map(actions.scrollDown)
    );

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
  const index = e.target.value;
  app = setupApp(states[index]);
});
