import React, { Component, PropTypes } from 'react';

class ScrollButton extends Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    styleClass: PropTypes.string.isRequired,
  }

  onDisabled() {
    console.log('Button is disabled.');
  }

  render() {
    const {
      onClick,
      isDisabled,
      styleClass,
    } = this.props;

    const classes = isDisabled ?
      `${ styleClass } css-button-disabled` :
      `${ styleClass }`;

    const onClickFn = isDisabled ?
      this.onDisabled.bind(this) :
      onClick;

    return (
      <button
        onClick={ onClickFn }
        className={ classes }></button>
    );
  }
}

export default ScrollButton;
