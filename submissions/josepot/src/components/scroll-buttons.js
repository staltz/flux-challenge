import React, { PropTypes } from 'react';

const ScrollButtons = ({
  onScrollUp, onScrollDown,
  isScrollUpDisabled, isScrollDownDisabled,
}) => {
  return (
      <div className="css-scroll-buttons">
        <button className={'css-button-up' + (isScrollUpDisabled ? ' css-button-disabled' : '')}
                onClick={ (e) => isScrollUpDisabled ? e.preventDefault() :
                                                      onScrollUp() }>
        </button>
        <button className={'css-button-down' + (isScrollDownDisabled ? ' css-button-disabled' : '')}
                onClick={ (e) => isScrollDownDisabled ? e.preventDefault() :
                                                        onScrollDown() }>
        </button>
      </div>
    );
}

ScrollButtons.propTypes = {
  onScrollUp: PropTypes.func.isRequired,
  onScrollDown: PropTypes.func.isRequired,
  isScrollUpDisabled: PropTypes.bool.isRequired,
  isScrollDownDisabled: PropTypes.bool.isRequired
};

export default ScrollButtons;
