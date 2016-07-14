import { Stream, Producer, Listener } from 'xstream';

export interface IJedi {
  name: string;
  home: string;
}

export class JedisSource {
  jedi$: Stream<IJedi>;
  constructor(){
    
  }
}

export function makeJedisDriver() {
  function jedisDriver() {
    return new JedisSource();
  }
  return jedisDriver;
}
