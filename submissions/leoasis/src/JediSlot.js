import React from 'react';

export default class JediSlot extends React.Component {
  render() {
    const { jedi } = this.props;
    return <li className="css-slot">
      {jedi && !jedi.fetching && <div style={jedi.isInCurrentPlanet ? { color: 'red' } : null}>
        <h3>{jedi.name}</h3>
        <h6>Homeworld: {jedi.homeworld.name}</h6>
      </div>}
    </li>
  }
}
