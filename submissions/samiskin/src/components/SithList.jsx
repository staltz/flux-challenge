import _ from 'lodash';

import AppActions from 'actions/AppActions';
import AppStore from 'stores/AppStore';
import Component from 'Component';
import React from 'react';
import SithActions from 'actions/SithActions';
import SithStore from 'stores/SithStore';

import css from './styles/SithList.css';

export default class SithList extends Component {

  syncState() {
    let siths = SithStore.getSiths();
    let currentPlanet = AppStore.getCurrentPlanet();
    let isSithOnPlanet = !!_.find(siths, (sith) => sith.homeworld.id === currentPlanet.id);
    return {
      apprenticeRequests: AppStore.getApprenticeRequests(),
      currentPlanet: currentPlanet,
      highestMaster: SithStore.getHighestMaster(),
      isSithOnPlanet: isSithOnPlanet,
      lowestApprentice: SithStore.getLowestApprentice(),
      masterRequests: AppStore.getMasterRequests(),
      maxItems: AppStore.getMaxItems(),
      siths: siths
    };
  }

  componentDidMount() {
    this.componentDidUpdate({}, {});
  }

  componentDidUpdate(prevProps, prevState) {
    let currTopRequest = _.get(this.state, 'masterRequests.currentRequest');
    let prevTopRequest = _.get(prevState, 'masterRequests.currentRequest');
    let currBottomRequest = _.get(this.state, 'apprenticeRequests.currentRequest');
    let prevBottomRequest = _.get(prevState, 'apprenticeRequests.currentRequest');


    // When planets change, cancel all requests if a sith is shown,
    // and rerequest both siths if there are no siths shown
    if (this.state.isSithOnPlanet && !prevState.isSithOnPlanet) {
      if (currTopRequest) SithActions.cancelSithRequest(currTopRequest);
      if (currBottomRequest) SithActions.cancelSithRequest(currBottomRequest);
    } else if (!this.state.isSithOnPlanet && prevState.isSithOnPlanet) {
      if (currTopRequest) SithActions.requestSith(currTopRequest);
      if (currBottomRequest) SithActions.requestSith(currBottomRequest);
    }

    if (currTopRequest !== prevTopRequest) {
      if (currTopRequest !== null) {
        SithActions.requestSith(currTopRequest);
      }

      // If the bottom request is now null after the top request has changed, it has been cancelled
      if (prevBottomRequest && !currBottomRequest) {
        SithActions.cancelSithRequest(prevBottomRequest);
      }
    }

    if (currBottomRequest !== prevBottomRequest) {
      if (currBottomRequest !== null) {
        SithActions.requestSith(currBottomRequest);
      }

      // If the top request is now null after the bottom request has changed, it has been cancelled
      if (prevTopRequest && !currTopRequest) {
        SithActions.cancelSithRequest(prevTopRequest);
      }
    }
  }

  handleUp() {
    AppActions.requestMaster();
    AppActions.requestMaster();
  }


  handleDown() {
    AppActions.requestApprentice();
    AppActions.requestApprentice();
  }

  render() {
    let {isSithOnPlanet, currentPlanet, highestMaster, lowestApprentice, siths, masterRequests, apprenticeRequests} = this.state;
    let sithItems = [];
    let canGoUp = false;
    let canGoDown = false;

    for (let i = 0; i < masterRequests.requestCount; i++) {
      sithItems.push((
        <li className={css.sithSlot} key={-sithItems.length}/>
      ));
    }

    if (highestMaster) {
      for (let sith = highestMaster; sith; sith = siths[sith.apprentice.id]) {
        let style = currentPlanet.id === sith.homeworld.id ? {color: 'red'} : {};
        sithItems.push((
          <li className={css.sithSlot} style={style} key={sith.id}>
            <h3>{sith.name}</h3>
            <h6>Homeworld: {sith.homeworld.name}</h6>
          </li>
        ));
      }

      canGoUp = !isSithOnPlanet && highestMaster.master.id !== null;
      canGoDown = !isSithOnPlanet && lowestApprentice.apprentice.id !== null;
    }

    for (let i = 0; i < apprenticeRequests.requestCount; i++) {
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
