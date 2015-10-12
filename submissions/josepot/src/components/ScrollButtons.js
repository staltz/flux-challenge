import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class ScrollButtons extends Component {
  render() {
    const {
      onScrollUp, onScrollDown, isScrollUpDisabled, isScrollDownDisabled
    } = this.props;

    let upClass = classNames('css-button-up',
                             { 'css-button-disabled': isScrollUpDisabled });

    let downClass = classNames('css-button-down',
                               { 'css-button-disabled': isScrollDownDisabled });

    return (
      <div className="css-scroll-buttons">
        <button className={upClass}
                onClick={ (e) => isScrollUpDisabled ? e.preventDefault() :
                                                      onScrollUp() }>
        </button>
        <button className={downClass}
                onClick={ (e) => isScrollDownDisabled ? e.preventDefault() :
                                                        onScrollDown() }>
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
