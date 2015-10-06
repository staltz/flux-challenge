import React from 'react'
import ObiWanPlanetMonitor from './obi-wan-planet-monitor'

export default class Root extends React.Component {
	render() {
		return <div className="app-container">
			<div className="css-root">
				<ObiWanPlanetMonitor />
			</div>
		</div>
	}
}
