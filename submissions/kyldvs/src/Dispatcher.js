/**
 * @flow
 */

import type {Action} from './Actions';

import {Dispatcher} from 'flux';

const instance: Dispatcher<Action> = new Dispatcher();

export default instance;
