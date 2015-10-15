import React from 'react';
import State from '../State';
import SithList from './SithList';

export default class App extends React.Component {
	render(){
		var state = this.props.appState,
			upClass = 'css-button-up',
			downClass = 'css-button-down'
		;

		if( state.sithAtHome || state.upDisabled )
			upClass += ' css-button-disabled';
		if( state.sithAtHome || state.downDisabled )
			downClass += ' css-button-disabled';

		return (
			<div className="css-root">
				<h1 className="css-planet-monitor">Obi-Wan currently on <span>{ state.currentPlanet.name }</span></h1>
				<section className="css-scrollable-list">
					<SithList siths={ state.siths } currentPlanet={ state.currentPlanet } />
					<div className="css-scroll-buttons">
						<button className={ upClass } onClick={ State.trigger.bind( State, 'siths:goUp') }></button>
						<button className={ downClass } onClick={ State.trigger.bind( State, 'siths:goDown') }></button>
					</div>
				</section>
			</div>
		);
	}
}
