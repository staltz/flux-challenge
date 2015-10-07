import React from 'react';
import { Provider } from 'react-redux';

import requestsTracker from './requestsTracker';
import configStore from './configStore';
import App from './App';

const store = configStore();

const websocket = new WebSocket('ws://localhost:4000');
websocket.onopen = function (event) {
  websocket.send('hello!');
};

websocket.onmessage = function (event) {
  store.dispatch({
    type: 'CHANGE_PLANET',
    planet: JSON.parse(event.data)
  });
};

store.subscribe(requestsTracker(store));

React.render(<Provider store={store}>
  {() => <App />}
</Provider>, document.getElementById('app'));
