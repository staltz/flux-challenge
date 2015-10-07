import React from 'react'
import ObiWanPlanetMonitor from './obi-wan-planet-monitor'
import DarkJediList from './dark-jedi-list'

export default class Root extends React.Component {
	render() {
		return <div className="app-container">
			<div className="css-root">
				<ObiWanPlanetMonitor />
				<DarkJediList />
			</div>
		</div>
	}
}
