
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
		var className = this.props.disabled
			? "css-button-disabled " + this.props.className
			: this.props.className;


		return <button className={className} onClick={this.props.onClick} disabled={this.props.disabled}/>
	}
}

class DarkJediList extends React.Component {
	render() {
		var obiwan_should_investigate = _.some(this.props.dark_jedi, (dark_jedi) => dark_jedi.homeworld && dark_jedi.homeworld.id == this.props.obiwan_location_id);

		var jedis = _.map(this.props.dark_jedi, (jedi) => 
			<DarkJedi key={jedi.id} jedi={jedi} obiwanLocationId={this.props.obiwan_location_id} />
		);

		var can_go_up = !obiwan_should_investigate && this.props.dark_jedi[0].master && this.props.dark_jedi[0].master.id;
		var can_go_down = !obiwan_should_investigate && this.props.dark_jedi[4].master && this.props.dark_jedi[4].apprentice.id;

		return <section className="css-scrollable-list">
			<ul className="css-slots">
				{jedis}
			</ul>
			<div className="css-scroll-buttons">
				<NavigationButton className="css-button-up" onClick={this.upClicked.bind(this)} disabled={!can_go_up} />
				<NavigationButton className="css-button-down" onClick={this.downClicked.bind(this)} disabled={!can_go_down} />
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

