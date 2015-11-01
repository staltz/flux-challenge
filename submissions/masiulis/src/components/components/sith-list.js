import React from 'react';
import classnames from 'classnames';
import request from 'superagent';
import { __, range, update, isNil, drop, dropLast, concat, pipe, filter, reject, find, findLast, findLastIndex, findIndex, not, compose} from 'ramda';

import Sith from './components/sith-list-item.js';

let currentRequest = null;
const startingSithId = 3616;
const startingPosition = 2;

function getSith(id) {
    return new Promise((resolve, reject) => {
        currentRequest = request
            .get('http://localhost:3000/dark-jedis/' + id)
            .end((err, res)=>{
                currentRequest = null;
                err ? reject(err) : resolve(res.body);
            });
    });
}

function stopRequest() {
    if(currentRequest){
        currentRequest.abort();
        currentRequest = null;
    }
}

const pushRightBy2 = pipe(drop(2), concat(__, [null, null]));
const pushLeftBy2 = pipe(dropLast(2), concat([null, null]));

export default class extends React.Component {

    static propTypes = {
        obiPlanet: React.PropTypes.string,
    }

    constructor(){
        super();

        this.state = {
            siths: [null, null, null, null, null],
            offset: 0,
        };

        getSith(startingSithId)
            .then(this.addSith.bind(this, startingPosition));
    }

    componentDidUpdate(){
        if(this.isObiInSithsHomeworld()){
            if(currentRequest){
                stopRequest();
            }
            return;
        }
        // requesting out of bounds
        if(currentRequest && (currentRequest.positionId < this.state.offset || currentRequest.positionId > this.state.offset + 4)){
            stopRequest();
        }
        // keep pulling siths
        if(!currentRequest){
            this.getMissingSiths();
        }
    }

    addSith(position, sith){
        this.setState({siths:update(position - this.state.offset, sith, this.state.siths)});
    }

    getMissingSiths() {

        if(this.isObiInSithsHomeworld()){
            return;
        }

        const lastSithIndex = findLastIndex(compose(not, isNil), this.state.siths);
        const lastSith = this.state.siths[lastSithIndex];
        if(lastSithIndex !== 4 && lastSith.apprentice.id){
            const position = lastSithIndex + 1 + this.state.offset;
            getSith(lastSith.apprentice.id)
                .then(this.addSith.bind(this, position));
            currentRequest.positionId = position;
            return;
        }
        // else
        const firstSithIndex = findIndex(compose(not, isNil), this.state.siths);
        const firstSith = this.state.siths[firstSithIndex];
        if(firstSithIndex !== 0 && firstSith.master.id){
            const position = firstSithIndex - 1 + this.state.offset;
            getSith(firstSith.master.id)
                .then(this.addSith.bind(this, position));
            currentRequest.positionId = position;
        }
    }

    handleUpClicked(){
        if(!this.canScrollUp()){
            return;
        }
        this.setState({siths:pushLeftBy2(this.state.siths), offset: this.state.offset - 2});
    }

    handleDownClicked(){
        if(!this.canScrollDown()){
            return;
        }
        this.setState({siths:pushRightBy2(this.state.siths), offset: this.state.offset + 2});
    }

    isObiInSithsHomeworld(){
        if (filter((sith)=> sith.homeworld.name === this.props.obiPlanet)(reject(isNil, this.state.siths)).length){
            return true;
        }
    }

    canScrollUp(){
        // cannot scroll outside visible siths, at least one should be visible at all times
        if (!(this.state.siths[0] || this.state.siths[1] || this.state.siths[2])){
            return false;
        }
        // one or more siths matched Obi's current plannet
        if (this.isObiInSithsHomeworld()){
            return false;
        }
        // first sith must have a master
        const firstSith = find(compose(not, isNil), this.state.siths);
        if (!firstSith.master.id){
            return false;
        }
        return true;
    }

    canScrollDown(){
        // cannot scroll outside visible siths, at least one should be visible at all times
        if (!(this.state.siths[2] || this.state.siths[3] || this.state.siths[4])){
            return false;
        }
        // one or more siths matched Obi's current plannet
        if (this.isObiInSithsHomeworld()){
            return false;
        }
        // last sith must have an apprentice
        const lastSith = findLast(compose(not, isNil), this.state.siths);
        if (!lastSith.apprentice.id){
            return false;
        }
        return true;
    }

    render() {

        const scrollUpCss = classnames({
            'css-button-up': true,
            'css-button-disabled': !this.canScrollUp(),
        });
        const scrollDownCss = classnames({
            'css-button-down': true,
            'css-button-disabled': !this.canScrollDown(),
        });
        const sithList = this.state.siths.map((sith, position)=>{
            return <Sith key={position} name={sith && sith.name} homeworld={sith && sith.homeworld.name} {...this.props}/>
        });

        return (
            <section className="css-scrollable-list">
                <ul className="css-slots">
                    {sithList}
                </ul>
                <div className="css-scroll-buttons">
                    <button className={scrollUpCss} onClick={this.handleUpClicked.bind(this)}></button>
                    <button className={scrollDownCss} onClick={this.handleDownClicked.bind(this)}></button>
                </div>
            </section>
        )
    }
}
