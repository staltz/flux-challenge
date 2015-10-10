import React, { Component, PropTypes } from 'react';

class SithLord extends Component {

  static propTypes = {
    homeworld: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    highlight: PropTypes.bool.isRequired,
  }

  render() {
    const {
      homeworld,
      name,
      highlight,
    } = this.props;

    const homeWorldStr = homeworld ?
      `Homeworld: ${ homeworld }` :
      ``;

    const styles = {
      color: highlight ? 'red' : 'white',
    };

    return (
      <li
        style={ styles }
        className="css-slot">
        <h3 style={ styles }>{ name }</h3>
        <h6 style={ styles }>{ homeWorldStr }</h6>
      </li>
    );
  }
}

export default SithLord;
