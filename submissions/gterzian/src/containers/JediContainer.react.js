import {Container} from 'flux/utils';
import React, {Component} from 'react';

import JediStore from '../stores/JediStore';
import JediList from '../views/JediList.react.js';
import JediScroll from '../views/JediScroll.react.js';


class JediContainer extends Component {
  static getStores() {
    return [JediStore];
  }

  static calculateState(prevState) {
    const JediMap = JediStore.getState();
    return {
      jedis: JediMap.toList(),
      scrollable: !JediStore.hasJediAtHome(),
      canUp: JediStore.firstHasMaster(),
      canDown: JediStore.lastHasApprentice(),
      first: JediStore.realJedis().first(),
      last: JediStore.realJedis().last()
    };
  }

  render() {
    return (
      <section className="css-scrollable-list">
        <JediList jedis={this.state.jedis}/>
        <JediScroll scrollable={this.state.scrollable} first={this.state.first}
          last={this.state.last}
          canUp={this.state.canUp}
          canDown={this.state.canDown}/>
      </section>
    );
  }
};

module.exports = Container.create(JediContainer);
