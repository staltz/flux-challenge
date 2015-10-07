
// ===== actions.jsx =====

var actions = Reflux.createActions({
  receivedPlanetUpdate: {}, // Sent by WebSocket when it gets an update
  requestCursor: {}, // Sent by UI when it wants to see a particular lord
  releaseCursor: {}, // Sent by UI when it doesn't anymore
  loadSithLord: {asyncResult: true}, // Sent by internal code when it knows the URL to load a cursor frm
  cancelAll: {}, // Sent by internal code when all requests need to be canceled
});

var activeRequests = {};

// Actually load a cursor from the network using a URL
actions.loadSithLord.listen(function(cursor, url) {
  if(cursor in activeRequests)
    return; // Don't load a URL twice
  var promise = jQuery.get(url);
  promise.then(function(data) {
    delete activeRequests[cursor];
    actions.loadSithLord.completed(cursor, data);
  });
  activeRequests[cursor] = promise;
});

// Requirement: abort requests if a cursor is released
actions.releaseCursor.listen(function(cursor){
  if(activeRequests[cursor]){
    activeRequests[cursor].abort();
    delete activeRequests[cursor];
  }
});

actions.cancelAll.listen(function(){
  _.map(activeRequests, (value, cursor) => {
    activeRequests[cursor].abort();
    delete activeRequests[cursor];
  });
});

// ===== store.jsx =====

var requestedCursors = {};

actions.requestCursor.listen(function(cursor){
  if(!(cursor in requestedCursors))
    requestedCursors[cursor] = 0;
  requestedCursors[cursor] += 1;
  checkRequestedCursors();
});

actions.releaseCursor.preEmit = function(cursor) {
  requestedCursors[cursor] -= 1;
  if(requestedCursors[cursor] == 0)
    delete requestedCursors[cursor];
};

// Check to see if we can load cursors that were requested prior, but
// we weren't able to load immediately
function checkRequestedCursors() {
  _.each(requestedCursors, function(value, cursor) {
    cursor = parseInt(cursor);

    if(cursor in store.data.sithLords)
      return; // Cursor was already loaded

    // We've loaded the lord before this one, so we can use its apprentice URL
    if(cursor-1 in store.data.sithLords && store.data.sithLords[cursor-1].loadState == 'done'){
      var url = store.data.sithLords[cursor-1].apprentice.url;
      if(url)
        actions.loadSithLord(cursor, url);
    }

    // We've loaded the lord after this one, so we can use its master URL
    if(cursor+1 in store.data.sithLords && store.data.sithLords[cursor+1].loadState == 'done'){
      var url = store.data.sithLords[cursor+1].master.url;
      if(url)
        actions.loadSithLord(cursor, url);
    }
  });
}

// The store has the info that the UI wants in it
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
  // Update current planet
  onReceivedPlanetUpdate(newData){
    this.data.currentPlanet = newData;

    // Cancel outgoing requests if current planet has lord
    if(this.currentPlanetHasLord())
      actions.cancelAll();
    else
      checkRequestedCursors();

    this.trigger(this.data);
  },
  // When load starts, insert a "Loading..." item
  onLoadSithLord(cursor, url) {
    this.data.sithLords[cursor] = {
      loadState: 'loading'
    };
    this.trigger(this.data);
  },
  // When load completed, insert the new data.
  onLoadSithLordCompleted(cursor, data) {
    this.data.sithLords[cursor] = data;
    this.data.sithLords[cursor].loadState = 'done';
    delete activeRequests[cursor];
    this.trigger(this.data);
    checkRequestedCursors(); // Check to see if this load completing lets us load something else too
  },
  // Requirement: obliterate data when a cursor is released
  onReleaseCursor(cursor) {
    if(!requestedCursors[cursor]){
      if(cursor in this.data.sithLords) {
        delete this.data.sithLords[cursor];
        this.trigger(this.data);
      }
    }
  },
  // When all requests are canceled, remove loading state from them
  onCancelAll(cursor) {
    this.data.sithLords = _.pick(this.data.sithLords, (data, cursor) => {
      return data.loadState == 'done';
    });
    this.trigger(this.data);
  },

  // Utility functions that can be called by the UI

  hasMoreApprentices() {
    var maxCursor = _(this.data.sithLords).keys().max();
    if(maxCursor in this.data.sithLords){
      var lastLord = this.data.sithLords[maxCursor];
      // If the last lord is loading, allow iff the middle lord is done (so we won't scroll
      // entirely off the screen
      if(lastLord.loadState == 'loading'){
        return _.get(this.data.sithLords, [parseInt(maxCursor)-3, 'loadState']) == 'done';
      }
      else
        return !!lastLord.apprentice.url;
    }
    else {
      return false; // Edge case: false with no data
    }
  },
  hasMoreMasters() {
    var minCursor = _(this.data.sithLords).keys().min();
    if(minCursor in this.data.sithLords){
      var firstLord = this.data.sithLords[minCursor];
      if(firstLord.loadState == 'loading'){
        return _.get(this.data.sithLords, [parseInt(minCursor)+3, 'loadState']) == 'done';
      }
      else
        return !!firstLord.master.url;
    }
    else {
      return false; // Edge case: false with no data
    }
  },
  currentPlanetHasLord() {
    return _.any(this.data.sithLords, (lord) => {
      return lord.loadState == 'done' && (lord.homeworld.id == this.data.currentPlanet.id);
    })
  },

});

