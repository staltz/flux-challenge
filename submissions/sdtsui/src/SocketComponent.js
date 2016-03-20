class SocketComponent {
  constructor(url, dashboard) {
    this._dashboard = dashboard;
    this._socket_url = url;
    this._location = null;
    this._location_id = null;
    this._el = document.querySelector('.css-planet-monitor');
    this._socket = new WebSocket(this._socket_url);

    /**
     * Note to self: 
     */
    //store state of the locked UI -- cleaner alternative to redundantly
    //re-assigning and re-ren dering.
    // this.previous_UI_State = false; || {
    //    indices of Match : 2,3,
    //    top-active : false,
    //    bottom-active: true;
    // }

    /**
     * Socket Connection
     * @param  {[type]} 'ws:                 socket.onopen [description]
     * @return {[type]}      [description]
     */
  }

  connectSocket() {
    this._socket.onopen = () => {
      this._socket.send('Listening to Obi-Wan\'s location');
    };

    let onMessageFn = (res) => {
      let dash = this._dashboard;
      let newLoc = this.updateLocation.bind(this)(res);
      //rerender the central dashboard
      console.log('rerender');
      dash.render(dash.el_slots);

      console.log('re-enable all buttons');
      dash._ui.enableAll();

      console.log('disable the same old buttons, and restart fetching');
      let sl = dash._sithlist
      let found = sl.findOneSith();
      if (found) {
        found.fillRemainingSlots(found);}

      //activate both arrows
      //  deactivate in Sith logic already present: pretend a new one came in
      dash.checkIfWorldMatch.bind(dash)(newLoc);
    }.bind(this);
    this._socket.onmessage = onMessageFn;
  }

  getLocation() {
    return {
      name: this._location_id,
      id: this._location,
    }
  }

  formatLocation(suffix) {
    return "Obi-Wan currently on " + suffix;
  }

  updateLocation(res) {
    let data = JSON.parse(res.data);
    this._location = data.name;
    this._location_id = data.id;
    this._el.innerHTML = this.formatLocation(data.name);
    return data.name;
  }

}

module.exports = SocketComponent;