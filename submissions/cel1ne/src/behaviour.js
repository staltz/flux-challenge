export function createBehaviour(fnReqJedi) {

  const EMPTY = {};

  const events = {
    "@@redux/INIT":
    () => ({
      currentPlanet: "",
      rows: [fnReqJedi("http://localhost:3000/dark-jedis/3616"), EMPTY, EMPTY, EMPTY, EMPTY]
    }),

    "planetChanged":
    (state, {name}) => {
      state.currentPlanet = name;
      state.matchedSith = state.rows.find(row => row.homeworld === name);

      if (state.matchedSith) {
        return events["sithMatched"](state);
      } else {
        return events["listUpdate"](state);
      }
    },

    "sithMatched":
    (state) => {
      state.rows = state.rows.map(row => {
        if (row.abort) {
          row.abort();
          row = EMPTY;
        }
        return row;
      });
      return state;
    },

    "listUpdate":
    (state) => {
      for (let i = 0; i < state.rows.length; i++) {
        let row = state.rows[i];

        /* finished req -> set sith */
        if (row.readyState === 4) {
          state.rows[i] = row = JSON.parse(row.responseText);

          /* shortcuts */
          row.homeworld = row.homeworld.name
          row.masterUrl = row.master.url;
          row.apprenticeUrl = row.apprentice.url;

          /* may have matched now */
        }
        state.matchedSith = state.rows.find(sith => sith.homeworld === state.currentPlanet);

        if (state.matchedSith) {
          return events["sithMatched"](state);
        } else {
          /* request previous and next */
          if (state.rows[i - 1] === EMPTY && row.masterUrl) {
            state.rows[i - 1] = fnReqJedi(row.masterUrl);
          }
          if (state.rows[i + 1] === EMPTY && row.apprenticeUrl) {
            state.rows[i + 1] = fnReqJedi(row.apprenticeUrl);
          }
        }
      }
      return state;
    },

    "SithUI.scrollUp":
    (state) => {
      state.rows.splice(0, 0, EMPTY, EMPTY);
      state.rows.splice(5, 2).forEach(deleted => deleted.abort && deleted.abort());
      return events["listUpdate"](state);
    },

    "SithUI.scrollDown":
    (state) => {
      state.rows.splice(0, 2).forEach(deleted => deleted.abort && deleted.abort());
      state.rows.splice(3, 0, EMPTY, EMPTY);
      return events["listUpdate"](state);
    }
  }

  return {
    reducer: (state, action) => events[action.type](state, action)
  }
}

