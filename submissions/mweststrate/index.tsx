/**
 * Flux-challenge submission by Michel Weststrate
 * Using mobservable, react, superagent and typescript
 *
 * For readability convenience, stored both the model and ui in single file
 */

/// <reference path="typings/tsd.d.ts" />

import React = require('react');
import ReactDOM = require('react-dom');
import request = require("superagent");

import {observable, autorunUntil, transaction} from "mobservable";
import {observer} from "mobservable-react";

/**
 * React User Interface Components
 */

const ScrollButton = observer((props : { className: string, enabled: boolean, handler: ()=>void }) =>
	<button className={`css-button-${props.className} ${props.enabled ? "" : "css-button-disabled"}`}
		onClick={props.handler}></button>
);

const SithView = observer((props: { sith: Sith, key: any }) =>
	props.sith && props.sith.isLoaded
		? <li className="css-slot" style={{color: props.sith.livesOnCurrentWorld ? "red" : null}}>
			<h3>{props.sith.name}</h3>
			<h6>Homeworld: {props.sith.homeworld.name}</h6>
		</li>
		: <li className="css-slot" />
);

const AppView = observer((props: { model: SithDatabase }) =>
	<div className="app-container">
		<div className="css-root">
			<h1 className="css-planet-monitor">Obi-Wan currently on {props.model.currentWorld.name}</h1>
			<section className="css-scrollable-list">
			<ul className="css-slots">
				{ props.model.siths.map((sith, idx) => <SithView sith={sith} key={sith ? sith.id : idx} />) }
			</ul>
			<div className="css-scroll-buttons">
				<ScrollButton className="up" enabled={props.model.canScrollUp} handler={props.model.goUp} />
				<ScrollButton className="down" enabled={props.model.canScrollDown} handler={props.model.goDown} />
			</div>
			</section>
		</div>
	</div>
);

/**
 * The application model & controller
 */

export class SithDatabase {
	@observable currentWorld: World = { id: -1, name: "<none>" };
	@observable siths: Sith[] = [null, null, null, null, null];

	constructor() {
		new WebSocket('ws://localhost:4000').onmessage = (msg) => {
			this.currentWorld = JSON.parse(msg.data);
		};
		this.loadSith(3616, 2);
	}

	@observable get hasSithOnCurrentPlanet(): boolean {
		return this.siths.some(sith => sith && sith.livesOnCurrentWorld);
	}

	@observable get firstSith(): Sith {
		return this.siths.filter(sith => sith !== null && sith.isLoaded)[0]
	}

	@observable get lastSith(): Sith {
		return this.siths.slice().reverse().filter(sith => sith !== null && sith.isLoaded)[0];
	}

	@observable get canScrollUp(): boolean {
		return !this.hasSithOnCurrentPlanet &&
		       this.firstSith &&
		       this.firstSith.displayPosition <= 2 && // don't scroll beyond screen
		       this.firstSith.master != null;
	}

	@observable get canScrollDown(): boolean {
		return !this.hasSithOnCurrentPlanet &&
		       this.lastSith &&
		       this.lastSith.displayPosition >= 2 && // don't scroll beyond screen
		       this.lastSith.apprentice != null;
	}

	goUp = () => {
		if (this.canScrollUp) {
			transaction(() => {
				this.siths.unshift(null, null);
				this.siths.splice(5);
			});
			this.firstSith.loadSiblings();
		}
	}

	goDown = () => {
		if (this.canScrollDown) {
			transaction(() => {
				this.siths.push(null, null);
				this.siths.splice(0, 2);
			});
			this.lastSith.loadSiblings();
		}
	}

	loadSith(id, position) {
		transaction(() => {
			if (!this.siths[position]) {
				const sith = new Sith(this, id);
				this.siths[position] = sith;
			}
		});
	}
}

export class Sith {
	@observable name: string;
	@observable homeworld: World;
	@observable master: string;
	@observable apprentice: string;
	@observable isLoaded = false;
	fetcher;

	constructor(public store: SithDatabase, public id: number) {
		this.load();
	}

	@observable get displayPosition(): number {
		return this.store.siths.indexOf(this);
	}

	@observable get isVisible(): boolean {
		return this.displayPosition !== -1;
	}

	@observable get livesOnCurrentWorld(): boolean {
		return this.isLoaded && this.homeworld.id === this.store.currentWorld.id;
	}

	load() {
		this.fetcher = request
			.get(`http://localhost:3000/dark-jedis/${this.id}`)
			.end((err, res) => {
				if (err)
					throw "Eehh. Got error. Unspecified behavior.";
				const data = res.body;
				transaction(() => {
					this.name = data.name;
					this.homeworld = data.homeworld;
					this.master = data.master.id;
					this.apprentice = data.apprentice.id;
					this.isLoaded = true;
				});
				this.loadSiblings();
			});

		autorunUntil(
			() => !this.isVisible || this.store.hasSithOnCurrentPlanet,
			() => {
				this.fetcher.abort();
				if (this.isVisible && !this.isLoaded) {
					autorunUntil(() => !this.store.hasSithOnCurrentPlanet, () => {
						this.load();
					});
				}
			}
		);
	}

	loadSiblings() {
		const pos = this.displayPosition;
		const store = this.store;
		if (this.master && pos > 0 && !store.siths[pos - 1])
			store.loadSith(this.master, pos - 1);
		if (this.apprentice && pos < 4 && !store.siths[pos + 1])
			store.loadSith(this.apprentice, pos + 1);
	}
}

type World = {
	id: number;
	name: string;
}

/**
 * Start the UI.
 */

ReactDOM.render(
    <AppView model={ new SithDatabase() } />,
    document.getElementById("mount")
);