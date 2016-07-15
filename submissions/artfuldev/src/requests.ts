import { Stream } from 'xstream';
import { IApplicationState } from './definitions';
import dropRepeats from 'xstream/extra/dropRepeats';
import flattenConcurrently from 'xstream/extra/flattenConcurrently';

const xs = Stream;

function IdsToLoad(state: IApplicationState): number[] {
  const matched = state.matchedId !== -1;
  if(matched)
    return [];
  const loadedJedis = state.jedis.filter(jedi => !!jedi);
  const loadedIds = loadedJedis.map(jedi => jedi.id);
  const tail = state.jedis.slice(1);
  const head = state.jedis.slice(0,4);
  const masterIds =
    tail.filter(jedi => !!jedi && !!jedi.master && !!jedi.master.id)
      .map(jedi => jedi.master.id);
  const apprenticeIds =
    head.filter(jedi => !!jedi && !!jedi.apprentice && !!jedi.apprentice.id)
      .map(jedi => jedi.apprentice.id);
  const masterIdsToLoad = masterIds.filter(id => loadedIds.indexOf(id) === -1);
  const apprenticeIdsToLoad = apprenticeIds.filter(id => loadedIds.indexOf(id) === -1);
  const idsToLoad = masterIdsToLoad.concat(apprenticeIdsToLoad).filter(() => !matched);
  return idsToLoad;
}

function hash(state: IApplicationState): string {
  const jedis = state.jedis.map(jedi => !!jedi ? jedi.id : '*').join('-');
  return jedis + state.matchedId;
}

function requests(state$: Stream<IApplicationState>): Stream<number> {
  const distinctStates =
    dropRepeats<IApplicationState>(
      (prev, next) => hash(prev) === hash(next));
  const request$ =
    state$
      .compose(distinctStates)
      .map(IdsToLoad)
      .map(ids => ids.pop() || -1)
      .filter(id => id !== -1)
      .startWith(3616);
  return request$;
}

export default requests;
