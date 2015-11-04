export const Request = (() => {

  let activeRequests = {};

  function cancel (url) {
    let req = activeRequests[url];
    if (req) {
      delete activeRequests[url];
      req.abort();
    }
  }

  function create (url, cb) {
    if (!activeRequests[url]) {
      let req = new XMLHttpRequest();
      activeRequests[url] = req;
      req.open('GET', url);
      req.send();
      req.onreadystatechange = () => {
        if (activeRequests[url] && req.readyState === 4) {
          cb(JSON.parse(req.responseText));
        }
      };
    }

    return url;
  }

  return { cancel, create };
})();
