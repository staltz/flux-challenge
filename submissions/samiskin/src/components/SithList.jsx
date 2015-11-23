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
    return {
      siths: SithStore.getSiths(),
      highestMaster: SithStore.getHighestMaster(),
      lowestApprentice: SithStore.getLowestApprentice(),
      masterRequests: AppStore.getMasterRequests(),
      apprenticeRequests: AppStore.getApprenticeRequests()
    };
  }

  componentDidUpdate(prevProps, prevState) {
    let currTopRequest = _.get(this.state, 'masterRequests.currentRequest');
    let prevTopRequest = _.get(prevState, 'masterRequests.currentRequest');
    let currBottomRequest = _.get(this.state, 'apprenticeRequests.currentRequest');
    let prevBottomRequest = _.get(prevState, 'apprenticeRequests.currentRequest');

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
  }


  handleDown() {
    AppActions.requestApprentice();
  }

  render() {
    let {highestMaster, lowestApprentice, siths, masterRequests, apprenticeRequests} = this.state;
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
        sithItems.push((
          <li className={css.sithSlot} key={sith.id}>
            <h3>{sith.name}</h3>
            <h6>{homeworldText}</h6>
          </li>
        ));
        sith = siths[sith.apprentice.id];
      }

      canGoUp = highestMaster.master.id !== null;
      canGoDown = lowestApprentice.apprentice.id !== null;
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
