import React, { PropTypes } from 'react';
import R from 'ramda';

const Siths = ({ obiCurrentPlanetId, paddingTop, paddingBottom, siths }) => (
  <ul className="css-slots">
    {R.range(0, paddingTop).map(i =>
      <li className="css-slot" key={`top${i}`}></li>
    )}
    {siths.map((sith) =>
      <li className="css-slot"
          key={sith.id}
          style={obiCurrentPlanetId === sith.homeworld.id ? { color: 'red' } : null}>
        <h3>{sith.name}</h3>
        <h6>Homeworld: {sith.homeworld.name}</h6>
      </li>
    )}
    {R.range(0, paddingBottom).map(i =>
      <li className="css-slot" key={`bottom${i}`}></li>
    )}
  </ul>
);

Siths.propTypes = {
  siths: PropTypes.object.isRequired,
  obiCurrentPlanetId: PropTypes.number,
  paddingTop: PropTypes.number.isRequired,
  paddingBottom: PropTypes.number.isRequired
};

export default Siths;
