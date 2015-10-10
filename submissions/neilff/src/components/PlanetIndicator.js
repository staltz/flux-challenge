import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    planet: state.planet.name,
  };
}

@connect(mapStateToProps)
class PlanetIndicator extends Component {

  static propTypes = {
    planet: PropTypes.string.isRequired,
  }

  render() {
    const {
      planet,
    } = this.props;

    return (
      <h1 className="css-planet-monitor">Obi-Wan currently on { planet }</h1>
    );
  }
}

export default PlanetIndicator;
