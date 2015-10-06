import React from 'react'
import {connect} from 'react-redux'

class ObiWanPlanetMonitor extends React.Component {
	render() {
		return <h1 class="css-planet-monitor">
			Obi-Wan currently on {this.props.location.name}
		</h1>
	}
}

function mapStateToProps(state) {
	return {
		location: state.obiwan_location
	}
}

export default connect(mapStateToProps)(ObiWanPlanetMonitor);

