import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadedLords } from '../selectors/sithLordsSelector';

import {
  loadNextSithLords,
  loadPrevSithLords,
} from '../actions/sithLords';

import SithLord from './SithLord';
import ScrollButton from './ScrollButton';

const Actions = {
  loadNextSithLords,
  loadPrevSithLords,
};

@connect(loadedLords, Actions)
class SithLordsList extends Component {

  static propTypes = {
    loadNextSithLords: PropTypes.func.isRequired,
    loadPrevSithLords: PropTypes.func.isRequired,
    sithLords: PropTypes.array.isRequired,
    disableUI: PropTypes.bool.isRequired,
    disableUp: PropTypes.bool.isRequired,
    disableDown: PropTypes.bool.isRequired,
  }

  onClickUp() {
    this.props.loadPrevSithLords();
  }

  onClickDown() {
    this.props.loadNextSithLords();
  }

  render() {
    const {
      sithLords,
      disableUI,
      disableUp,
      disableDown,
    } = this.props;

    const sithLordsList = sithLords.map(i => {
      return (
        <SithLord
          highlight={ i.get('selected') }
          name={ i.get('name') }
          homeworld={ i.getIn(['homeworld', 'name']) } />
      );
    });

    return (
      <section className="css-scrollable-list">
        <ul className="css-slots">
          { sithLordsList }
        </ul>

        <div className="css-scroll-buttons">
          <ScrollButton
            onClick={ this.onClickUp.bind(this) }
            styleClass="css-button-up"
            isDisabled={ disableUI || disableUp } />
          <ScrollButton
            onClick={ this.onClickDown.bind(this) }
            styleClass="css-button-down"
            isDisabled={ disableUI || disableDown } />
        </div>
      </section>
    );
  }
}

export default SithLordsList;
