import { Stream, Producer, Listener } from 'xstream';

export class WebSocketDriver {
  message$: Stream<string>;
  constructor(url: string) {
    const xs = Stream;
    const connection = new WebSocket(url);
    const producer: Producer<string> =
      {
        start: function (listener: Listener<string>) {
          connection.onmessage = msg => listener.next(msg.data);
          connection.onerror = err => listener.error(err);
        },
        stop: function () {
          connection.close();
        }
      };
    this.message$ = xs.create(producer);
  }
}

export function makeWebSocketDriver(url) {
  function webSocketDriver() {
    return new WebSocketDriver(url);
  }
  return webSocketDriver;
}
