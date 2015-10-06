
import React from 'react'
import {connect} from 'react-redux'

class DarkJedi extends React.Component {
	render() {
		if (this.props.jedi.name) {
			return <li className="css-slot">
				<h3>{this.props.jedi.name}</h3>
				<h6>Homeworld: {this.props.jedi.homeworld.name}</h6>
			</li>
		} else {
			return <li className="css-slot">
			</li>
		}
	}
}

class DarkJediList extends React.Component {
	render() {
		var jedis = _.map(this.props.dark_jedi, (jedi) => 
			<DarkJedi jedi={jedi} />
		);
		console.log(jedis);
		return <section className="css-scrollable-list">
			<ul className="css-slots">
				{jedis}
			</ul>
		</section>
	}
}

function mapStateToProps(state) {
	return {
		dark_jedi: state.dark_jedi
	}
}

export default connect(mapStateToProps)(DarkJediList);

