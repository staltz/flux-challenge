import React, { Component, PropTypes } from 'react';

export default class PlanetMonitor extends Component {
  render() {
    const { name } = this.props;

    return (
      <h1 className="css-planet-monitor">Obi-Wan currently on { name }</h1>
    );
  }
}

PlanetMonitor.propTypes = {
  name: PropTypes.string.isRequired
};
