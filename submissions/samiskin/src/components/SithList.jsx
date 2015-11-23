import _ from 'lodash';

import React from 'react';
import Component from 'Component';
import SithStore from 'stores/SithStore';

import css from './styles/SithList.css';

export default class SithList extends Component {

  syncState() {
    return {
      siths: SithStore.getSiths()
    };
  }

  getHighestMaster(sithId) {
    let sith = this.state.siths[sithId];
    if (sith.master && this.state.siths[sith.master.id]) {
      return this.getHighestMaster(sith.master.id);
    } else {
      return sith;
    }
  }

  render() {
    let {siths} = this.state;

    let topMaster = this.getHighestMaster(_.keys(siths)[0]);
    let sithItems = [];
    let sith = topMaster;
    let lastApprentice = false;
    while (sith) {
      sithItems.push((
        <li className={css.sithSlot} key={sith.id}>
          <h3>{sith.name}</h3>
          <h6>Homeworld: {sith.homeworld.name}</h6>
        </li>
      ));
      if (!sith.apprentice.id) lastApprentice = true;
      sith = this.state.siths[sith.apprentice.id];
    }

    return (
      <ul className={css.base}>
        {sithItems}
      </ul>
    );
  }

}
