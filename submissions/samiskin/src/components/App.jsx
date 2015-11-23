import rx from 'rx';

import React from 'react';
import Component from 'Component';
import AppActions from 'actions/AppActions';
import AppStore from 'stores/AppStore';

const WEBSOCKET_URL = 'ws://localhost:4000';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.wsObservable = this.createWsObservable(WEBSOCKET_URL);
    this.wsObservable.subscribe((msg) => AppActions.setCurrentPlanet(JSON.parse(msg.data).name));
  }

  syncState() {
    return {
      currentPlanet: AppStore.getCurrentPlanet()
    };
  }

  createWsObservable(url) {
    return rx.Observable.create((observer) => {
      const connection = new WebSocket(url);
      connection.onerror = (err) => observer.onError(err);
      connection.onmessage = (msg) => observer.onNext(msg);
    });
  }

  render() {
    return (
      <div> Current Planet: {this.state.currentPlanet} </div>
    );
  }

}
