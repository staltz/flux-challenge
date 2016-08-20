import React, { PropTypes } from 'react';

const PlanetMonitor = ({ name }) => (
  <h1 className="css-planet-monitor">Obi-Wan currently on { name }</h1>
);

PlanetMonitor.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PlanetMonitor;
