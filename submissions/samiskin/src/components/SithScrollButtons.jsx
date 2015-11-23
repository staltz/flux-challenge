import _ from 'lodash';
import React from 'react';
import Component from 'Component';
import SithActions from 'actions/SithActions';

import css from './styles/SithScrollButtons.css';

export default class SithScrollButtons extends Component {

  handleUp() {
    SithActions.setCurrentSithRequests();
  }

  handleDown() {
    SithActions.setCurrentSithRequests();
  }

  render() {
    return (
      <div className={css.base}>
        <button className={css.buttonUp} onClick={this.handleUp.bind(this)}/>
        <button className={css.buttonDown} onClick={this.handleDown.bind(this)}/>
      </div>
    );
  }

}
