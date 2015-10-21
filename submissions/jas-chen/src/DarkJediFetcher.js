import { Observable, DOM } from 'rx-dom';
import { isMatchCurrentPlanet, allEmpty } from './utils.js';

function getFirstMasterUrl(slots) {
  for (let i = 0 ; i < slots.length ; i += 1) {
    if (slots[i]) {
      return slots[i].master.url
    }
  }
}

function getLastApprenticeUrl(slots) {
  for (let i = slots.length - 1 ; i >= 0 ; i -= 1) {
    if (slots[i]) {
      return slots[i].apprentice.url
    }
  }
}

function fetchDarkJedi(fetcher, observer, url, request) {
  const ajax$ = DOM.ajax({
    url,
    responseType: 'json',
    crossDomain: true
  });

  fetcher[request] = ajax$.subscribe(
    function success(data) {
      observer.onNext(data.response);
    },
    function error() {
      console.error('fetch failed', arguments);
    },
    function completed() {
      fetcher[request] = null;
    }
  );
}

function abortDarkJedi(fetcher, request) {
  if (fetcher[request]) {
    fetcher[request].dispose();
    fetcher[request] = null;
  }
}

function handle(fetcher, state, observer) {
  const fetch = fetchDarkJedi.bind(null, fetcher, observer);
  const abort = abortDarkJedi.bind(null, fetcher);
  const { slots } = state;

  if (allEmpty(slots)) {
    if (!fetcher.initRequest) {
      fetch(
        'http://localhost:3000/dark-jedis/3616',
        'initRequest'
      );
    }

    return;
  }


  if (isMatchCurrentPlanet(state)) {
    abort('masterRequest');
    abort('apprenticeRequest');
    return;
  }

  if (slots[0]) {
    // first slot has Dark Jedi, abort master request.
    abort('masterRequest');
  } else {
    // first slot is empty, make master request.
    const url = getFirstMasterUrl(slots);

    if (!fetcher.masterRequest && url) {
      fetch(url, 'masterRequest');
    }
  }

  const lastSlot = slots[slots.length - 1];
  if (lastSlot) {
    // last slot has Dark Jedi, abort apprentice request.
    abort('apprenticeRequest');
  } else {
    // last slot is empty, make apprentice request.
    const url = getLastApprenticeUrl(slots);

    if (!fetcher.apprenticeRequest && url) {
      fetch(url, 'apprenticeRequest');
    }
  }

}

class DarkJediFetcher {
  constructor(state$) {
    this.darkJedi$ = Observable.create(observer => {
      state$.subscribe(state => handle(this, state, observer));
    });
  }
}

export default DarkJediFetcher;
