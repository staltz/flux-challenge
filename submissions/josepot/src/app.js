import React from 'react';
import { connect } from 'react-redux';

import { actionCreators } from './actions';
import { storeToProps } from './queries';

import PlanetMonitor from './components/planet-monitor';
import Siths from './components/siths';
import ScrollButtons from './components/scroll-buttons';

const App = ({
  currentPlanet, siths, paddingTop, paddingBottom,
  isScrollUpDisabled, isScrollDownDisabled,
  onScrollUp, onScrollDown,
}) => (
  <div className="app-container">
    <div className="css-root">
      <PlanetMonitor name={currentPlanet.name} />

      <section className="css-scrollable-list">
        <Siths siths={siths}
               obiCurrentPlanetId={currentPlanet.id}
               paddingTop={paddingTop}
               paddingBottom={paddingBottom} />

        <ScrollButtons onScrollUp={onScrollUp}
                       onScrollDown={onScrollDown}
                       isScrollUpDisabled={isScrollUpDisabled}
                       isScrollDownDisabled={isScrollDownDisabled} />
      </section>
    </div>
  </div>
);

export default connect(storeToProps, actionCreators)(App);
