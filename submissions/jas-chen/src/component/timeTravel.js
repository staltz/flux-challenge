import { Observable, Subject } from 'rx';
import React from 'react';
import { dom } from 'react-reactive-class';

const { div: Div, input: Input, button: Button } = dom;

function btnSubject() {
  const subject$ = new Subject();
  const onNext = subject$.onNext.bind(subject$);
  const click$ = subject$.map((e) => e.target.textContent);

  return {
    click$, onNext
  }
}

function timetravel(states) {
  const sliderEv$ = new Subject();
  const sliderOnNext = sliderEv$.onNext.bind(sliderEv$);

  const startText = '►';
  const pauseText = '||';

  const { click$, onNext: btnOnClick } = btnSubject();

  const btnText$ = click$.map((btnText) => {
    // switch text
    return btnText === startText ? pauseText : startText;
  }).startWith(pauseText);

  const visibleStyle = { visibility: 'visible' };
  const HiddenStyle = { visibility: 'hidden' };

  // show slider when click pause
  const sliderStyle$ = click$
    .map((btnText) => btnText === pauseText ? visibleStyle : HiddenStyle)
    .startWith(HiddenStyle);

  // refresh max when click
  const max$ = click$
    .map(() => states.length - 1);

  // slide to current state index
  const value$ = Observable
    .merge(max$, sliderEv$.map((e) => e.target.value))
    .distinctUntilChanged();

  const element = (
    <div className="row">
      <Div className="col slider-wrapper"
           style={sliderStyle$}>
        <Input className="slider"
               type="range"
               min="0"
               max={max$}
               value={value$}
               onInput={sliderOnNext} />
      </Div>
      <div className="col tm-btn-wrapper">
        <Button className="tm-btn" onClick={btnOnClick}>{btnText$}</Button>
      </div>
    </div>
  );

  return { element, sliderEv$, click$ };
}

export default timetravel;
