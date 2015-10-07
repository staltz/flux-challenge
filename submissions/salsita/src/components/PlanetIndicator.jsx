import React from 'react';
import { connect } from 'react-redux';

import * as Queries from '../reducers/queries';

const mapStateToProps = appState => {
  return {
    planet: appState.getIn(Queries.planet)
  };
};

export default connect(mapStateToProps)(props => {
  if (props.planet) {
    return <h1 className="css-planet-monitor">Obi-Wan currently on {props.planet.get('name')}</h1>;
  } else {
    return <h1 className="css-planet-monitor">Obi-Wan is travelling across the galaxy</h1>;
  }
});
