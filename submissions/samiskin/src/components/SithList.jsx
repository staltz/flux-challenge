import _ from 'lodash';

import React from 'react';
import Component from 'Component';
import SithStore from 'stores/SithStore';
import SithActions from 'actions/SithActions';
import AppActions from 'actions/AppActions';
import AppStore from 'stores/AppStore';

import css from './styles/SithList.css';

/*

Move  top/bottom requests into app state

*/


export default class SithList extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.componentDidUpdate({}, {});
  }

  syncState() {
    let siths = SithStore.getSiths();
    let currentPlanet = AppStore.getCurrentPlanet();
    let isSithOnPlanet = !!_.find(siths, (sith) => sith.homeworld.id === currentPlanet.id);
    return {
      siths: siths,
      isSithOnPlanet: isSithOnPlanet,
      highestMaster: SithStore.getHighestMaster(),
      lowestApprentice: SithStore.getLowestApprentice(),
      masterRequests: AppStore.getMasterRequests(),
      apprenticeRequests: AppStore.getApprenticeRequests(),
      currentPlanet: currentPlanet,
      maxItems: AppStore.getMaxItems()
    };
  }

  componentDidUpdate(prevProps, prevState) {
    let currTopRequest = _.get(this.state, 'masterRequests.currentRequest');
    let prevTopRequest = _.get(prevState, 'masterRequests.currentRequest');
    let currBottomRequest = _.get(this.state, 'apprenticeRequests.currentRequest');
    let prevBottomRequest = _.get(prevState, 'apprenticeRequests.currentRequest');


    // When planets change, cancel all requests if a sith is shown,
    // and rerequest both siths if there are no siths shown
    if (this.state.isSithOnPlanet !== prevState.isSithOnPlanet) {
      if (this.state.isSithOnPlanet) {
        if (currTopRequest) SithActions.cancelSithRequest(currTopRequest);
        if (currBottomRequest) SithActions.cancelSithRequest(currBottomRequest);
      } else {
        if (currTopRequest) SithActions.requestSith(currTopRequest);
        if (currBottomRequest) SithActions.requestSith(currBottomRequest);
      }
    }

    if (currTopRequest !== prevTopRequest) {
      if (currTopRequest !== null) {
        SithActions.requestSith(currTopRequest);
      }
      if (prevBottomRequest && !currBottomRequest) {
        SithActions.cancelSithRequest(prevBottomRequest);
      }
    }

    if (currBottomRequest !== prevBottomRequest) {
      if (currBottomRequest !== null) {
        SithActions.requestSith(currBottomRequest);
      }
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
      let sith = highestMaster;
      while (sith) {
        let homeworldText = sith.homeworld.name ? `Homeworld: ${sith.homeworld.name}` : ``;
        let style = currentPlanet.id === sith.homeworld.id ? {color: 'red'} : {};
        sithItems.push((
          <li className={css.sithSlot} style={style} key={sith.id}>
            <h3>{sith.name}</h3>
            <h6>{homeworldText}</h6>
          </li>
        ));
        sith = siths[sith.apprentice.id];
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
