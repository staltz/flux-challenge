
import { Atom, atom, destruct, Derivable, setDebugMode } from 'derivable'
import { List, Map, Set } from 'immutable'
import { AppState, LocalSith } from './model'

// ROOT STATE
export const $AppState: Atom<AppState> = atom({
  world:null,
  sithIDs: List([
    null,
    null,
    3616,
    null,
    null
  ]),
  sithCache: Map<number, LocalSith>()
});

// pull out individual bits from app state

export const [$world, $sithIDs, $sithCache] =
  destruct($AppState, 'world', 'sithIDs', 'sithCache');

export const [$worldId, $worldName] = destruct($world, 'id', 'name');


/**
 * sithIDs mapped against local cache
 */
export const $localSiths: Derivable<List<LocalSith>> = $sithIDs.derive(ids => {
  const cache = $sithCache.get();
  return ids.map(id => cache.get(id));
});

/**
 * sith ids who we haven't got local details for
 */
export const $remoteSiths: Derivable<Set<number>> = $sithIDs.derive(ids => {
  const cache = $sithCache.get();
  return Set<number>(ids.filter(id => id !== null && cache.get(id) == null));
});

/**
 * local sith's homeworld is the current planet
 */
export const $redAlert = $localSiths.derive(siths => {
  const worldId = $worldId.get();
  return siths.filter(sith => {
    return sith && sith.homeworld.id === worldId;
  }).first();
});

// true when page is ready to be used
export const $ready = $world.is(null).not();
