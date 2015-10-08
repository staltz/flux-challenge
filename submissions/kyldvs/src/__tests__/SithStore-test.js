/**
 */

'use strict';

jest
  .dontMock('../Sith')
  .dontMock('../SithStore');

// TODO: jest inline requires is relativizing this for some reason.
var Immutable = require('' + 'immutable');

var CurrentPlanetStore = require('../CurrentPlanetStore');
var Sith = require('../Sith');
var SithDataManager = require('../SithDataManager');
var SithStore = require('../SithStore');

/**
 * A more convenient reduce function for testing.
 */
function reduce(raw, action) {
  const state = Immutable.List(raw.map(o => new Sith(o)));
  return SithStore.reduce(state, action).toJS();
}

const {abort, loadSith} = SithDataManager;
function mockRequestID(id) {
  loadSith.mockReturnValue(id);
}
function mockCurrentPlanet(currentPlanet) {
  CurrentPlanetStore.getState.mockReturnValue(currentPlanet);
}

describe('SithStore', () => {
  beforeEach(() => {
    abort.mockClear();
    loadSith.mockClear();
  });

  it('should scroll down', () => {
    mockRequestID(2);

    expect(reduce(
      [
        {requestID: 100},
        {},
        {},
        {},
        {
          requestID: 1,
          apprenticeID: '404',
        },
      ],
      {
        type: 'scroll-down',
      },
    )).toEqual(
      [
        {},
        {},
        {
          requestID: 1,
          apprenticeID: '404',
        },
        {requestID: 2},
        {},
      ]
    );

    expect(loadSith.mock.calls[0][0]).toBe('404');
    expect(abort.mock.calls[0][0]).toBe(100);
  });

  it('should scroll up', () => {
    mockRequestID(2);

    expect(reduce(
      [
        {
          requestID: 1,
          masterID: '405',
        },
        {},
        {},
        {},
        {requestID: 101},
      ],
      {
        type: 'scroll-up',
      },
    )).toEqual(
      [
        {},
        {requestID: 2},
        {
          requestID: 1,
          masterID: '405',
        },
        {},
        {},
      ]
    );

    expect(loadSith.mock.calls[0][0]).toBe('405');
    expect(abort.mock.calls[0][0]).toBe(101);
  });

  it('should update a loaded sith', () => {
    mockCurrentPlanet('safe-planet');
    mockRequestID(2);

    expect(reduce(
      [
        {requestID: 1},
        {},
        {},
        {},
        {},
      ],
      {
        type: 'sith-loaded',
        sith: new Sith({
          requestID: 1,
          apprenticeID: '100',
          homeworldName: 'foo',
          masterID: '101',
          name: 'bar'
        }),
      },
    )).toEqual(
      [
        {
          requestID: 1,
          apprenticeID: '100',
          homeworldName: 'foo',
          masterID: '101',
          name: 'bar'
        },
        {requestID: 2},
        {},
        {},
        {},
      ]
    );

    expect(loadSith.mock.calls[0][0]).toBe('100');
  });

  it('should cancel requests changing to a dangerous planet', () => {
    mockCurrentPlanet('foo');

    expect(reduce(
      [
        {},
        {requestID: 36},
        {
          requestID: 2,
          apprenticeID: '100',
          homeworldName: 'foo',
          masterID: '101',
          name: 'bar'
        },
        {},
        {},
      ],
      {
        type: 'change-current-planet',
        name: 'foo',
      },
    )).toEqual(
      [
        {},
        {},
        {
          requestID: 2,
          apprenticeID: '100',
          homeworldName: 'foo',
          masterID: '101',
          name: 'bar'
        },
        {},
        {},
      ]
    );

    expect(abort.mock.calls[0][0]).toBe(36);
  });

  it('should cancel requests when loading a dangerous sith', () => {
    mockCurrentPlanet('foo');
    mockRequestID(3);

    expect(reduce(
      [
        {requestID: 1},
        {requestID: 2},
        {},
        {},
        {},
      ],
      {
        type: 'sith-loaded',
        sith: new Sith({
          requestID: 1,
          apprenticeID: '100',
          homeworldName: 'foo',
          masterID: '101',
          name: 'bar'
        }),
      },
    )).toEqual(
      [
        {
          requestID: 1,
          apprenticeID: '100',
          homeworldName: 'foo',
          masterID: '101',
          name: 'bar'
        },
        {},
        {},
        {},
        {},
      ]
    );

    expect(abort.mock.calls[0][0]).toBe(2);
  });
});
