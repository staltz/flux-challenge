import React from 'react';

export default class Sith extends React.Component {
	render(){
		var sith = this.props.sith,
			className = 'css-slot'
		;

		if( !sith.name )
			return <li className={ className }></li>;

		if( this.props.atHome )
			className += ' red';

		return (
			<li className={ className } key={ sith.id }>
				<h3>{ sith.name }</h3>
				<h6>Homeworld: <span>{ sith.homeworld.name }</span></h6>
			</li>
		);
	}
}
