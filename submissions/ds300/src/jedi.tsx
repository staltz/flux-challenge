import {dom, root, lifecycle} from 'ddom'
import {List, Map, Set} from 'immutable'
import {atom, destruct, transaction, lookup, derive, defaultEquals} from 'derivable'
import { Request } from './request'
import { up, down, completeRequest } from './model'
import { isString } from './util'

const React = {createElement: dom};

// ROOT STATE: this represents where obi-wan currently is
const obiwanIsHere = atom(null);
const [currentWorldId, currentWorldName] = destruct(obiwanIsHere, 'id', 'name');

// and this is how it gets set
new WebSocket('ws://localhost:4000').onmessage = (msg) => {
  obiwanIsHere.set(JSON.parse(msg.data));
};

// ROOT STATE: these are the siths we know about right now. urls represent
// incomplete requests, nulls mean waiting for more requests to finish
const siths = atom(List([
  null, null, 'http://localhost:3000/dark-jedis/3616',  null, null
]));

// need to know whether or not there is a sith from the place obi-wan is at
function sithMatches (sith, currentWorldId) {
  return sith && !isString(sith) && sith.homeworld.id === currentWorldId;
}

const matchingSith = currentWorldId.derive(id => {
  return siths.get().filter(s => sithMatches(s, id)).first();
});


// deal with requests as they change
const currentSithRequests = siths.derive(ss => Set(ss.filter(isString)));
// should be no active requests when homeworld match
const activeSithRequests = matchingSith.then(Set(), currentSithRequests);


// react to changes in active sith requests
// started when first homeworld comes in (look at bottom of file)
const requestReactor = (() => {
  let oldRequests = Set();

  return activeSithRequests.reactor((newRequests) => {
    const toKill = oldRequests.subtract(newRequests);
    toKill.forEach(Request.cancel);
    const toStart = newRequests.subtract(oldRequests);
    toStart.forEach(url => {
      Request.create(url, (sith) => siths.swap(completeRequest, url, sith));
    });

    oldRequests = newRequests;
  });
})();


// ok so we disable up arrow when either one sith unloaded at the bottom or
// sith at top has no master
const numSiths = siths.derive(ss => ss.filter(s => s !== null).count());
const oneSith = numSiths.is(1);
const firstSith = siths.derive(ss => ss.first());
const lastSith = siths.derive(ss => ss.last());
const oneSithAtBottom = oneSith.and(lastSith);
const firstSithHasNoMaster = firstSith.mDerive(s => !isString(s) && !s.master.url);

const upDisabled = matchingSith.or(oneSithAtBottom)
                               .or(firstSithHasNoMaster);

// similarly for down arrow
const oneSithAtTop = oneSith.and(firstSith);
const lastSithHasNoApprentice = lastSith.mDerive(s => !isString(s) && !s.apprentice.url);

const downDisabled = matchingSith.or(oneSithAtTop)
                                 .or(lastSithHasNoApprentice);

// and we should only move up one if there are only two siths at the bottom
const twoSiths = numSiths.is(2);
const twoSithsAtBottom = twoSiths.and(lastSith);
const numToMoveUp = twoSithsAtBottom.then(1, 2);
// likewise for moving down
const twoSithsAtTop = twoSiths.and(firstSith);
const numToMoveDown = twoSithsAtTop.then(1, 2);

// function to create up and down buttons (this returns a regular old dom node)
function scrollButton (klass, disabled, fn, num) {
  return (
    <button $class={["css-button-" + klass, {"css-button-disabled": disabled}]}
            onclick={disabled.then(null, () => siths.swap(fn, num.get()))}></button>
  );
}

// again, let me state that these are regular old HTMLElements
const upButton = scrollButton('up', upDisabled, up, numToMoveUp);
const downButton = scrollButton('down', downDisabled, down, numToMoveDown);


// now let's create the sith list
function sithListItem(name, homeworld) {
  // display red text when at this sith's homeworld
  const atHomeworld = currentWorldName.is(homeworld);
  const textColor = atHomeworld.then("red", "white");
  return (
    <li $class="css-slot" $style={{color: textColor}}>
      <h3>{name}</h3>
      <h6>{homeworld && `Homeworld: ${homeworld}`}</h6>
    </li>
  );
}

function renderSith(sith) {
  if (sith && !isString(sith)) {
    return sithListItem(sith.name, sith.homeworld.name);
  } else {
    return sithListItem("", "");
  }
}

const sithList = (
  <ul $class="css-slots">{siths.derive(ss => ss.map(renderSith))}</ul>
);

// and finally the app
const app = (
  <div $class="css-root">
    <h1 $class="css-planet-monitor">Obi-Wan currently on {currentWorldName}</h1>
    <section $class="css-scrollable-list">
      { sithList }
      <div $class="css-scroll-buttons"> {[upButton, downButton]} </div>
    </section>
  </div>
);


// only render it when ready
const ready = obiwanIsHere.is(null).not();

// root our app elem in document.body
root(document.body, (
  <div $class="app-container">
    {ready.then(app, "loading...")}
  </div>
));

// and finally kick off sith requests when ready too
ready.react(ready => {
  if (ready) {
    requestReactor.start().force();
  }
})
