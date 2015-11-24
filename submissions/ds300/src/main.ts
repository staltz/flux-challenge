import './request'
import { changeWorld } from './mutations'
import { page } from './view'
import { root } from 'ddom'

new WebSocket('ws://localhost:4000').onmessage = (msg) => {
  changeWorld(JSON.parse(msg.data));
};

window.addEventListener('load', () => {
  root(document.body, page);
})
