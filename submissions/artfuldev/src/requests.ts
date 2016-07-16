import { Stream } from 'xstream';
import { IApplicationState } from './definitions';
import dropRepeats from 'xstream/extra/dropRepeats';

const xs = Stream;

function IdsToLoad(state: IApplicationState): number[] {
  const matched = state.matchedId !== -1;
  if (matched)
    return [-1];
  const jedis = state.jedis;
  const loadedIds =
    jedis
      .filter(jedi => !!jedi)
      .map(jedi => jedi.id);
  const tail = jedis.slice(1);
  const head = jedis.slice(0, 4);
  const masterIds =
    tail.filter(jedi => !!jedi && !!jedi.master && !!jedi.master.id)
      .map(jedi => jedi.master.id);
  const apprenticeIds =
    head.filter(jedi => !!jedi && !!jedi.apprentice && !!jedi.apprentice.id)
      .map(jedi => jedi.apprentice.id);
  const masterIdsToLoad = masterIds.filter(id => loadedIds.indexOf(id) === -1);
  const apprenticeIdsToLoad = apprenticeIds.filter(id => loadedIds.indexOf(id) === -1);
  const idsToLoad = masterIdsToLoad.concat(apprenticeIdsToLoad);
  return idsToLoad;
}

function hash(state: IApplicationState): string {
  const jedis =
    state.jedis
      .map(jedi => !!jedi ? jedi.id : '*')
      .join('-');
  return jedis + state.matchedId;
}

function requests(state$: Stream<IApplicationState>): Stream<number> {
  const distinct = dropRepeats<IApplicationState>(
    (prev, next) => hash(prev) === hash(next)
  );
  const request$ =
    state$
      .compose(distinct)
      .map(IdsToLoad)
      .map(ids => ids.pop() || 0)
      .filter(id => id !== 0)
      .startWith(3616);
  return request$;
}

export default requests;
