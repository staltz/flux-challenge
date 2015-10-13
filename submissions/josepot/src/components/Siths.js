import React, { PropTypes, Component } from 'react';
import R from 'ramda';

export default class Siths extends Component {
  render() {
    const { paddingTop, paddingBottom, siths } = this.props;
    return (
      <ul className="css-slots">
        {R.range(0, paddingTop).map((i) =>
          <li className="css-slot" key={`top${i}`}></li>
        )}
        {siths.map((sith) =>
          <li className="css-slot"
              key = {sith.id}
              style={this.isObiInSithHomeworld(sith) ? { color: 'red' } : null}>
            <h3>{sith.name}</h3>
            <h6>Homeworld: {sith.homeworld.name}</h6>
          </li>
        )}
        {R.range(0, paddingBottom).map((i) =>
          <li className="css-slot" key={`bottom${i}`}></li>
        )}
      </ul>
    );
  }

  isObiInSithHomeworld(sith) {
    return this.props.obiCurrentPlanetId === sith.homeworld.id;
  }
}

Siths.propTypes = {
  siths: PropTypes.array.isRequired,
  obiCurrentPlanetId: PropTypes.number.isRequired,
  paddingTop: PropTypes.number.isRequired,
  paddingBottom: PropTypes.number.isRequired
};
