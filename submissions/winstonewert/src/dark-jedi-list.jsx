
import React from 'react'
import {connect} from 'react-redux'

class DarkJedi extends React.Component {
	render() {
		if (this.props.jedi.name) {
			console.log(this.props);
			var style;
			if (this.props.obiwanLocationId == this.props.jedi.homeworld.id) {
				style = {color: "red"}
			} else {
				style = {}
			}
			return <li className="css-slot" style={style}>
				<h3>{this.props.jedi.name}</h3>
				<h6>Homeworld: {this.props.jedi.homeworld.name}</h6>
			</li>
		} else {
			return <li className="css-slot">
			</li>
		}
	}
}

class NavigationButton extends React.Component {
	render() {

	}
}

class DarkJediList extends React.Component {
	render() {
		var obiwan_should_investigate = _.some(this.props.dark_jedi, (dark_jedi) => dark_jedi.homeworld && dark_jedi.homeworld.id == this.props.obiwan_location_id);

		var jedis = _.map(this.props.dark_jedi, (jedi) => 
			<DarkJedi key={jedi.id} jedi={jedi} obiwanLocationId={this.props.obiwan_location_id} />
		);
		return <section className="css-scrollable-list">
			<ul className="css-slots">
				{jedis}
			</ul>
			<div className="css-scroll-buttons">
				<button className={!obiwan_should_investigate ? "css-button-up" : "css-button-up css-button-disabled"} onClick={this.upClicked.bind(this)} disabled={obiwan_should_investigate}></button>
				<button className={!obiwan_should_investigate ? "css-button-down" : "css-button-down css-button-disabled"} onClick={this.downClicked.bind(this)} disabled={obiwan_should_investigate}></button>
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
	console.log(state);
	return {
		obiwan_location_id: state.obiwan_location.id,
		dark_jedi: state.dark_jedi
	}
}

export default connect(mapStateToProps)(DarkJediList);

