import _ from 'lodash';

import React from 'react';
import Component from 'Component';
import SithStore from 'stores/SithStore';
import SithActions from 'actions/SithActions';

import css from './styles/SithList.css';

const MAX_ITEMS = 5;


/*

Need something more formal around pending sith requests,
in order to be able to cancel from the top on up-down

*/


export default class SithList extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.componentDidUpdate({}, {});
  }

  syncState() {
    this.state = this.state || {};
    let siths = SithStore.getSiths();
    let topSith = this.getHighestMaster(siths);
    let lastSith = this.getLowestApprentice(siths);

    let topRequests = _.clone(this.state.topRequests || {currRequest: null, requestCount: 0});

    let bottomRequests = _.clone(this.state.bottomRequests || {currRequest: 3616, requestCount: MAX_ITEMS});

    if (topSith !== null) {
      if (topSith.id === topRequests.currRequest) {
        topRequests.requestCount--;
        if (topRequests.requestCount > 0) {
          topRequests.currRequest = topSith.master.id;
        } else {
          topRequests.currRequest = null;
        }
      }
      if (lastSith.id === bottomRequests.currRequest) {
        bottomRequests.requestCount--;
        if (bottomRequests.requestCount > 0) {
          bottomRequests.currRequest = lastSith.apprentice.id;
        } else {
          bottomRequests.currRequest = null;
        }
      }
    }

    return { siths, topSith, lastSith, topRequests, bottomRequests };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);

    let currTopRequest = _.get(this.state, 'topRequests.currRequest');
    let prevTopRequest = _.get(prevState, 'topRequests.currRequest');
    let currBottomRequest = _.get(this.state, 'bottomRequests.currRequest');
    let prevBottomRequest = _.get(prevState, 'bottomRequests.currRequest');

    if (currTopRequest !== prevTopRequest && currTopRequest !== null) {
      SithActions.requestSith(currTopRequest);
    }

    if (currBottomRequest !== prevBottomRequest && currBottomRequest !== null) {
      SithActions.requestSith(currBottomRequest);
    }
  }

  getHighestMaster(siths = this.state.siths, sithId) {
    if (_.isEmpty(siths)) return null;
    if (sithId === undefined) sithId = _.keys(siths)[0];
    let sith = siths[sithId];
    if (sith && sith.master && siths[sith.master.id]) {
      return this.getHighestMaster(siths, sith.master.id);
    } else {
      return sith;
    }
  }

  getLowestApprentice(siths = this.state.siths, sithId) {
    if (_.isEmpty(siths)) return null;
    if (sithId === undefined) sithId = _.keys(siths)[0];
    let sith = siths[sithId];
    if (sith && sith.apprentice && siths[sith.apprentice.id]) {
      return this.getLowestApprentice(siths, sith.apprentice.id);
    } else {
      return sith;
    }
  }

  handleUp() {
    // let sith = _.assign({}, this.topSith.master, {apprentice: {id: this.topSith.id, url: this.topSith.url}});
    let {topRequests, bottomRequests, topSith, lastSith} = this.state;
    if (topRequests.currRequest === null) {
      topRequests = _.assign({}, topRequests, {currRequest: topSith.master.id});
    }
    topRequests = _.assign({}, topRequests, {requestCount: topRequests.requestCount + 1});

    if (bottomRequests.requestCount > 1) {
      bottomRequests = _.assign({}, bottomRequests, {requestCount: bottomRequests.requestCount - 1});
    } else if (bottomRequests.requestCount > 0) {
      SithActions.deleteSith(bottomRequests.currRequest);
      bottomRequests = {currRequest: null, requestCount: 0};
    } else {
      SithActions.deleteSith(lastSith.id);
      bottomRequests = {currRequest: null, requestCount: 0};
    }

    this.setState({topRequests, bottomRequests});
  }


  handleDown() {
    let {topRequests, bottomRequests, topSith, lastSith} = this.state;
    if (bottomRequests.currRequest === null) {
      bottomRequests = _.assign({}, bottomRequests, {currRequest: lastSith.apprentice.id});
    }
    bottomRequests = _.assign({}, bottomRequests, {requestCount: bottomRequests.requestCount + 1});

    if (topRequests.requestCount > 1) {
      topRequests = _.assign({}, topRequests, {requestCount: topRequests.requestCount - 1});
    } else if (topRequests.requestCount > 0) {
      SithActions.deleteSith(topRequests.currRequest);
      topRequests = {currRequest: null, requestCount: 0};
    } else {
      SithActions.deleteSith(topSith.id);
      topRequests = {currRequest: null, requestCount: 0};
    }

    this.setState({topRequests, bottomRequests});
  }

  render() {
    let sithItems = [];
    let canGoUp = false;
    let canGoDown = false;

    for (let i = 0; i < this.state.topRequests.requestCount; i++) {
      sithItems.push((
        <li className={css.sithSlot} key={-sithItems.length}/>
      ));
    }

    if (this.state.topSith) {
      let sith = this.state.topSith;
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

      canGoUp = this.state.topSith.master.id !== null;
      canGoDown = this.state.lastSith.apprentice.id !== null;
    }

    for (let i = 0; i < this.state.bottomRequests.requestCount; i++) {
      sithItems.push((
        <li className={css.sithSlot} key={-sithItems.length}/>
      ));
    }

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
