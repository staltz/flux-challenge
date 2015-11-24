import { Range, List, Map } from 'immutable'
import { isString, assoc } from './util'

export type Homeworld = {
  id: number,
  name: string
};

export type RemoteSith = {
  url: string,
  id: number
};

export type LocalSith = {
  id: number,
  name: string,
  homeworld: Homeworld,
  master: RemoteSith,
  apprentice: RemoteSith
};

export type AppState = {
  world: Homeworld,
  sithCache: Map<number, LocalSith>,
  sithIDs: List<number>
};

function discoverApprentice (state: AppState, i: number) {
  const {sithCache, sithIDs} = state;
  let result = state;
  if (i < sithIDs.size - 1) {
    const sith = sithCache.get(sithIDs.get(i));
    if (sith) {
      if (sith.apprentice.id === null) {
        // last sith but not at end of list.
        result = up(state, (sithIDs.size - 1) - i);
      } else {
        result = assoc(state, {sithIDs: sithIDs.set(i + 1, sith.apprentice.id)});
      }
    }
  }
  return result;
}

function discoverMaster (state: AppState, i: number) {
  const {sithCache, sithIDs} = state;
  let result = state;
  if (i > 0) {
    const sith = sithCache.get(sithIDs.get(i));
    if (sith.master.id === null) {
      // first sith but not at top of list
      result = down(state, i);
    } else {
      result = assoc(state, {sithIDs: sithIDs.set(i - 1, sith.master.id)});
    }
  }
  return result;
}
// extract master/apprentice ids into sithIDs if need be
function discoverSiths (state: AppState): AppState {
  let firstIDidx = state.sithIDs.size;
  let lastIDidx = 0;

  state.sithIDs.forEach((id, i) => {
    if (id !== null) {
      if (i < firstIDidx) firstIDidx = i;
      if (i > lastIDidx) lastIDidx = i;
    }
  });

  return discoverApprentice(discoverMaster(state, firstIDidx), lastIDidx);
}

function cleanCache (state: AppState): AppState {
  const {sithIDs, sithCache} = state;
  let newCache = Map<number, LocalSith>().asMutable();

  sithIDs.forEach(id => {
    let local = sithCache.get(id);
    if (local != null) {
      newCache.set(id, local);
    }
  });

  return assoc(state, {sithCache: newCache});
}

function _modifySithIDs(state: AppState, n: number, f): AppState {
  let {sithIDs} = state;
  Range(0, n).forEach(() => {
    sithIDs = f(sithIDs);
  });
  return cleanCache(discoverSiths(assoc(state, {sithIDs})));
}

// moves list down, siths go up visually
export function down (state: AppState, n: number): AppState {
  // preserve the invariant that sithIDs always contains one id
  const lastIDidx = state.sithIDs.reduce((last, id, idx) => {
    return id !== null ? idx : last;
  }, -1);

  return _modifySithIDs(
    state,
    Math.min(lastIDidx, n),
    ids => ids.push(null).shift()
  );
}

// moves list up, siths go down visually
export function up (state: AppState, n: number): AppState {
  // preserve the invariant that sithIDs always contains one id
  const {sithIDs} = state;
  let i = 0;

  // find index of first valid id
  while (i < sithIDs.size && sithIDs.get(i) === null) {
    i++;
  }

  const maxUp = sithIDs.size - i;

  return _modifySithIDs(
    state,
    Math.min(maxUp, n),
    ids => ids.unshift(null).pop()
  );
}
