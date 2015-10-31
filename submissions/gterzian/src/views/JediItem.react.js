import React, {Component} from 'react';

export default class JediItem extends Component {

  render() {
    if(this.props.isHome) {
      return (
        <li className='css-slot'>
          <h3 style={{color:'red'}}>{this.props.name}</h3>
          <h6>Homeworld: {this.props.homeworld}</h6>
        </li>
      );
    }
    else {
      if (this.props.homeworld === '') {
        return (
          <li className='css-slot'>
            <h3></h3>
            <h6></h6>
          </li>
        );
      }
      return (
        <li className='css-slot'>
          <h3>{this.props.name}</h3>
          <h6>Homeworld: {this.props.homeworld}</h6>
        </li>
      );
    }
  }
};
