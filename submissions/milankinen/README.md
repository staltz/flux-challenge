## MEGABLOB implementation

**MEGABLOB** is a `React+Bacon.js` (or any other FRP library, like RxJs)
application architecture where the application state is managed by using
event streams: all actions propagate through the "mega-size" application
state object (= blob).

In this approach React components are just pure functions / dummy components
pushing (UI) events to the event streams via `Bacon.Bus` (or `Subject` in Rx)
instances.

For more info, see:

* [Good bye Flux, welcome Bacon/Rx?](https://medium.com/@milankinen/good-bye-flux-welcome-bacon-rx-23c71abfb1a7)
* [react-bacon-todomvc](https://github.com/milankinen/react-bacon-todomvc)
* [unistack](https://github.com/laurilehmijoki/unistack)
* [megablob](https://github.com/milankinen/megablob)


### Usage

    npm i && npm run dist && open index.html 
    
    
### License

The contents of this folder are licensed under MIT.
