import React, {Component} from 'react';

export default class JediItem extends Component {

  render() {
    return <h1 className="css-planet-monitor">Obi-Wan currently on {this.props.world}</h1>;
  }
};
