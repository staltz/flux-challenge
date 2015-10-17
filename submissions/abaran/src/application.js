'use strict';

import {Spacecraft, Jedi} from 'empire.js';
import {PlanetStore, Store, Actions} from 'store.js';
import {DIRECTION} from 'constants.js';
import {SithLordsDataBase} from 'database.js';

/** UI components **/

/** Spacecraft monitor - shows spacecraft pilot name and current planet when this spacecraft has landed **/
class SpacecraftMonitor extends React.Component {
  constructor({spacecraft}) {
    super({spacecraft});
    this.state = {
      pilot: spacecraft.pilot,
      planet: null
    };
  }

  componentDidMount() {
    this.unsubscribe = PlanetStore.listen(this.setState.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <h1 className="css-planet-monitor">
        {this.state.pilot.name} currently {this.state.planet ? 'on ' + this.state.planet.name : 'at home'}
      </h1>
    );
  }
}

/** Sith Lord list + scroll buttons **/
class SithLordList extends React.Component {

  constructor(options) {
    super(options);
    this.state = Store.state;
  }

  componentDidMount() {
    this.unsubscribe = Store.listen(this.setState.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    var sithLords = _.map(this.state.list.sithLords, sithLord => {
      if (sithLord && sithLord.id) {
        var style = {
          color : sithLord.isFromPlanet(this.state.planet) ? 'red': ''
        };
        return (
          <li className="css-slot" style={style}>
            <h3>{sithLord.name}</h3>
            <h6>{sithLord.homeworld.name}</h6>
          </li>
        );
      } else {
        // empty row
        return (<li className="css-slot"></li>)
      }
    });

    return (
      <section className="css-scrollable-list">
        <ul className="css-slots">
          {sithLords}
        </ul>
        <div className="css-scroll-buttons">
          <ScrollButton direction={DIRECTION.UP}/>
          <ScrollButton direction={DIRECTION.DOWN}/>
        </div>
      </section>
    );
  }
}

/** Scroll button **/
class ScrollButton extends React.Component {
  constructor({direction}) {
    super({direction});
    this.state = Store.state;
  }

  componentDidMount() {
    this.unsubscribe = Store.listen(this.setState.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    var noMoreItems,
      first = this.state.list.getFirstLoaded(),
      last = this.state.list.getLastLoaded(),
      disabled;

    if (this.props.direction === DIRECTION.UP) {
      noMoreItems = first.sithLord && !first.sithLord.hasMaster();
    } else {
      noMoreItems = last.sithLord && !last.sithLord.hasApprentice();
    }

    disabled = this.state.isFrozen || noMoreItems;

    return (
      <button onClick={() => {Actions.scrollSithLordsList(this.props.direction)}}
        disabled={disabled} className = { React.addons.classSet({
        'css-button-up': this.props.direction === DIRECTION.UP,
        'css-button-down': this.props.direction === DIRECTION.DOWN,
        'css-button-disabled': disabled
        })}>
      </button>
    );
  }
}


/** Create all application components and start application **/

var obiWan = new Jedi('Obi-Wan'),
  spacecraft = new Spacecraft('Delta-7', obiWan),
  sithLordsDataBase = new SithLordsDataBase();

// start 'spacecraft' and Sith Lords information loading
sithLordsDataBase.load('http://localhost:3000/dark-jedis/3616');
spacecraft.start('ws://localhost:4000');

// Application's UI
React.render(<SpacecraftMonitor spacecraft={spacecraft}/>,
  document.getElementById('spacecraft-monitor')
);

React.render(<SithLordList/>,
  document.getElementById('sithlords-list')
);