import React, { Component } from 'react';
import State from '../State';
import App from './App';

export default class AppContainer extends Component {
	render() {
		var state = State.get();
		return (
			<div className="app-container">
				<App appState={ state } />
			</div>
		);
	}
	componentDidMount(){
		State.on('update', () => this.forceUpdate() );
	}
}
