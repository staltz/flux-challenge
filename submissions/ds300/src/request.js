exports.Request = (function () {
    var activeRequests = {};
    function cancel(url) {
        var req = activeRequests[url];
        if (req) {
            delete activeRequests[url];
            req.abort();
        }
    }
    function create(url, cb) {
        if (!activeRequests[url]) {
            var req = new XMLHttpRequest();
            activeRequests[url] = req;
            req.open('GET', url);
            req.send();
            req.onreadystatechange = function () {
                if (activeRequests[url] && req.readyState === 4) {
                    cb(JSON.parse(req.responseText));
                }
            };
        }
        return url;
    }
    return { cancel: cancel, create: create };
})();
