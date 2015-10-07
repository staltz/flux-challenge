import React from 'react'
import {connect} from 'react-redux'

class ObiWanPlanetMonitor extends React.Component {
	render() {
		if (this.props.location.name) {
			return <h1 className="css-planet-monitor">
				Obi-Wan currently on {this.props.location.name}
			</h1>
		} else {
			return <h1 className="css-planet-monitor">
				Obi-Wan's location is unknown
			</h1>
		}
	}
}

function mapStateToProps(state) {
	return {
		location: state.obiwan_location
	}
}

export default connect(mapStateToProps)(ObiWanPlanetMonitor);

