import React from 'react';

import SithList from './components/sith-list.js';

const ws = new WebSocket('ws://localhost:4000');

export default class extends React.Component {

    constructor() {
        super();

        ws.onmessage = this.updateCurentPlanet;
    }

    state = {
        currentPlanet: '',
    }

    updateCurentPlanet = (event)=> {
        this.setState({currentPlanet:JSON.parse(event.data).name});
    }

    render() {
        return (
            <div className="app-container">
                <div className="css-root">
                    <h1 className="css-planet-monitor">Obi-Wan currently on {this.state.currentPlanet}</h1>
                    <SithList obiPlanet={this.state.currentPlanet}/>
                </div>
            </div>
        )
    }
}
