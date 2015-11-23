import _ from 'lodash';

import React from 'react';
import Component from 'Component';

import css from './styles/SithList.css';

export default class SithList extends Component {

  syncState() {
    return {
      siths: [
        {name: 'Skeere Khan', homeworld: 'Coruscant'},
        {name: 'Skeere Khan', homeworld: 'Coruscant'},
        {name: 'Skeere Khan', homeworld: 'Coruscant'},
        {name: 'Skeere Khan', homeworld: 'Coruscant'},
        {name: 'Skeere Khan', homeworld: 'Coruscant'},
      ]
    };
  }

  render() {
    let {siths} = this.state;

    let sithItems = _.map(siths, (sith) => {
      return (
        <li className={css.sithSlot}>
          <h3>{sith.name}</h3>
          <h6>Homeworld: {sith.homeworld}</h6>
        </li>
      );
    });

    return (
      <ul className={css.base}>
        {sithItems}
      </ul>
    );
  }

}
