import _ from 'lodash';

import React from 'react';
import Component from 'Component';
import SithStore from 'stores/SithStore';
import SithActions from 'actions/SithActions';

import css from './styles/SithList.css';

const MAX_ITEMS = 5;

export default class SithList extends Component {

  constructor(props) {
    super(props);
    this.nextMaster = null;
    this.nextApprentice = null;
    if (_.keys(this.state.siths).length === 0) {
      SithActions.requestSith({id: 3616, url: 'http://localhost:3000/dark-jedis/3616'});
    }
  }

  syncState() {
    return {
      siths: SithStore.getSiths()
    };
  }

  getHighestMaster(sithId) {
    let sith = this.state.siths[sithId];
    console.log(sith);
    if (sith && sith.master && this.state.siths[sith.master.id]) {
      return this.getHighestMaster(sith.master.id);
    } else {
      return sith;
    }
  }

  handleUp() {
    SithActions.requestSith(this.nextMaster);
  }

  handleDown() {
    SithActions.requestSith(this.nextApprentice);
  }

  render() {
    let {siths} = this.state;
    console.log(siths);

    let topMaster = this.getHighestMaster(_.keys(siths)[0]);
    let sithItems = [];
    let sith = topMaster;
    this.nextMaster = topMaster ? topMaster.master : null;
    this.nextApprentice = null;
    while (sith) {
      sithItems.push((
        <li className={css.sithSlot} key={sith.id}>
          <h3>{sith.name}</h3>
          <h6>{sith.homeworld.name ? `Homeworld: ${sith.homeworld.name}` : ``}</h6>
        </li>
      ));
      this.nextApprentice = sith.apprentice;
      sith = this.state.siths[sith.apprentice.id];
    }

    while (sithItems.length < MAX_ITEMS) {
      sithItems.push((
        <li className={css.sithSlot} key={sithItems.length * 10000}/>
      ))
    }

    return (
      <section className={css.base}>
        <ul className={css.sithSlots}>
          {sithItems}
        </ul>
        <div className={css.buttons}>
          <button className={css.buttonUp} disabled={!this.nextMaster} onClick={this.handleUp.bind(this)}/>
          <button className={css.buttonDown} disabled={!this.nextApprentice} onClick={this.handleDown.bind(this)}/>
        </div>
      </section>
    );
  }

}
