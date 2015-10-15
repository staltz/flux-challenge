import React from 'react';
import Sith from './Sith';

export default class SithList extends React.Component {
	render(){
		return (
			<ul className="css-slots">
				{ this.props.siths.map( (s) => <Sith sith={ s } atHome={ s.homeworld && s.homeworld.id === this.props.currentPlanet.id } /> ) }
			</ul>
		);
	}
}
