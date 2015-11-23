import _ from 'lodash';

import React from 'react';
import Component from 'Component';
import SithStore from 'stores/SithStore';
import SithActions from 'actions/SithActions';

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

  handleUp() {
    SithActions.setCurrentSithRequests();
  }

  handleDown() {
    SithActions.setCurrentSithRequests();
  }

  render() {
    let {siths} = this.state;

    let topMaster = this.getHighestMaster(_.keys(siths)[0]);
    let sithItems = [];
    let sith = topMaster;
    let firstApprentice = topMaster.master.id ? false : true;
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
      <section className={css.base}>
        <ul className={css.sithSlots}>
          {sithItems}
        </ul>
        <div className={css.buttons}>
          <button className={css.buttonUp} disabled={firstApprentice} onClick={this.handleUp.bind(this)}/>
          <button className={css.buttonDown} disabled={lastApprentice} onClick={this.handleDown.bind(this)}/>
        </div>
      </section>
    );
  }

}
