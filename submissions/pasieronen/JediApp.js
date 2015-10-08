import React from 'react';
import Dispatcher from './Dispatcher';
import * as JediConstants from './JediConstants';

const JediApp = React.createClass({
  componentDidMount() { 
    this.props.stateObservable.onValue(state => this.replaceState(state)); 
  },
  someWorldMatched() {
    return this.state.jedis.find(jedi => jedi && jedi.worldMatched);
  },
  canScrollUp() {
    const jedi = this.state.jedis[0] 
    return !this.someWorldMatched() && jedi && jedi.master && jedi.master.url;
  },
  canScrollDown() {
    const jedi = this.state.jedis[this.state.jedis.length-1];
    return !this.someWorldMatched() && jedi && jedi.apprentice && jedi.apprentice.url;
  },
  handleScrollUp() {
    Dispatcher.dispatch(JediConstants.SCROLL_UP);
  },
  handleScrollDown() {
    Dispatcher.dispatch(JediConstants.SCROLL_DOWN);
  },
  render() {
    return (!this.state || !this.state.currentWorld) ? 
      <span>Loading...</span>
      : 
      <div className="app-container">
        <div className="css-root">
          <h1 className="css-planet-monitor">Obi-Wan currently on {this.state.currentWorld.name}</h1>
          <section className="css-scrollable-list">
            <ul className="css-slots">
              {this.state.jedis.map((jedi, index) => 
                <li className={(jedi && jedi.worldMatched) ? "css-slot css-slot-red" : "css-slot"} key={index}>
                  <h3>{jedi && jedi.name}</h3>
                  <h6>Homeworld: {jedi && jedi.homeworld && jedi.homeworld.name}</h6>
                </li>)}
            </ul>
            <div className="css-scroll-buttons">
              <button
                disabled={!this.canScrollUp()}
                className={this.canScrollUp() ? "css-button-up" : "css-button-up css-button-disabled"}
                onClick={this.handleScrollUp}>
              </button>
              <button
                disabled={!this.canScrollDown()}
                className={this.canScrollDown() ? "css-button-down" : "css-button-down css-button-disabled"}
                onClick={this.handleScrollDown}>
              </button>
            </div>
          </section>
        </div>
      </div>;
  }
});

export default JediApp;