// ===== components.jsx =====


// Componenet to manage each lord's row
var Entry = React.createClass({
  mixins: [Reflux.connect(store)],

  propTypes: {
    cursor: React.PropTypes.number.isRequired,
  },

  componentDidMount() {
    actions.requestCursor(this.props.cursor);
  },

  componentWillUnmount() {
    actions.releaseCursor(this.props.cursor);
  },

  render() {

    var currentLord = this.state.sithLords[this.props.cursor] || {};

    if(currentLord.loadState == 'loading' )
      return <div className="css-slot">Loading...</div>;
    else if(currentLord.loadState == 'done'){
      var isCurrentPlanet = this.state.currentPlanet.id == currentLord.homeworld.id;
      var style = isCurrentPlanet ? {color: 'red'} : {};
      return (
          <div className="css-slot" style={style}>
            <h3>{currentLord.name}</h3>
            <h6>Homeworld: {currentLord.homeworld.name}</h6>
          </div>
      );
    }
    else
      return <div className="css-slot"></div>;
  }

});

// Component to manage lifecycle of WebSocket
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

var Button = React.createClass({
  propTypes: {
    className: React.PropTypes.string.isRequired,
    enabled: React.PropTypes.bool,
    onClick: React.PropTypes.func,
  },
  render() {
    return <button
        className={this.props.className + (this.props.enabled ? '' : ' css-button-disabled')}
        onClick={this.props.enabled ? this.props.onClick : undefined}
    />
  }
});

// Main app component
var App = React.createClass({
  mixins: [Reflux.connect(store)],
  getInitialState() {
    return {start: 0};
  },
  componentDidMount() {
    // One hardcoded URL
    actions.loadSithLord(0, 'http://localhost:3000/dark-jedis/3616');
  },
  scrollDown() {
    this.setState({start: this.state.start + 2});
  },
  scrollUp() {
    this.setState({start: this.state.start - 2});
  },
  render() {
    var hasMoreApprentices = store.hasMoreApprentices();
    var hasMoreMasters = store.hasMoreMasters();
    var currentPlanetHasLord = store.currentPlanetHasLord();

    var allowScrollUp = hasMoreMasters && !store.currentPlanetHasLord();
    var allowScrollDown = hasMoreApprentices && !store.currentPlanetHasLord();

    return (<div className="css-root">
      <WebSocketConnection />
      <div className="css-planet-monitor">
        Obi-Wan currently on {this.state.currentPlanet.name}
      </div>
      <div className="css-scrollable-list" style={{marginTop: 10}}>
        <div className="css-slots">
          {_.map(_.range(5), (cursor) =>
              <Entry cursor={this.state.start + cursor} key={this.state.start + cursor} />)
          }
        </div>
        <div className="css-scroll-buttons">
          <Button className="css-button-up" enabled={allowScrollUp} onClick={this.scrollUp}/>
          <Button className="css-button-down" enabled={allowScrollDown} onClick={this.scrollDown} />
        </div>
      </div>

    </div>);
  },
});


// ===== main.jsx =====

$(function(){
  React.render(<App />, $('#react-app')[0]);
});

