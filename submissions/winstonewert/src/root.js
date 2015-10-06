import React from 'react'
import ObiWanPlanetMonitor from './obi-wan-planet-monitor'

export default class Root extends React.Component {
	render() {
		return <div class="app-container">
			<div class="css-root">
				<ObiWanPlanetMonitor />
			</div>
		</div>
	}
}
