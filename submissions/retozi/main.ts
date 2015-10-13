/// <reference path="./typings/references.d.ts" />
import {App} from './components/App';
import * as React from 'react';
import {store} from './fluxInstance';
var ReactDOM = require('react-dom');

ReactDOM.render(
    React.createElement(App, {store: store}),
    document.getElementsByClassName("app-container")[0]
);