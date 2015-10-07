import React from 'react';
import {Provider} from 'react-redux';
import Root from './root';
import { compose, createStore, applyMiddleware } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { serverMiddleware} from './server'
import '../../../styles.css'
import _ from 'lodash'
import reducer from './reducer'

const finalCreateStore = compose(
	applyMiddleware(serverMiddleware),		
	devTools(),
	persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = finalCreateStore(reducer);

React.render(
	<div>		
		<Provider store={store}>
			{() => <Root />}
		</Provider>
		<DebugPanel top right bottom>
			<DevTools store={store} monitor={LogMonitor}  visibleOnLoad={false}/>
		</DebugPanel>
	</div>,
	document.getElementById('app')
);
