# About this submission

## Tools used and their purposes

### Libraries that define the architecture of the project

 - [React](https://github.com/facebook/react): For building reusable
 web-components (as pure functions).
 - [Redux](http://redux.js.org/): For managing the state of the app using actions
  (treated as events) and reducers (that are "subscribed" to those events).
 - [Redux-Saga](https://github.com/yelouafi/redux-saga): For orchestrating the
  side-effects.

### Helper libraries

 - [Reselect](https://github.com/reactjs/reselect): For computing derived data.
 - [ImmutableJS](https://github.com/facebook/immutable-js/): For maintaining the
  list of "Siths" with a persistent data-structure.
 - [Ramda](http://ramdajs.com/): As a functional library helper (I've tried not
  to "abuse" its usage because I'm aware that most developers won't be
  familiar with it. I think that this library is awesome for doing any sort of
  functional programming with Js)
 - [XHR](https://github.com/Raynos/xhr): To cancel the ongoing http requests.

### Bootstraping

 The [create-react-app](https://github.com/facebookincubator/create-react-app) CLI
 has been used for bootstrapping. I've added a couple "script" entries in the 
`package.json` so that I could avoid running the "eject" script. 
 
Mainly, what happens is that when running `npm run build` the `index.html` file
at the root gets replaced with the one that got generated in the `build` folder.
So that the submission can be compliant with the requirements of the challenge.
However, when running `npm start` the same file file gets replaced with the
normal template so that we can have hot reloading while developing.

## My thoughts about this solution and this challenge

In this solution I've tried to decouple the actions from the reducers and the
sagas by having "event based" actions. That means that instead of having
imperative actions ("SET_X_TO_Y"), I treat actions like events that let the rest
of the application know about what happened ("OBI_ONE_MOVED", "SITH_LOADED", etc).
Then, for every part of the redux global state there is a reducer that reacts to the
actions that are relevant for calculating its next state. I've also decoupled the
different reducers from each other as much as I was able to. On the other hand, we
have the sagas that are also subscribed to those events, which are responsible for
orchestrating all the external side-effects.

 This challenge has helped me to learn the limitations of Redux and
 how to develop Redux apps in a way that circumvents those limitations. I think
 that this submission accomplishes that. I'm not particularly proud of the
 sagas that I've wrote. I may switch to
[Redux-Observable](https://github.com/redux-observable/redux-observable).
It shouldn't be too difficult because all the logic for the external side-effects
is decoupled from the rest of the code.

 I recommend solving this challeng to anyone
 who uses a flux-like paradigm. However, there is another important 
 "weak spot" in the redux architecture that this challenge doesn't exploit: the
 "internal" state manipulation of re-usable components (i.e. managing the
 "internal" state of a custom carousel component). It would be awesome to
 have another tailored challenge that exploited this weakness to see how different
 paradigms deal with it. I'm quite confident that "flux/redux" devs like myself
 could gather some good ideas from the way that other paradigms (like Elm or CycleJs)
 address those situations.

## Feedback

We are all trying to learn here, so any sort feedback will be very welcome.
If you want to share your insights on this submission, please
[open an issue in my forked repo](https://github.com/josepot/flux-challenge/issues/new).
Thanks!
