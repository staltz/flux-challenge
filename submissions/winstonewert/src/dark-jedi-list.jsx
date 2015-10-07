
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
			<DarkJedi key={jedi.id} jedi={jedi} />
		);
		console.log(jedis);
		return <section className="css-scrollable-list">
			<ul className="css-slots">
				{jedis}
			</ul>
			<div className="css-scroll-buttons">
				<button className="css-button-up" onClick={this.upClicked.bind(this)}></button>
				<button className="css-button-down" onClick={this.downClicked.bind(this)}></button>
			</div>
		</section>
	}

	upClicked() {
		this.props.dispatch({type: "UP_CLICKED"});
	}

	downClicked() {
		this.props.dispatch({type: "DOWN_CLICKED"});
	}
}

function mapStateToProps(state) {
	return {
		dark_jedi: state.dark_jedi
	}
}

export default connect(mapStateToProps)(DarkJediList);

