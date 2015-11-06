import React, {Component} from 'react';
import Immutable from 'immutable';

import JediItem from '../views/JediItem.react.js';

export default class JediList extends Component {

  render() {
    const jedis = this.props.jedis;
    let jediItems = [];
    for (let jedi of jedis) {
      if (jedi.name === 'empty1' || jedi.name === 'empty2') {
        jediItems.push(<JediItem key={jedi.name} name={''} homeworld={''} isHome={false}/>);
      }
      else {
        jediItems.push(<JediItem key={jedi.name} name={jedi.name} homeworld={jedi.homeworld.name} isHome={jedi.onCurrentWorld}/>);
      }
    }
    if (jedis.count() < 5) {
      Immutable.Range(jedis.count(), 5).forEach(count => {
        jediItems.push(<JediItem key={count} name={''} homeworld={''} isHome={false}/>);
      });
    }
    return (
      <ul className="css-slots">
        {jediItems}
      </ul>
    );
  }
};
