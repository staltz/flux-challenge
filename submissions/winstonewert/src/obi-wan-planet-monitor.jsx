import React from 'react'
import {connect} from 'react-redux'

class ObiWanPlanetMonitor extends React.Component {
	render() {
		if (this.props.location) {
			return <h1 className="css-planet-monitor">
				Obi-Wan currently on {this.props.location.name}
			</h1>
		} else {
			return <div/>
		}
	}
}

function mapStateToProps(state) {
	return {
		location: state.obiwan_location
	}
}

export default connect(mapStateToProps)(ObiWanPlanetMonitor);

