const Rx = require(`rx`)

module.exports = function createWebSocketObservable (url) {
  return Rx.Observable.create(obs => {
    const ws = new WebSocket(url)

    ws.onmessage = msg => obs.onNext(msg)
    ws.onclose = msg => obs.onCompleted(msg)
    ws.onerror = err => obs.onError(msg)

    return () => ws.close()
  }).share()
}
