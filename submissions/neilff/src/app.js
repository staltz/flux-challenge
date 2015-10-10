import 'babel-core/polyfill';
import React from 'react';
import Rx from 'rx-dom';
import { bindActionCreators } from 'redux';
import { observableFromStore } from 'redux-rx';
import { Provider } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import configureStore from './store/configureStore';

import { homeworldMatchesPlanet } from './selectors/homeworldMatchesPlanet';
import { onPlanetUpdate } from './actions/planetIndicator';
import { loadSithLord } from './actions/sithLords';

const actions = {
  onPlanetUpdate,
  loadSithLord,
};

import App from './containers/App';

const store = configureStore({});
const Actions = bindActionCreators(actions, store.dispatch);

const socket = Rx.DOM.fromWebSocket('ws://localhost:4000');

socket.subscribe(
  function onEvent(e) {
    Actions.onPlanetUpdate(JSON.parse(e.data));
  },
  function onError(e) {
    console.error('error: ', e);
  },
  function onClosed() {
    console.info('socket closed');
  }
);

const sithLords$ = observableFromStore(store);

sithLords$
  .distinct()
  .subscribe(state => {
    const planetMatch = homeworldMatchesPlanet(state);

    console.log('Observer Planet Match :: ', planetMatch);

    if (!planetMatch) {
      const rdyForRequest = state.sithLords
        .toList()
        .filter(i => {
          return i.get('id') !== null &&
                 i.get('id') !== undefined &&
                 i.get('name') === null &&
                 i.get('isLoading') === false;
        })
        .toJS();

      if (rdyForRequest.length > 0) {
        console.info('Requesting the following Sith Lords :: ', rdyForRequest);
      }

      rdyForRequest.forEach(i => {
        Actions.loadSithLord(i.id, i.idx);
      });
    }
  });

React.render(
  <div>
    <Provider store={ store }>
      {() =>
        <App />
      }
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={ store }
                monitor={ LogMonitor }
                visibleOnLoad />
    </DebugPanel>
  </div>,
  document.getElementById('root')
);
