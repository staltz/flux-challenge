import React, { Component, PropTypes } from 'react';

export default class ScrollButtons extends Component {
  render() {
    const {
      onScrollUp, onScrollDown, isScrollUpDisabled, isScrollDownDisabled
    } = this.props;

    let scrollUpClass = 'css-button-up' +
      (isScrollUpDisabled ? ' css-button-disabled' : '');

    let scrollDownClass = 'css-button-down' +
      (isScrollDownDisabled ? ' css-button-disabled' : '');

    return (
      <div className="css-scroll-buttons">
        <button className={scrollUpClass}
                onClick={ () => onScrollUp() }>
        </button>
        <button className={scrollDownClass}
                onClick={ () => onScrollDown() }>
        </button>
      </div>
    );
  }
}

ScrollButtons.propTypes = {
  onScrollUp: PropTypes.func.isRequired,
  onScrollDown: PropTypes.func.isRequired,
  isScrollUpDisabled: PropTypes.bool.isRequired,
  isScrollDownDisabled: PropTypes.bool.isRequired
};
