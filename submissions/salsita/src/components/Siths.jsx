import React from 'react';
import { connect } from 'react-redux';

import * as SithStates from '../constants/sithStates';
import * as Queries from '../reducers/queries';

const mapStateToProps = appState => {
  return {
    siths: appState.getIn(Queries.siths)
  };
};

export default connect(mapStateToProps)(props => (
  <ul className="css-slots">
    {props.siths.map((sith, index) => {
      if (sith.get('state') === SithStates.LOADED) {
        const color = sith.get('spotted') ? 'red' : null;

        return (
          <li key={index} className="css-slot">
            <h3 style={{color: color}}>{sith.get('name')}</h3>
            <h6 style={{color: color}}>Homeworld: {sith.get('homeworldName')}</h6>
          </li>
        );
      } else {
        return <li key={index} className="css-slot"></li>;
      }
    })}
  </ul>
));
