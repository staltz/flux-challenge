'use strict'
// import * as __D from './constants';
// import * as Dashboard from './Dashboard';
// import Sith from './Sith';
// import SithList from './SithList';

let Jedi = require('./SocketComponent');
let Dashboard = require('./Dashboard');
let Sith = require('./Sith');
let SithList = require('./SithList');
let __D = require('./constants');

let appContainer = document.querySelector('.app-container');
let dash = new Dashboard(appContainer);