import { Observable } from 'rx';
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

function fetchDarkJedi(url) {
  const xhr = new XMLHttpRequest();

  const darkJedi$ = Observable.create(observer => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        observer.onNext(JSON.parse(xhr.response));
      }
    };

    xhr.onloadend = () => observer.onCompleted();
    xhr.open("GET", url, true);
    xhr.send();
  });

  return { xhr, darkJedi$: darkJedi$.share() };
}

function abort(fetcher, request) {
  if (fetcher[request]) {
    fetcher[request].abort();
    fetcher[request] = null;
  }
}

class DarkJediFetcher {
  handle(state) {
    const { slots } = state;

    if (allEmpty(slots)) {
      if (!this.initRequest) {
        const {
          xhr, darkJedi$
        } = fetchDarkJedi('http://localhost:3000/dark-jedis/3616');

        this.initRequest = xhr;
        darkJedi$.subscribeOnCompleted(() => {
          this.initRequest = null
        });

        return darkJedi$;
      } else {
        return Observable.empty();
      }
    }


    if (isMatchCurrentPlanet(state)) {
      abort(this, 'masterRequest');
      abort(this, 'apprenticeRequest');
      return Observable.empty();
    }


    const darkJediStreams = [];

    if (slots[0]) {
      // first slot has Dark Jedi, abort master request.
      abort(this, 'masterRequest');
    } else {
      // first slot is empty, make master request.
      const url = getFirstMasterUrl(slots);

      if (!this.masterRequest && url) {
        const {
          xhr, darkJedi$
        } = fetchDarkJedi(url);

        this.masterRequest = xhr;
        darkJedi$.subscribeOnCompleted(() => {
          this.masterRequest = null
        });

        darkJediStreams.push(darkJedi$);
      }
    }

    const lastSlot = slots[slots.length - 1];
    if (lastSlot) {
      // last slot has Dark Jedi, abort apprentice request.
      abort(this, 'apprenticeRequest');
    } else {
      // last slot is empty, make apprentice request.
      const url = getLastApprenticeUrl(slots);

      if (!this.apprenticeRequest && url) {
        const {
          xhr, darkJedi$
        } = fetchDarkJedi(url);

        this.apprenticeRequest = xhr;
        darkJedi$.subscribeOnCompleted(() => {
          this.apprenticeRequest = null
        });

        darkJediStreams.push(darkJedi$);
      }
    }

    return Observable.from(darkJediStreams).flatMap(s => s);
  }
}

export default DarkJediFetcher;
