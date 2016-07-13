import { Stream } from 'xstream';
import { VNode } from '@cycle/dom';
import { DOMSource } from '@cycle/dom/xstream-typings';

export interface ISources {
  dom: DOMSource;
}

export interface ISinks {
  dom: Stream<VNode>;
}

export interface IState {
  message: string
}