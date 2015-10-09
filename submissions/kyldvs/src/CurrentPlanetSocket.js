/**
 * @flow
 */

'use strict';

import Dispatcher from './Dispatcher';

let connection;

function init() {
  if (connection) {
    return;
  }
  connection = new WebSocket('ws://localhost:4000');
  connection.onopen = () => {};
  connection.onmessage = (message) => {
    const data = JSON.parse(message.data);
    Dispatcher.dispatch({
      type: 'change-current-planet',
      name: data.name,
    });
  };
  connection.onerror = (error) => {
    console.error('error', error);
  };
}

function close() {
  if (!connection) {
    return;
  }
  connection.close();
  connection = null;
}

export default {init, close};
