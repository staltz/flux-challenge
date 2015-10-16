import React from 'react';
import { dom } from 'react-reactive-class';
import { Observable, Subject } from 'rx';

import { TOTAL_SLOT_COUNT } from '../constants.js';
import { allEmpty, isMatchCurrentPlanet } from '../utils.js';

const { h1: H1, li: Li, button: Button } = dom;

function slots(state$) {
  const elements = [];
  for ( let i = 0 ; i < TOTAL_SLOT_COUNT ; i += 1) {
    const redStyle = { color: 'red' };
    const emptySlot = [<h3></h3>, <h6></h6>];

    // only re-render when slot changes
    const slot$ = state$
      .map(state => state.slots[i])
      .distinctUntilChanged();

    const obiWanPlanetId$ = state$
      .map(state => state.obiWanLocation.id);

    const style$ = Observable.combineLatest(
      slot$,
      obiWanPlanetId$,
      (slot, obiWanPlanetId) => {
        return (slot && obiWanPlanetId === slot.homeworld.id)
          ? redStyle
          : null;
      }
    );

    const content$ = slot$.map((slot) => {
      if (!slot) {
        return emptySlot;
      }

      return [
        <h3>{slot.name}</h3>,
        <h6>{'Homeworld: ' + slot.homeworld.name}</h6>
      ];
    });

    elements.push(
      <Li key={'slot' + i}
          className="css-slot"
          style={style$}>{content$}</Li>
    );
  }

  return elements;
}

function upButton(state$) {
  const normalClassName = "css-button-up";
  const disabledClassName = "css-button-up css-button-disabled";

  const disabled$ = state$.map((state) => {
    const { slots } = state;
    return (
      allEmpty(slots)
        || isMatchCurrentPlanet(state)
        || (slots[slots.length - 1] && !slots[slots.length - 2])
        || (slots[slots.length - 2] && !slots[slots.length - 3])
    );
  })
  .distinctUntilChanged();

  const className$ = disabled$.map((disabled) => {
    return disabled
      ? disabledClassName
      : normalClassName;
  });

  const event$ = new Subject();
  const element = (
    <Button className={className$}
            onClick={event$.onNext.bind(event$)}
            disabled={disabled$}></Button>
  );

  return { element, event$ };
}

function downButton(state$) {
  const normalClassName = "css-button-down";
  const disabledClassName = "css-button-down css-button-disabled";

  const disabled$ = state$.map((state) => {
    const { slots } = state;
    return (
      allEmpty(slots)
        || isMatchCurrentPlanet(state)
        || (slots[0] && !slots[1])
        || (slots[1] && !slots[2])
    );
  })
  .distinctUntilChanged();

  const className$ = disabled$.map((disabled) => {
    return disabled
      ? disabledClassName
      : normalClassName;
  });

  const event$ = new Subject();
  const element = (
    <Button className={className$}
            onClick={event$.onNext.bind(event$)}
            disabled={disabled$}></Button>
  );

  return { element, event$ };
}

function dashboard(state$) {
  const planetMonitorText$ = state$.map(state => {
    return state.obiWanLocation.name
      ? 'Obi-Wan currently on ' + state.obiWanLocation.name
      : '';
  });

  const slots$ = slots(state$);

  const {
    element: UpButton,
    event$: upClick$
  } = upButton(state$);

  const {
    element: DownButton,
    event$: downClick$
  } = downButton(state$);

  const element = (
    <div className="css-root">
      <H1 className="css-planet-monitor">{planetMonitorText$}</H1>
      <section className="css-scrollable-list">
        <ul className="css-slots">
          { slots$ }
        </ul>
        <div className="css-scroll-buttons">
          { UpButton }
          { DownButton }
        </div>
      </section>
    </div>
  );

  return {
    element,
    events: {
      upClick$,
      downClick$
    }
  }
}

export default dashboard;
