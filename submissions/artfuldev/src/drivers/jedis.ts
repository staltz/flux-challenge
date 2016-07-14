import { Stream, Producer, Listener } from 'xstream';

export interface IJedi {
  name: string;
  home: string;
}

export class JedisDriver {
  jedi$: Stream<IJedi>;
  constructor(){
    
  }
}

export function makeJedisDriver() {
  function jedisDriver() {
    return new JedisDriver();
  }
  return jedisDriver;
}
