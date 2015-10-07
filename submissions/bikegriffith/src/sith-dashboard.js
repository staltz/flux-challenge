import React from "react";
import dataService from './data-service';



export default class SithDashboard extends React.Component {

  constructor() {
    super();
    this.state = {
      obiWanCurrentPlanet: dataService.getLastObiWanPlanet(),
      canScroll: {up: false, down: false},
      visibleSithLords: []
    };

    dataService.getSithLords({
      current: this.state.visibleSithLords,
      max: 5
    }, result => this.setState({visibleSithLords: result}) );
  }

  componentDidMount() {
    dataService.subscribe( obiWanCurrentPlanet => this.setState({obiWanCurrentPlanet: obiWanCurrentPlanet}) );
  }

  scrollUp() {
    this.setState({
      visibleSithLords: this.state.visibleSithLords.splice(0, 3)
    });
    dataService.getSithLords({
      current: this.state.visibleSithLords,
      reverse: true,
      max: 5
    }, result => this.setState({visibleSithLords: result}) );
  }

  scrollDown() {
    this.setState({
      visibleSithLords: this.state.visibleSithLords.splice(2, 3)
    });
    dataService.getSithLords({
      current: this.state.visibleSithLords,
      max: 5
    }, result => this.setState({visibleSithLords: result}) );
  }

  render() {
    return (
      <div className="css-root">
        <h1 className="css-planet-monitor">Obi-Wan currently on {this.state.obiWanCurrentPlanet.name}</h1>

        <section className="css-scrollable-list">
          <ul className="css-slots">
          {this.state.visibleSithLords.map( sithLord => this.renderSithLord(sithLord) )}
          </ul>

          <div className="css-scroll-buttons">
            <button onClick={this.scrollUp.bind(this)} className="css-button-up"></button>
            <button onClick={this.scrollDown.bind(this)} className="css-button-down"></button>
          </div>
        </section>
      </div>
    );
  }

  renderSithLord(sithLord) {
    let style = {color: this.isSithOnCurrentObiWantPlanet(sithLord) ? '#ff0000' : '#ffffff'}
    return (
      <li className="css-slot" style={style}>
        <h3>{sithLord.name}</h3>
        <h6>Homeworld: {sithLord.homeworld}</h6>
      </li>
    );
  }

  isSithOnCurrentObiWantPlanet(sithLord) {
    return (sithLord.homeworld.id === this.state.obiWanCurrentPlanet.id);
  }
}
