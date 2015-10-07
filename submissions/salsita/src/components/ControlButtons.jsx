import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { scrolledUp, scrolledDown } from '../actions/actions';
import * as Queries from '../reducers/queries';

const mapStateToProps = appState => {
  return {
    disabledUp: appState.getIn(Queries.disabledUp),
    disabledDown: appState.getIn(Queries.disabledDown)
  };
};

export default connect(mapStateToProps)(props => (
  <div className="css-scroll-buttons">
    <button className={classnames({'css-button-up': true, 'css-button-disabled': props.disabledUp })} onClick={() => props.dispatch(scrolledUp())}></button>
    <button className={classnames({'css-button-down': true, 'css-button-disabled': props.disabledDown })} onClick={() => props.dispatch(scrolledDown())}></button>
  </div>
));
