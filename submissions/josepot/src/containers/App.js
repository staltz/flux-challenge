import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import PlanetMonitor from '../components/PlanetMonitor';
import Siths from '../components/Siths';
import ScrollButtons from '../components/ScrollButtons';
import {
  initialRequest, obiWanMoved, isHomeworldFound,
  scroll, UP, DOWN
} from '../actions';
import { MAX_VISIBLE_SITHS, OBI_WS } from '../config';

class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;

    this.ws = new WebSocket(OBI_WS);
    this.scrollUp = R.compose(dispatch, R.partial(scroll, UP));
    this.scrollDown = R.compose(dispatch, R.partial(scroll, DOWN));
  }

  componentDidMount() {
    const { dispatch } = this.props;

    this.ws.onmessage = (e) => {
      dispatch(obiWanMoved(JSON.parse(e.data)));
    }
    dispatch(initialRequest())
  }

  componentWillUnmount() {
    this.ws.close();
  }

  render() {
    const {
      currentPlanet, siths, paddingTop, paddingBottom,
      isScrollUpDisabled, isScrollDownDisabled
    } = this.props;

    return (
      <div className="app-container">
        <div className="css-root">
          <PlanetMonitor name={currentPlanet.name} />

          <section className="css-scrollable-list">
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
  const { currentPlanet, list } = state;
  const { siths, paddingTop } = list;
  const paddingBottom = MAX_VISIBLE_SITHS - paddingTop - siths.length;
  let isScrollUpDisabled = true;
  let isScrollDownDisabled = true;

  if(siths.length > 0  && !isHomeworldFound(state)) {
    isScrollUpDisabled =
      paddingTop === MAX_VISIBLE_SITHS - 1 ||
      R.isNil(R.head(siths).master.id);

    isScrollDownDisabled =
      paddingBottom === MAX_VISIBLE_SITHS - 1 ||
      R.isNil(R.last(siths).apprentice.id);
  }

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
