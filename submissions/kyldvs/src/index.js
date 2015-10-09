/**
 * @flow
 */

'use strict';

import AppContainer from './AppContainer';
import React from 'react';
import ReactDOM from 'react-dom';

const el = React.createElement(AppContainer, {});
const root = document.getElementById('app-root');
ReactDOM.render(el, root);
