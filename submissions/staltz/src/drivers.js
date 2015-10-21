import {Observable} from 'rx'

function makeWSDriver(url) {
  return function WSDriver() {
    return Observable.create(observer => {
      const connection = new WebSocket(url);
      connection.onerror = (err) => {
        observer.onError(err)
      }
      connection.onmessage = (msg) => {
        observer.onNext(msg)
      }
    }).share()
  }
}

export default {makeWSDriver};
