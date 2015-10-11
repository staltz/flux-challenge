import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import PlanetMonitor from '../components/PlanetMonitor';
import Siths from '../components/Siths';
import ScrollButtons from '../components/ScrollButtons';
import {
  initialRequest, obiWanMoved, scroll,
  SCROLL_UP, SCROLL_DOWN
} from '../actions';
import { MAX_VISIBLE_SITHS } from '../config';

class App extends Component {
  constructor(props) {
    super(props);
    this.ws = new WebSocket('ws://localhost:4000');
    this.scrollUp = this.scrollUp.bind(this);
    this.scrollDown = this.scrollDown.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    this.ws.onmessage = (e) => {
      dispatch(obiWanMoved(JSON.parse(e.data)));
    }
    dispatch(initialRequest())
  }

  scrollUp() {
    this.props.dispatch(scroll(SCROLL_UP));
  }

  scrollDown() {
    this.props.dispatch(scroll(SCROLL_DOWN));
  }

  render() {
    const {
      currentPlanet, siths, paddingTop, paddingBottom,
      isScrollUpDisabled, isScrollDownDisabled
    } = this.props;

    return (
      <div class="app-container">
        <div class="css-root">
          <PlanetMonitor name={currentPlanet.name} />

          <section class="css-scrollable-list">
            <Siths siths={siths}
                   obiCurrentPlanetId={currentPlanet.id}
                   paddingTop={paddingTop}
                   paddingBottom={paddingBottom} />

            <ScrollButtons onScrollUp={this.scrollUp}
                           onScrollDown={this.scrollDown}
                           isScrollUpDisabled={isScrollUpDisabled}
                           isScrollDownDisabled={isScrollDownDisabled} />

          </section>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  currentPlanet: PropTypes.object.isRequired,
  siths: PropTypes.array.isRequired,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  isScrollUpDisabled: PropTypes.bool.isRequired,
  isScrollDownDisabled: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const { currentPlanet, siths, paddingTop } = state;
  const paddingBottom = MAX_VISIBLE_SITHS - paddingTop - siths.length;
  const homeworldFound = siths.map((s) => s.homeworld.id)
                              .indexOf(currentPlanet.id) > -1;
  const firstSith = R.head(siths);
  const lastSith = R.last(siths);

  const isScrollUpDisabled =
    homeworldFound ||
    paddingTop === MAX_VISIBLE_SITHS - 1 ||
    (firstSith && R.isNil(firstSith.master.id));

  const isScrollDownDisabled =
    homeworldFound ||
    paddingBottom === MAX_VISIBLE_SITHS - 1 ||
    (lastSith && R.isNil(lastSith.apprentice.id));

  return {
    currentPlanet,
    siths,
    paddingTop,
    paddingBottom,
    isScrollUpDisabled,
    isScrollDownDisabled
  };
}

export default connect(mapStateToProps)(App);
