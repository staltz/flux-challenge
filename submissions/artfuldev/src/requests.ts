import { Stream } from 'xstream';
import { IApplicationState } from './definitions';
import dropRepeats from 'xstream/extra/dropRepeats';
import flattenConcurrently from 'xstream/extra/flattenConcurrently';
import { ILinkableEntity, IJedi } from './drivers/jedis';

const xs = Stream;

function canJediBeAdded(jedi: ILinkableEntity, jedis: IJedi[]) {
  const first = jedis[0];
  const last = jedis[4];
  const isMasterOfFirst = first !== null && first.master.id === jedi.id;
  const isApprenticeOfLast = last !== null && last.apprentice.id === jedi.id;
  const loadedIds =
    jedis
      .filter(Boolean)
      .map(jedi => jedi.id);
  const alreadyLoaded = loadedIds.indexOf(jedi.id) !== -1;
  return !alreadyLoaded && !isMasterOfFirst && !isApprenticeOfLast
}

function neighborsToLoad(state: IApplicationState): Stream<ILinkableEntity> {
  const jedi$ = xs.fromArray(state.jedis);
  const matched = state.matchedId !== -1;
  const neighbors$ =
    jedi$
      .filter(Boolean)
      .map(jedi => xs.of(jedi.master, jedi.apprentice))
      .compose(flattenConcurrently)
      .filter(jedi =>
        Boolean(jedi.id)
        && canJediBeAdded(jedi, state.jedis)
        && !matched);
  return neighbors$;
}

function hash(state: IApplicationState): string {
  const jedis =
    state.jedis
      .map(jedi => !!jedi ? jedi.id : '*')
      .join('-');
  return jedis + '|' + state.matchedId;
}

const distinctStates = dropRepeats<IApplicationState>(
  (prev, next) => hash(prev) === hash(next)
);

const distinctIds = dropRepeats<number>(
  (prev, next) => prev === next
);

function requests(state$: Stream<IApplicationState>): Stream<number> {
  const distinctState$ = state$.compose(distinctStates);
  const request$ =
    xs.merge(
      distinctState$
        .map(neighborsToLoad)
        .compose(flattenConcurrently)
        .map(jedi => jedi.id)
        .compose(distinctIds),
      distinctState$
        .filter(state => state.matchedId !== -1)
        .mapTo(-1)
    ).startWith(3616);
  return request$;
}

export default requests;
