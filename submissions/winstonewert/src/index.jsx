import React from 'react';
import {Provider} from 'react-redux';
import Root from './root';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { serverMiddleware} from './server'
import '../../../styles.css'
import _ from 'lodash'

const INITIAL_STATE = {
	dark_jedi: [
		{id: 3616},
		{},
		{},
		{},
		{}
	]
}

function update_dark_jedi(dark_jedi, payload) {
	return _.map(dark_jedi, (jedi, index) => {
		if (jedi.id == payload.id) {
			return payload;
		} else {
			return jedi;
		}
	});
}

function infer_dark_jedi_ids(dark_jedi) {
	return _.map(dark_jedi, (jedi, index) => {
		if (!jedi.id) {
			// We don't currently know the id of this jedi.
			// Try the jedi before/after to look master/apprentice.
			if (dark_jedi[index-1] 
				&& dark_jedi[index-1].apprentice) {
				return {id: dark_jedi[index-1].apprentice.id};
			}
			if (dark_jedi[index+1] 
				&& dark_jedi[index+1].master) {
				return {id: dark_jedi[index+1].master.id};
			}
		}
		return jedi;			
	});
}

function up_clicked(dark_jedi) {
	return [{}, {}].concat(_.dropRight(dark_jedi, 2));
}

function down_clicked(dark_jedi) {
	return _.drop(dark_jedi, 2).concat([{}, {}]);
}

function dark_jedi_apply_action(dark_jedi, action) {
	switch (action.type) {
		case "LOAD_DARK_JEDI":
			return _.map(dark_jedi, (jedi, index) => {
				if (jedi.id == action.payload.id) {
					return action.payload;
				} else {
					return jedi;
				}
			});
		case "UP_CLICKED":
			return [{}, {}].concat(_.dropRight(dark_jedi, 2));
		case "DOWN_CLICKED":
			return _.drop(dark_jedi, 2).concat([{}, {}]);
		default:			
			return dark_jedi;
	}
}

function dark_jedi_reducer(state = INITIAL_STATE['dark_jedi'], action) {
	return infer_dark_jedi_ids(dark_jedi_apply_action(state, action))
}

function obiwan_location_reducer(state = {}, action) {
	switch (action.type) {
		case "OBIWAN_LOCATION_CHANGE":
			return action.payload;
		default:
			return state;
	}
}

const reducer = combineReducers({
	obiwan_location: obiwan_location_reducer,
	dark_jedi: dark_jedi_reducer
});

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
			<DevTools store={store} monitor={LogMonitor} />
		</DebugPanel>
	</div>,
	document.getElementById('app')
);
