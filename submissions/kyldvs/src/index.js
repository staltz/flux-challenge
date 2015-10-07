/**
 * @flow
 */

'use strict';

import App from './App';
import React from 'react';

const el = React.createElement(App, {});
const root = document.getElementById('app-root');
React.render(el, root);
