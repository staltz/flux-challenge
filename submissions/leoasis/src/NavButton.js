import React from 'react';
import classNames from 'classnames';

export default class NavButton extends React.Component {
  render() {
    const className = classNames(
      'css-button-' + this.props.direction,
      this.props.disabled && 'css-button-disabled'
    );
    return <button
      className={className}
      disabled={this.props.disabled}
      onClick={this.props.onClick}></button>;
  }
}
