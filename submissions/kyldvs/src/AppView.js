/**
 * @flow
 */

'use strict';

import type Immutable from 'immutable';
import type Sith from './Sith';

import React from 'react';

type Props = {
  currentPlanet: string,
  onScrollDown: () => void,
  onScrollUp: () => void,
  siths: Immutable.List<Sith>,
};

/**
 * This is a stateless react component, see release notes for v0.14.
 */
export default function AppView(props: Props): ReactElement {
  return (
    <div className="app-container">
      <div className="css-root">
        {renderPlanetMonitor(props)}
        {renderSithList(props)}
      </div>
    </div>
  );
}

function renderPlanetMonitor(props: Props) {
  return (
    <h1 className="css-planet-monitor">
      Obi-Wan currently on {props.currentPlanet}
    </h1>
  );
}

function renderSithList(props: Props) {
  return (
    <section className="css-scrollable-list">
      <ul className="css-slots">
        {renderSithListElements(props)}
      </ul>
      <div className="css-scroll-buttons">
        {renderUpButton(props)}
        {renderDownButton(props)}
      </div>
    </section>
  );
}

function renderSithListElements(props: Props) {
  const {currentPlanet} = props;
  return props.siths.map(sith => {
    const {requestID, name, homeworldName} = sith;
    return (
      <li
        className="css-slot"
        key={requestID}
        style={homeworldName === currentPlanet ? {color: '#f00'} : undefined}>
        <h3>{name ? name : ''}</h3>
        <h6>{homeworldName ? 'Homeworld: ' + homeworldName : ''}</h6>
      </li>
    );
  });
}

function renderUpButton(props: Props) {
  const {siths} = props;
  const disabled = inTheDangerZone(props) || !siths.first().masterID;
  if (disabled) {
    return <button className="css-button-up css-button-disabled" />;
  } else {
    return <button className="css-button-up" onClick={props.onScrollUp} />;
  }
}

function renderDownButton(props: Props) {
  const {siths} = props;
  const disabled = inTheDangerZone(props) || !siths.last().apprenticeID;
  if (disabled) {
    return <button className="css-button-down css-button-disabled" />;
  } else {
    return <button className="css-button-down" onClick={props.onScrollDown} />;
  }
}

function inTheDangerZone(props: Props) {
  return props.siths.some(sith => sith.homeworldName === props.currentPlanet);
}
