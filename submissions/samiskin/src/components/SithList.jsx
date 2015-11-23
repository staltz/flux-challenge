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
  }

  componentDidMount() {
    if (!_.isEmpty(this.state.siths)) {
      this.topSith = this.getHighestMaster();
      this.lastSith = this.getLowestApprentice();
    } else {
      SithActions.requestSith({id: 3616, url: 'http://localhost:3000/dark-jedis/3616'});
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.siths !== this.state.siths) {
      this.topSith = this.getHighestMaster(nextState.siths);
      this.lastSith = this.getLowestApprentice(nextState.siths);
    }
  }

  componentDidUpdate() {
    if (this.lastSith && this.lastSith.apprentice.id && _.keys(this.state.siths).length < MAX_ITEMS - 1) {
      SithActions.requestSith(this.lastSith.apprentice);
    }
  }

  syncState() {
    return {
      siths: SithStore.getSiths()
    };
  }

  getHighestMaster(siths = this.state.siths, sithId) {
    console.log("GETTING HIGHEST MASTER", siths, sithId);
    if (sithId === undefined) sithId = _.keys(siths)[0];
    let sith = siths[sithId];
    if (sith && sith.master && siths[sith.master.id]) {
      return this.getHighestMaster(siths, sith.master.id);
    } else {
      return sith;
    }
  }

  getLowestApprentice(siths = this.state.siths, sithId) {
    if (sithId === undefined) sithId = _.keys(siths)[0];
    let sith = siths[sithId];
    if (sith && sith.apprentice && siths[sith.apprentice.id]) {
      return this.getLowestApprentice(siths, sith.apprentice.id);
    } else {
      return sith;
    }
  }

  handleUp() {
    let sith = _.assign({}, this.topSith.master, {apprentice: {id: this.topSith.id, url: this.topSith.url}});
    if (_.keys(this.state.siths).length === MAX_ITEMS) {
      SithActions.deleteSith(this.lastSith.id);
    }
    SithActions.requestSith(sith);
  }

  handleDown() {
    let sith = _.assign({}, this.lastSith.apprentice, {master: {id: this.lastSith.id, url: this.lastSith.url}});
    if (_.keys(this.state.siths).length === MAX_ITEMS) {
      SithActions.deleteSith(this.topSith.id);
    }
    SithActions.requestSith(sith);
  }

  render() {
    let {siths} = this.state;
    console.log("RENDERING WITH ", siths, this.topSith, this.lastSith);
    let sithItems = [];

    if (this.topSith) {
      let sith = this.topSith;
      while (sith) {
        let homeworldText = sith.homeworld.name ? `Homeworld: ${sith.homeworld.name}` : ``;
        sithItems.push((
          <li className={css.sithSlot} key={sith.id}>
            <h3>{sith.name}</h3>
            <h6>{homeworldText}</h6>
          </li>
        ));
        sith = this.state.siths[sith.apprentice.id];
      }
    }

    while (sithItems.length < MAX_ITEMS) {
      sithItems.push((
        <li className={css.sithSlot} key={-sithItems.length}/>
      ));
    }

    let canGoUp = this.topSith && this.topSith.master.id;
    let canGoDown = this.lastSith && this.lastSith.apprentice.id;

    return (
      <section className={css.base}>
        <ul className={css.sithSlots}>
          {sithItems}
        </ul>
        <div className={css.buttons}>
          <button className={css.buttonUp} disabled={!canGoUp} onClick={this.handleUp.bind(this)}/>
          <button className={css.buttonDown} disabled={!canGoDown} onClick={this.handleDown.bind(this)}/>
        </div>
      </section>
    );
  }

}
