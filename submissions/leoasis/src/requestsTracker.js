import { wasAnyJediBornInCurrentPlanet } from './queries';

export default function requestsTracker(store) {
  const requestsByJediId = {};
  return () => {
    const state = store.getState();
    const darkJedisById = state.darkJedisById;
    const abortAll = wasAnyJediBornInCurrentPlanet(state);

    if (!abortAll) {
      Object.keys(darkJedisById).forEach(id => {
        const darkJedi = darkJedisById[id];

        if (darkJedi.fetching && !requestsByJediId[id]) {
          const xhr = new XMLHttpRequest();
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
              const jedi = JSON.parse(xhr.response);
              store.dispatch({ type: 'RECEIVE_JEDI', jedi });
            }
          };
          xhr.open("GET", darkJedi.url || `http://localhost:3000/dark-jedis/${id}`, true);
          xhr.send();
          requestsByJediId[id] = xhr;
        }
      });
    }

    const idsToAbort = Object.keys(requestsByJediId).filter(id =>
      !darkJedisById[id] || abortAll
    );

    idsToAbort.forEach(id => {
      requestsByJediId[id].abort();
      delete requestsByJediId[id];
    });
  };
}
