import React from 'react';

export class SithUI extends React.Component {

  emit(actionName, action = {}) {
    action.type = this.constructor.name + "." + actionName;
    this.props.dispatch(action);
  }

  render() {
    const {rows, currentPlanet, matchedSith} = this.props.state,
          canGoUp = !matchedSith && rows[0].masterUrl,
          canGoDown = !matchedSith && rows[4].apprenticeUrl;

    return (
      <div className="css-root">
        <h1 className="css-planet-monitor">Obi-Wan currently on {currentPlanet}</h1>

        <section className="css-scrollable-list">
          <ul className="css-slots">
            {rows.map(
              (row, idx) =>
                <li key={idx} className="css-slot"
                    style={{color: (row === matchedSith ? "red" : "")}}>
                  <h3>{row.name}</h3>
                  <h6>{row.homeworld ? `Homeworld: ${row.homeworld}` : ""}</h6>
                </li>
            )}
          </ul>
          <div className="css-scroll-buttons">
            <button className={"css-button-up" + (!canGoUp ? " css-button-disabled" : "")}
                    onClick={() => canGoUp && this.emit("scrollUp")}></button>
            <button className={"css-button-down" + (!canGoDown ? " css-button-disabled" : "")}
                    onClick={() => canGoDown && this.emit("scrollDown")}></button>
          </div>
        </section>
       </div>
    );
  }
}
