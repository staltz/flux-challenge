import React from 'react';

export default class extends React.Component {

    static propTypes = {
        name: React.PropTypes.string,
        homeworld: React.PropTypes.string,
        obiPlanet: React.PropTypes.string,
    }

    render() {

        const textColor = this.props.homeworld === this.props.obiPlanet ? 'red' : '';

        return (
            <li className="css-slot" style={{color: textColor}}>
                <h3>{this.props.name}</h3>
                <h6>{this.props.homeworld && `Homeworld: ${this.props.homeworld}`}</h6>
            </li>
        )
    }
}
