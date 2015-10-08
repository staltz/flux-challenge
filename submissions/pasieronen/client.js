import React from 'react';
import Dispatcher from './Dispatcher';
import * as JediConstants from './JediConstants';
import JediApp from './JediApp';
import * as JediStore from './JediStore';

window.onload = () => 
  Dispatcher.dispatch(JediConstants.START, {
    firstJediId: 3616, 
    firstJediUrl: "http://localhost:3000/dark-jedis/3616", 
    websocketUrl: "ws://localhost:4000"
  });
  React.render(
    <JediApp stateObservable={JediStore.state} />,
    document.getElementById("content")
  );
