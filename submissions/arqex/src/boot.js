import React from 'react';
import AppContainer from './components/AppContainer';
import State from './State';

// Subscribe reactions
import './Reactions';

// Start listening to planet updates
var ws = new WebSocket('ws://localhost:4000');
ws.onmessage = function (event) {
	State.trigger('planet:update', JSON.parse(event.data) );
};

// Fetch the first sith
State.trigger('siths:fetch', 3616);

React.render(<AppContainer />, document.getElementById('root'));
