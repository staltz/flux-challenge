import {Derivable} from 'derivable'
import {$world, $redAlert, $remoteSiths} from './state'
import {completeSithRequest} from './mutations'
import {Set} from 'immutable'

// only requst siths while not at homeworld of local sith
const $requestingSiths: Derivable<Set<number>> =
  $redAlert.then(Set(), $remoteSiths);

// local childless state, no need to wrap.
let activeRequests = {};

// we depende on the homeworld being non-null, so wait for that to happen
// before kicking off sith requests.
$requestingSiths.reactWhen($world, siths => {
  // bring over still valid active requests, while creating new requests
  let newRequests = {};
  siths.forEach(id => {
    let req = activeRequests[id];
    if (req) {
      delete activeRequests[id];
    } else {
      req = sithRequest(id);
    }
    newRequests[id] = req;
  });

  // abort old requests
  Object.keys(activeRequests).forEach(id => {
    let req = activeRequests[id];
    delete activeRequests[id];
    req.abort();
  });

  activeRequests = newRequests;
});

function sithRequest(id) {
  const url = `http://localhost:3000/dark-jedis/${id}`;
  const req = new XMLHttpRequest();
  req.open('GET', url);
  req.send();
  req.onreadystatechange = () => {
    if (activeRequests[id] && req.readyState === 4) {
      delete activeRequests[id];
      completeSithRequest(id, JSON.parse(req.responseText));
    }
  };
  return req;
}
