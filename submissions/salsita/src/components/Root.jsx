import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { List } from 'immutable';

import initialReduction from '../initialReduction';
import { applicationMounting } from '../actions/actions';
import masterReducer from '../reducers/masterReducer';
import apiEffectsHandler from '../effect-handlers/apiEffectsHandler';

import Siths from './Siths';
import ControlButtons from './ControlButtons';
import PlanetIndicator from './PlanetIndicator';

const effectsHandlingMiddleware = store => next => action => {
  const result = next(action);
  store.getState().get('effects').forEach(effect => apiEffectsHandler(effect, store.dispatch));

  return result;
};

const createStoreWithMiddleware = applyMiddleware(effectsHandlingMiddleware)(createStore);

const effectsCapableStore = (reduction = initialReduction, action) => reduction
  .set('effects', List.of())
  .update(r => masterReducer(r, action));

export default class Root extends Component {

  constructor() {
    super();

    this.state = {
      store: createStoreWithMiddleware(effectsCapableStore)
    };
  }

  componentWillMount() {
    this.state.store.dispatch(applicationMounting());
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <div className="app-container">
          <div className="css-root">
            <PlanetIndicator />
            <section className="css-scrollable-list">
              <Siths />
              <ControlButtons />
            </section>
          </div>
        </div>
      </Provider>
    );
  }
}
