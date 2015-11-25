import { React } from 'ddom'
import {
  $ready,
  $sithIDs,
  $localSiths,
  $sithCache,
  $redAlert,
  $worldName
} from './state'
import { first, last, identity } from './util'
import { up, down } from './mutations'

// ok so we disable up arrow when either one sith unloaded at the bottom or
// sith at top has no master
const $numSiths = $sithIDs.derive(ss => ss.filter(identity).count());
const $oneSith = $numSiths.is(1);

const $onlyLocalSiths = $localSiths.derive(ss => ss.filter(identity));
const $topSithID = $sithIDs.derive(first);
const $firstSith = $onlyLocalSiths.derive(first);

const $bottomSithID = $sithIDs.derive(ids => ids.last());
const $lastSith = $onlyLocalSiths.derive(last);
const $oneSithAtBottom = $bottomSithID.mAnd($oneSith);
const $firstSithHasNoMaster = $firstSith.mDerive(s => !s.master.url);

const $upDisabled =
  $redAlert
    .or($oneSithAtBottom)
    .or($firstSithHasNoMaster);

// similarly for down arrow
const $oneSithAtTop = $topSithID.mAnd($oneSith);
const $lastSithHasNoApprentice = $lastSith.mDerive(s => !s.apprentice.url);

const $downDisabled =
  $redAlert
    .or($oneSithAtTop)
    .or($lastSithHasNoApprentice);


// function to create up and down buttons (this returns a regular old dom node)
function scrollButton (klass, $disabled, fn) {
  return (
    <button class={["css-button-" + klass, {"css-button-disabled": $disabled}]}
            onclick={$disabled.then(null, () => fn(2))}></button>
  );
}

// these are regular old HTMLElements
const upButton = scrollButton('up', $upDisabled, up);
const downButton = scrollButton('down', $downDisabled, down);


// now let's create the sith list
function sithListItem(name, homeworld) {
  // display red text when at this sith's homeworld
  const $atHomeworld = $worldName.is(homeworld);
  const $textColor = $atHomeworld.then("red", null);
  return (
    <li class="css-slot" style={{color: $textColor}}>
      <h3>{name}</h3>
      <h6>{homeworld && `Homeworld: ${homeworld}`}</h6>
    </li>
  );
}

function renderSith(sith) {
  if (sith != null) {
    return sithListItem(sith.name, sith.homeworld.name);
  } else {
    return sithListItem("", "");
  }
}

const sithList = (
  <ul class="css-slots">{$localSiths.derive(ss => ss.map(renderSith))}</ul>
);

// and finally the app
const app = (
  <div class="css-root">
    <h1 class="css-planet-monitor">Obi-Wan currently on {$worldName}</h1>
    <section class="css-scrollable-list">
      { sithList }
      <div class="css-scroll-buttons"> {[upButton, downButton]} </div>
    </section>
  </div>
);

export const page = (
  <div class="app-container">
    {$ready.then(app, "loading...")}
  </div>
);
