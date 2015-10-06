
// ===== actions.jsx =====

var actions = Reflux.createActions({
  receivedPlanetUpdate: {},
  requestCursor: {},
  releaseCursor: {},
  loadSithLord: {asyncResult: true},
});

var activeRequests = {};

actions.loadSithLord.listen(function(cursor, url) {
  if(cursor in activeRequests)
    return;
  var promise = jQuery.get(url);
  promise.then(function(data) {
    delete activeRequests[cursor];
    actions.loadSithLord.completed(cursor, data);
  });
  activeRequests[cursor] = promise;
});

// Requirement: abort requests if a cursor is released and it is active
actions.releaseCursor.listen(function(cursor){
  if(activeRequests[cursor])
    activeRequests[cursor].abort();
});

// ===== store.jsx =====

var pendingRequests = {};
var requestedCursors = {};

//actions.loadSithLord.preEmit = function(cursor, url) {
//  if(url)
//    return undefined; // We know the URL of the Sith lord. Continue.
//  else {
//    if(cursor+1 in store.data.sithLords)
//      return [cursor, store.data.sithLords[cursor+1].master.url];
//    if(cursor-1 in store.data.sithLords)
//      return [cursor, store.data.sithLords[cursor-1].apprentice.url];
//    return undefined;
//  }
//};

actions.requestCursor.listen(function(cursor){
  if(!(cursor in requestedCursors))
    requestedCursors[cursor] = 0;
  requestedCursors[cursor] += 1;
  checkRequestedCursors();
});

actions.releaseCursor.preEmit = function(cursor) {
  requestedCursors[cursor] -= 1;
};

function checkRequestedCursors() {
  _.each(requestedCursors, function(value, cursor) {
    cursor = parseInt(cursor);
    if(cursor in store.data.sithLords)
      return; // Cursor already being loaded

    //if(cursor+1 in store.data.sithLords)
    //  actions.loadSithLord(cursor, store.data.sithLords[cursor+1].master.url);
    if(cursor-1 in store.data.sithLords && store.data.sithLords[cursor-1].loadState == 'done'){
      var url = store.data.sithLords[cursor-1].apprentice.url;
      if(url)
        actions.loadSithLord(cursor, url);
    }

    if(cursor+1 in store.data.sithLords && store.data.sithLords[cursor+1].loadState == 'done'){
      var url = store.data.sithLords[cursor+1].master.url;
      if(url)
        actions.loadSithLord(cursor, url);
    }
  });
};
//
//actions.loadSithLord.shouldEmit = function(cursor, url) {
//  if(activeRequests[cursor])
//    return false;
//  else{
//    activeRequests[cursor] = true;
//    return true;
//  }
//  //if(!url){
//  //  pendingRequests[cursor] = true;
//  //  return false;
//  //} else {
//  //  if(cursor in pendingRequests)
//  //    delete pendingRequests[cursor];
//  //  activeRequests[cursor] = true;
//  //  console.log(activeRequests);
//  //  return true;
//  //}
//};

var store = Reflux.createStore({
  init() {
    this.listenToMany(actions);
    this.data = {
      currentPlanet: {id: null, name: 'Unknown'},
      sithLords: {},
    };
  },
  getInitialState() {
    return this.data;
  },
  onReceivedPlanetUpdate(newData){
    this.data.currentPlanet = newData;
    this.trigger(this.data);
  },
  onLoadSithLord(cursor, url) {
    console.log('start', cursor, url);
    this.data.sithLords[cursor] = {
      loadState: 'loading'
    };
    this.trigger(this.data);
  },
  onLoadSithLordCompleted(cursor, data) {
    console.log('complete', cursor, data);
    this.data.sithLords[cursor] = data;
    this.data.sithLords[cursor].loadState = 'done';
    delete activeRequests[cursor];
    this.trigger(this.data);
    checkRequestedCursors();
  },
  onReleaseCursor(cursor) {
    if(requestedCursors[cursor] == 0){
      if(cursor in this.data.sithLords) {
        delete this.data.sithLords[cursor];
        this.trigger(this.data);
      }
    }
  },

});

// ===== components.jsx =====

var Entry = React.createClass({
  mixins: [Reflux.connectFilter(store, function(fullData) {
    return fullData.sithLords[this.props.i] || {};
  })],

  propTypes: {
    i: React.PropTypes.number.isRequired,
  },

  componentDidMount() {
    actions.requestCursor(this.props.i);
  },

  componentWillUnmount() {
    actions.releaseCursor(this.props.i);
  },

  render() {
    if(this.state.loadState == 'loading' )
      return <div className="css-slot">Loading...</div>;
    else if(this.state.loadState == 'done')
      return <div className="css-slot">{this.state.name}</div>;
    else
      return <div className="css-slot"></div>;
  }

});

var WebSocketConnection = React.createClass({
  componentDidMount() {
    this.ws = new WebSocket('ws://localhost:4000');
    this.ws.onmessage = (evt) => {
      var data = JSON.parse(evt.data);
      actions.receivedPlanetUpdate(data);
    }
  },
  render() {
    return null;
  },

});


var App = React.createClass({
  mixins: [Reflux.connect(store)],
  getInitialState() {
    return {cursor: 0};
  },
  componentDidMount() {
    actions.loadSithLord(0, 'http://localhost:3000/dark-jedis/3616');
  },
  scrollDown() {
    this.setState({cursor: this.state.cursor + 2});
  },
  scrollUp() {
    this.setState({cursor: this.state.cursor - 2});
  },
  render() {
    return (<div className="css-root">
      <WebSocketConnection />
      <div className="css-planet-monitor">
        Obi-Wan currently on {this.state.currentPlanet.name}
      </div>
      <div className="css-scrollable-list" style={{marginTop: 10}}>
        <div className="css-slots">
          {_.map(_.range(5), (i) => <Entry i={this.state.cursor+i} key={this.state.cursor+i} />)}
        </div>
        <div className="css-scroll-buttons">
          <button className="css-button-up" onClick={this.scrollUp}/>
          <button className="css-button-down" onClick={this.scrollDown} />
        </div>
      </div>

    </div>);
  },
});


// ===== main.jsx =====

$(function(){
  React.render(<App />, $('#react-app')[0]);
});

