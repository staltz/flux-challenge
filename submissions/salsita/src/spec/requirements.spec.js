import { List } from 'immutable';

import initialReduction from '../initialReduction';
import masterReducer from '../reducers/masterReducer';
import * as Actions from '../actions/actions';
import * as Effects from '../constants/effects';
import * as SithStates from '../constants/sithStates';

const darthSidious = {
  id: 3616,
  name: 'Darth Sidious',
  homeworld: {
    id: 7,
    name: 'Naboo'
  },
  master: {
    id: 2350
  },
  apprentice: {
    id: 1489
  }
};

const darthVader = {
  id: 1489,
  name: 'Darth Vader',
  homeworld: {
    id: 18,
    name: 'Tatooine'
  },
  master: {
    id: 3616
  },
  apprentice: {
    id: 1330
  }
};

const antinnisTremayne = {
  id: 1330,
  name: 'Antinnis Tremayne',
  homeworld: {
    id: 58,
    name: 'Coruscant'
  },
  master: {
    id: 1489
  },
  apprentice: {
    id: null
  }
};

describe('Challenge requirements', () => {
  let reduction;

  beforeEach(() => {
    reduction = initialReduction;
  });

  it('should connect to WS after bootstraping', () => {
    reduction = masterReducer(reduction, Actions.applicationMounting());
    reduction
      .get('effects')
      .some(effects => effects.type === Effects.API_CONNECT_WS)
      .should.be.equal(true);
  });

  it('should load siths', () => {
    reduction = masterReducer(reduction, Actions.applicationMounting());
    reduction = masterReducer(reduction, Actions.sithLoaded(darthSidious, true));
    reduction = masterReducer(reduction, Actions.sithLoaded(darthVader, true));
    reduction = masterReducer(reduction, Actions.sithLoaded(antinnisTremayne, true));

    reduction.getIn(['appState', 'siths', 0, 'name']).should.be.equal('Darth Sidious');
    reduction.getIn(['appState', 'siths', 1, 'name']).should.be.equal('Darth Vader');
    reduction.getIn(['appState', 'siths', 2, 'name']).should.be.equal('Antinnis Tremayne');
  });

  it('should scroll two positions up', () => {
    reduction = masterReducer(reduction, Actions.applicationMounting());
    reduction = masterReducer(reduction, Actions.sithLoaded(darthSidious, true));
    reduction = masterReducer(reduction, Actions.sithLoaded(darthVader, true));
    reduction = masterReducer(reduction, Actions.sithLoaded(antinnisTremayne, true));
    reduction = masterReducer(reduction, Actions.scrolledUp());

    reduction.getIn(['appState', 'siths', 2, 'name']).should.be.equal('Darth Sidious');
    reduction.getIn(['appState', 'siths', 3, 'name']).should.be.equal('Darth Vader');
    reduction.getIn(['appState', 'siths', 4, 'name']).should.be.equal('Antinnis Tremayne');
  });

  it('should start loading master after scrolling up', () => {
    reduction = masterReducer(reduction, Actions.applicationMounting());
    reduction = masterReducer(reduction, Actions.sithLoaded(darthSidious, true));
    reduction = masterReducer(reduction, Actions.sithLoaded(darthVader, true));
    reduction = masterReducer(reduction, Actions.sithLoaded(antinnisTremayne, true));
    reduction = masterReducer(reduction, Actions.scrolledUp());
    reduction = masterReducer(reduction, Actions.sithLoadingStarted(darthSidious.master.id, 'darthSidiousMaster'));

    reduction.getIn(['appState', 'siths', 1, 'id']).should.be.equal(darthSidious.master.id);
    reduction.getIn(['appState', 'siths', 1, 'state']).should.be.equal(SithStates.LOADING);
  });

  it('should cancel request when going offscreen', () => {
    reduction = masterReducer(reduction, Actions.applicationMounting());
    reduction = masterReducer(reduction, Actions.sithLoadingStarted(darthSidious.id, 'darthSidious'));
    reduction = masterReducer(reduction, Actions.sithLoaded(darthSidious, true));
    reduction = masterReducer(reduction, Actions.sithLoadingStarted(darthVader.id, 'darthVader'));
    reduction = masterReducer(reduction, Actions.sithLoaded(darthVader, true));
    reduction = masterReducer(reduction, Actions.sithLoadingStarted(antinnisTremayne.id, 'antinnisTremayne'));
    reduction = masterReducer(reduction, Actions.sithLoaded(antinnisTremayne, true));
    reduction = reduction.set('effects', List.of());
    reduction = masterReducer(reduction, Actions.scrolledUp());
    reduction = masterReducer(reduction, Actions.sithLoadingStarted(darthSidious.master.id, 'darthSidiousMaster'));

    reduction.getIn(['effects', 0]).type.should.equal(Effects.API_LOAD_SITH);
    reduction.getIn(['effects', 0]).payload.sithId.should.equal(darthSidious.master.id);
    reduction = reduction.set('effects', List.of());

    reduction = masterReducer(reduction, Actions.scrolledDown());
    reduction.getIn(['effects', 0]).type.should.equal(Effects.API_CANCEL_REQUEST);
    reduction.getIn(['effects', 0]).payload.should.equal('darthSidiousMaster');
  });

  it('should disable scrolling when obiwan is on visible Sith\'s homeworld planet', () => {
    reduction = masterReducer(reduction, Actions.applicationMounting());
    reduction = masterReducer(reduction, Actions.sithLoadingStarted(darthSidious.id, 'darthSidious'));
    reduction = masterReducer(reduction, Actions.sithLoaded(darthSidious, true));
    reduction = masterReducer(reduction, Actions.sithLoadingStarted(darthVader.id, 'darthVader'));
    reduction = masterReducer(reduction, Actions.sithLoaded(darthVader, true));
    reduction = masterReducer(reduction, Actions.sithLoadingStarted(antinnisTremayne.id, 'antinnisTremayne'));
    reduction = masterReducer(reduction, Actions.sithLoaded(antinnisTremayne, true));

    reduction.getIn(['appState', 'sithSpotted']).should.be.equal(false);
    reduction = masterReducer(reduction, Actions.planetChanged({id: darthVader.homeworld.id}));
    reduction.getIn(['appState', 'sithSpotted']).should.be.equal(true);
  });

  it('should cancel ongoing request when obiwan is on visible Sith\'s homeworld planet', () => {
    reduction = masterReducer(reduction, Actions.applicationMounting());
    reduction = masterReducer(reduction, Actions.sithLoadingStarted(darthSidious.id, 'darthSidious'));
    reduction = masterReducer(reduction, Actions.sithLoaded(darthSidious, true));
    reduction = masterReducer(reduction, Actions.sithLoadingStarted(darthVader.id, 'darthVader'));
    reduction = masterReducer(reduction, Actions.sithLoaded(darthVader, true));
    reduction = masterReducer(reduction, Actions.sithLoadingStarted(antinnisTremayne.id, 'antinnisTremayne'));
    reduction = reduction.set('effects', List.of());
    reduction = masterReducer(reduction, Actions.planetChanged({id: darthVader.homeworld.id}));

    reduction.getIn(['effects', 0]).type.should.equal(Effects.API_CANCEL_REQUEST);
    reduction.getIn(['effects', 0]).payload.should.equal('antinnisTremayne');
  });

  it('should highlight the Sith which has been spotted by obiwan', () => {
    reduction = masterReducer(reduction, Actions.applicationMounting());
    reduction = masterReducer(reduction, Actions.sithLoadingStarted(darthSidious.id, 'darthSidious'));
    reduction = masterReducer(reduction, Actions.sithLoaded(darthSidious, true));
    reduction = masterReducer(reduction, Actions.sithLoadingStarted(darthVader.id, 'darthVader'));
    reduction = masterReducer(reduction, Actions.sithLoaded(darthVader, true));
    reduction = masterReducer(reduction, Actions.sithLoadingStarted(antinnisTremayne.id, 'antinnisTremayne'));
    reduction = reduction.set('effects', List.of());
    reduction = masterReducer(reduction, Actions.planetChanged({id: darthVader.homeworld.id}));

    reduction.getIn(['appState', 'siths', 0, 'spotted']).should.be.equal(false);
    reduction.getIn(['appState', 'siths', 1, 'spotted']).should.be.equal(true);
    reduction.getIn(['appState', 'siths', 2, 'spotted']).should.be.equal(false);
  });
});
