/**
 * @flow
 */

'use strict';

import type Sith from './Sith';

export type Action =
  {
    type: 'change-current-planet',
    name: string,
  } |
  {
    type: 'sith-loaded',
    sith: Sith,
  } |
  {
    type: 'scroll-up',
  } |
  {
    type: 'scroll-down',
  };
