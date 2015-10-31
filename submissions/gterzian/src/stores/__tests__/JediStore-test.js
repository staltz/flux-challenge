jest.dontMock('../JediStore');
jest.dontMock('../WorldStore');
jest.dontMock('../../dispatcher/Dispatcher');
jest.dontMock('immutable');

const webApi = require('../../utils/web-api')
const JediStore = require('../JediStore');
const List = require('immutable').List;
const Dispatcher = require('../../dispatcher/Dispatcher');

describe('Stores: JediStore', () => {
  const emptyJedi1 = {
    id: '0',
    name: 'empty1',
    homeworld: {
      id: '',
      name:''
    },
    master: {
      id: 1
    },
    apprentice: {
      id: 1
    }
  };
  const emptyJedi2 = {
    id: '1',
    name: 'empty2',
    homeworld: {
      id: '',
      name:''
    },
    master: {
      id: 1
    },
    apprentice: {
      id: 1
    }
  };
  const jediFromEarth = {
    id: 1,
    name: 'testJediEarth',
    homeworld: {
      id: 12,
      name:'earth'
    },
    master: {
      id: 3
    },
    apprentice: {
      id:1
    }
  };
  const jediFromMars = {
    id: 2,
    name: 'testJediMars',
    homeworld: {
      id: 13,
      name:'mars'
    },
    master: {
      id: 1
    },
    apprentice: {
      id: null
    }
  };
  const jediFromTheMoon = {
    id: 3,
    name: 'testJediMoon',
    homeworld: {
      id: 10,
      name:'moon'
    },
    apprentice: {
      id: 1
    },
    master: {
      id: null
    }
  };
  const jediFromNeptune = {
    id: 4,
    name: 'jediFromNeptune',
    homeworld: {
      id: 4,
      name:'Neptune'
    },
    apprentice: {
      id: 1
    },
    master: {
      id: null
    }
  };
  const jediFromPluto = {
    id: 5,
    name: 'jediFromPluto',
    homeworld: {
      id: 3,
      name:'Pluto'
    },
    apprentice: {
      id: 1
    },
    master: {
      id: null
    }
  };
  const jediFromPluto2 = {
    id: 52,
    name: 'jediFromPluto2',
    homeworld: {
      id: 3,
      name:'Pluto'
    },
    apprentice: {
      id: 1
    },
    master: {
      id: null
    }
  };

  beforeEach(function() {
    Dispatcher.dispatch({type: 'CLEAR'});
  });

  describe('JediStore.getInitialState()', () => {
    it('Should return an immutable List', () => {
      const state = JediStore.getInitialState();
      expect(List.isList(state)).toEqual(true);
    });
  });

  describe('JediStore: update the list of jedis', () => {
    it('Should reflect dispatched changes in Jedis', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      const state = JediStore.getState();
      expect(state.get(0)).toEqual(jediFromEarth);
    });

    it('Should ignore any incoming jedi when the list already contains five', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromNeptune});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromPluto});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromTheMoon});
      const state = JediStore.getState();
      expect(state.count()).toBe(5);
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromPluto2});
      const second_state = JediStore.getState();
      expect(second_state.count()).toBe(5);
    });

    it('When counting jedis in state, only take real ones into account', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromNeptune});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromPluto});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromTheMoon});
      Dispatcher.dispatch({type: 'SEEK_APPRENTICES'});
      const state = JediStore.getState();
      expect(state.count()).toBe(5);
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromPluto2});
      const second_state = JediStore.getState();
      expect(second_state.count()).toBe(5);
    });

    it('When receiving new jedis, add them and keep old ones', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      const second_state = JediStore.getState();
      expect(second_state.get(0)).toEqual(jediFromEarth);
      expect(second_state.get(1)).toEqual(jediFromMars);
    });

    it('Should ignore actions for Jedis already in there', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      const second_state = JediStore.getState();
      expect(second_state.get(0)).toEqual(jediFromEarth);
      expect(second_state.get(1)).toEqual(undefined);
    });

    it('Should also work with undefined jedis', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromNeptune});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromPluto});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromTheMoon});
      Dispatcher.dispatch({type: 'SEEK_APPRENTICES'});
      //this would previously throw an error due to undefined being in the list
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
    });

    it('Should push apprentices into the list, unshift masters', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      const second_state = JediStore.getState();
      expect(second_state.get(0)).toEqual(jediFromEarth);
      expect(second_state.get(1)).toEqual(jediFromMars);
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromTheMoon});
      const third_state = JediStore.getState();
      expect(third_state.get(0)).toEqual(jediFromTheMoon);
      expect(third_state.get(1)).toEqual(jediFromEarth);
      expect(third_state.get(2)).toEqual(jediFromMars);
    })
  });

  describe('JediStore: receiving SEEK_MASTERS action', () => {
    it('Should remove first two, and move the rest down two notch', () => {
      //note these will be reshuffled based on master/apprentice
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromNeptune});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromPluto});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromTheMoon});
      Dispatcher.dispatch({type: 'SEEK_MASTERS'});
      const state = JediStore.getState();
      expect(state.get(0)).toEqual(emptyJedi1);
      expect(state.get(1)).toEqual(emptyJedi2);
      expect(state.get(2)).toEqual(jediFromTheMoon);
      expect(state.get(3)).toEqual(jediFromEarth);
      expect(state.get(4)).toEqual(jediFromMars);
    });

    it('Should remove the empty ones on top when the first jedi comes in', () => {
      //note these will be reshuffled based on master/apprentice
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromNeptune});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromPluto});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromTheMoon});
      Dispatcher.dispatch({type: 'SEEK_MASTERS'});
      const state = JediStore.getState();
      expect(state.get(0)).toEqual(emptyJedi1);
      expect(state.get(1)).toEqual(emptyJedi2);
      expect(state.get(2)).toEqual(jediFromTheMoon);
      expect(state.get(3)).toEqual(jediFromEarth);
      expect(state.get(4)).toEqual(jediFromMars);
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromNeptune});
      const state2 = JediStore.getState();
      expect(state2.get(0)).toEqual(emptyJedi2);
      expect(state2.get(1)).toEqual(jediFromNeptune);
    });
  });

  describe('JediStore: receiving SEEK_APPRENTICES action', () => {
    it('Should remove last two apprentices, and move the up two notch', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromNeptune});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromPluto});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromTheMoon});
      Dispatcher.dispatch({type: 'SEEK_APPRENTICES'});
      const state = JediStore.getState();
      expect(state.get(0)).toEqual(jediFromMars);
      expect(state.get(1)).toEqual(jediFromNeptune);
      expect(state.get(2)).toEqual(jediFromPluto);
      expect(state.get(3)).toEqual(emptyJedi1);
      expect(state.get(4)).toEqual(emptyJedi2);
    });

    it('Should remove the empty ones when the first real one comes in', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromNeptune});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromPluto});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromTheMoon});
      Dispatcher.dispatch({type: 'SEEK_APPRENTICES'});
      const state = JediStore.getState();
      expect(state.get(0)).toEqual(jediFromMars);
      expect(state.get(1)).toEqual(jediFromNeptune);
      expect(state.get(2)).toEqual(jediFromPluto);
      expect(state.get(3)).toEqual(emptyJedi1);
      expect(state.get(4)).toEqual(emptyJedi2);
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromTheMoon});
      const state2 = JediStore.getState();
      expect(state2.get(3)).toEqual(jediFromTheMoon);
      expect(state2.get(4)).toEqual(emptyJedi1);
    });
  });

  describe('JediStore: change of world', () => {
    it('Should check all Jedi against the current world', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      const state = JediStore.getState();
      expect(state.get(0)).toEqual(jediFromEarth);
      expect(state.get(1)).toEqual(jediFromMars);
      Dispatcher.dispatch({type: 'NEW_WORLD', id: 12, name: 'earth'});
      const second_state = JediStore.getState();
      expect(second_state.get(0).onCurrentWorld).toEqual(true);
      expect(second_state.get(1).onCurrentWorld).toEqual(false);
    });

    it('Should call webApi.cancelRequests if a Jedi is at home', () => {
      webApi.cancelRequests.mockClear();
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      Dispatcher.dispatch({type: 'NEW_WORLD', id: 12, name: 'earth'});
      const state = JediStore.getState();
      expect(state.get(0).onCurrentWorld).toEqual(true);
      expect(webApi.cancelRequests.mock.instances.length).toBe(1);
    });
  });

  describe('JediStore: hasJediAtHome()', () => {
    it('Should return true if any Jedi is at home in the current world', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      Dispatcher.dispatch({type: 'NEW_WORLD', id: 12, name: 'earth'});
      expect(JediStore.hasJediAtHome()).toEqual(true);
    });

    it('Should return false when none of the Jedi are at home in the current world', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromTheMoon});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      Dispatcher.dispatch({type: 'NEW_WORLD', id: 12, name: 'earth'});
      expect(JediStore.hasJediAtHome()).toEqual(false);
    });

    it('Should be applied when a new world comes in', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      Dispatcher.dispatch({type: 'NEW_WORLD', id: 1, name: 'another world'});
      expect(JediStore.hasJediAtHome()).toEqual(false);
      Dispatcher.dispatch({type: 'NEW_WORLD', id: 12, name: 'earth'});
      expect(JediStore.hasJediAtHome()).toEqual(true);
    });

    it('Should be applied when a new jedi comes in', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      Dispatcher.dispatch({type: 'NEW_WORLD', id: 12, name: 'earth'});
      expect(JediStore.hasJediAtHome()).toEqual(false);
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      expect(JediStore.hasJediAtHome()).toEqual(true);
    });

    it('Should also work with undefined jedis', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromNeptune});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromPluto});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromTheMoon});
      Dispatcher.dispatch({type: 'SEEK_APPRENTICES'});
      Dispatcher.dispatch({type: 'NEW_WORLD', id: 12, name: 'earth'});
      expect(JediStore.hasJediAtHome()).toEqual(false);
    });
  });

  describe('JediStore: firstHasMaster()', () => {
    it('Should return true if the first Jedi has a known master', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      const state = JediStore.getState();
      expect(JediStore.firstHasMaster()).toEqual(true);
    });

    it('Should return false if the first Jedi has no known master', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromTheMoon});
      const state = JediStore.getState();
      expect(JediStore.firstHasMaster()).toEqual(false);
    });

    it('Should return false for an empty state', () => {
      const state = JediStore.getState();
      expect(JediStore.firstHasMaster()).toEqual(false);
    });

    it('Should also work with undefined jedis', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromNeptune});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromPluto});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromTheMoon});
      Dispatcher.dispatch({type: 'SEEK_MASTERS'});
    });
  });

  describe('JediStore: lastHasApprentice()', () => {
    it('Should return true if the last Jedi has an known apprentice', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      const state = JediStore.getState();
      expect(JediStore.lastHasApprentice()).toEqual(true);
    });

    it('Should return false if the last Jedi has no known apprentice', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      const state = JediStore.getState();
      expect(JediStore.lastHasApprentice()).toEqual(false);
    });

    it('Should return false for an empty state', () => {
      const state = JediStore.getState();
      expect(JediStore.firstHasMaster()).toEqual(false);
    });
  })

});
