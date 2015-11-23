import _ from 'lodash';
import React from 'react';
import Component from 'Component';

import css from './styles/SithScrollButtons.css';

export default class SithScrollButtons extends Component {

  render() {
    return (
      <div className={css.base}>
        <button className={css.buttonUp}/>
        <button className={css.buttonDown}/>
      </div>
    );
  }

}
