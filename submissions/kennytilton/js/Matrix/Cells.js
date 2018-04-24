goog.provide('Matrix.Cells');

function clg(...args) {
    console.log(Array.from(args).join(","));
}
window['clg'] = clg;

function ast (test, msg="anon", ...mas) {
    console.assert(test, msg, ...mas);
}
window['ast'] = ast;

function find(x,y) {
    if (y.indexOf(x) !== -1) {
        return x;
    }
}

function eko (tag,value) {
    console.log('eko <' + tag + '> = ' + value.toString());
    return(value);
}

function xor (a, b) {
	return a ? !b : b;
}
window['xor']=xor;

function uuidv4() {
	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		(c ^ window.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
}
window['uuidv4'] = uuidv4;

function localStorageLoad (keyPrefix) {
    let keys = Object.keys( window.localStorage || {} ),
        values = [],
		i = keys.length;

	clg('lsl sees keys'+keys)
	while ( i-- ) {
		if ( keys[i].startsWith(keyPrefix))
			values.push( JSON.parse(window.localStorage.getItem(keys[i]) || ""));
	}
	return values;
}

function isString(s) {
	return typeof s === 'string';
}

// --- localStorag setup ------------------------------

Storage.prototype['setObject'] = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}
Storage.prototype['getObject'] = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

/* https://gist.github.com/Benvie/9988604*/

var MISSING = {};
var QUEUE_COMPACT_SIZE = 500;

function define(object, properties) {
	for (var key in properties) {
		//noinspection JSUnfilteredForInLoop
		var desc = Object.getOwnPropertyDescriptor(properties, key);
		desc.enumerable = false;
		//noinspection JSUnfilteredForInLoop
		Object.defineProperty(object, key, desc);
	}
}

class ArrayQueue {
    constructor() {
        this.size = 0;
        this._head = 0;
        this._items = [];
    }
    emptyp() {
        return this.size===0;
    }
    push(value) {
        this._items.push(value);
        return ++this.size;
    }
    shift() {
        if (this.size) {
            var value = this._items[this._head];
            if (this._head === QUEUE_COMPACT_SIZE) {
                this._items = this._items.slice(this._head + 1);
                this._head = 0;
                this.size--;
            } else {
                this._items[this._head++] = MISSING;
            }
            return value;
        }
    }
    clear() {
        this.size = 0;
        this._head = 0;
        this._items.length = 0;
    }
    forEach(callback, thisArg) {
        if (this.size) {
            for (var i = this._head, index = 0; i < this._items.length; i++) {
                var value = this._items[i];
                if (value !== MISSING) {
                    callback.call(thisArg, value, index++, this);
                }
            }
        }
    }
}

class Stack {
    constructor () {
        var functionSet=(function() {
            var _elements=[]; // creating a private array
            return [
                // push function
                function()
                { return _elements.push .apply(_elements,arguments); }
                // pop function
                , function()
                { return _elements.pop .apply(_elements,arguments); }
                , function() { return _elements.length; }
                , function(n) { return _elements.length=n; }
                , function () {
                    return _elements[_elements.length-1];
                }
                , function (e) {
                    return _elements.includes(e);
                }
                , function () { return _elements;}];
        })();
        this.push=functionSet[0];
        this.pop=functionSet[1];
        this.getLength=functionSet[2];
        this.setLength=functionSet[3];
        this.peek=functionSet[4];
        this.includes=functionSet[5];
        this.elts=functionSet[6];
        // initializing the stack with given arguments
        this.push.apply(this,arguments);
    }
}

// --- utilities ---

Array.prototype.somex = function (test) {
	for (let [eltx, elt] of this.entries()) {
		let res = test(eltx, elt);
		if (res) {
			return res;
		}
	}
	return null;
};


// --- the keys to dependency identification
var causation = new Stack();
var callStack = new Stack();
var depender = null;

var gNotToBe = false; // --- am I in the process of leaving the model?

// --- debug stuff ----------------
var gCPropDepth = 0;
var gCDebug = false;
var gStop = false; // emergency brake

// --- the clock behind integrity ------
var ppulse = 0;
function gpulse() {
	// todo see if this functional accessor is necessary
	return ppulse;
}


var gPar = null; // set up by cKids for use in Model constructor

var onePulsep = false;
var dpLogp = false;

function dataPulseNext(who = 'anon') {
	//clg('datapulsenext entry', who, ppulse);
	if ( !onePulsep ) {
		if ( dpLogp ) {
			clg(`dpnext ${who}`);
		}
		ppulse = ppulse+1;
		//clg(`ppulse now ${ppulse}`);
	}
	//clg(`pulseNext exits ${ppulse}`);
	return ppulse;
}

// --- library init/re-init during development

function cellsReset(options = {}) {
	gCDebug = options.debug;
	clientQHandler = options.clientQHandler;
	cellsInit();
}
function cellsInit () {
	//clg('initcells');
	ppulse = 0;
}

// --- data integrity mechanics in which state change is
// carefully choreographed

var deferChanges = false;
var clientQHandler = null;
var gCustomPropagator = null;
var gWithinIntegrity = false;
var gSlotObserver = {}; //keys will be slot (aka property) names

function gSlotObserverDef (slot, obs) {
	let xo = gSlotObserver[slot];
	if (xo) {
		clg(`gSlotObserverDef overwriting $(slot) observer`);
	}
	gSlotObserver[slot] = obs;
}
const qNotify = new ArrayQueue();
const qAwaken = new ArrayQueue();
window['qAwaken'] = qAwaken;
const qClient = new ArrayQueue();
const qEphemReset = new ArrayQueue();
const qChange = new ArrayQueue();

function ufbAdd( q, task) {
	q.push( task);
}

/// --- the integrity API ---------

function withoutCDependency(fn) {
	return c=>{ let sd = depender;
		depender = null;
		try {
			return fn(c);
		} finally {
			depender = sd;
		}
	};
}

// var callstack; todo oops. FNYI?

function withoutIntegrity (fn) {
	let wi = gWithinIntegrity
		, dc = deferChanges
		//, cs = callstack
	// ;

	try {
		gWithinIntegrity = false;
		deferChanges = false;
		// callstack = new Stack();
		fn();
	} finally {
		gWithinIntegrity = wi;
		deferChanges = dc;
		// callStack = cs;
	}
}

/*

 Here for the reader's convenience is the specification of data integrity from the
 "Cells Manifesto" blog post. Aside: when we read about "glitches" in reactive systems,
 these are the constraints those systems fail to satisfy. Note that their proposed
 fix of a topological sort of the depedency DAG is not possible when dependencies
 arise dynamically (and not identifying dependencies dynamically also violates these
 constraints by recomputing values not dependent on a change).

 Data Integrity
 --------------
 When application code assigns to some input cell X, the Cells engine guarantees:

 - recomputation exactly once of all and only state affected by the change to X, directly
 or indirectly through some intermediate datapoint. note that if A depends on B, and B depends on X,
 when B gets recalculated it may come up with the same value as before. In this case A is not
 considered to have been affected by the change to X and will not be recomputed.

 - recomputations, when they read other datapoints, must see only values current with
 the new value of X. Example: if A depends on B and X, and B depends on X, when X changes
 and A reads B to compute a new value, B must return a value recomputed from the new value of X.

 - similarly, client observer callbacks must see only values current with the new value of X; and...

 - a corollary: should a client observer SETF a datapoint Y, all the above must happen with
 values current with not just X, but also with the value of Y /prior/ to the change to Y.

 - Deferred "client" code must see only values current with X and not any values current with
 some subsequent change to Y queued by an observer.

 */

// Key block #1 of Cells data integrity, defined above

function withIntegrity (queue, deferInfo, action) {
	if (gStop) return;

	if (gWithinIntegrity) {
		if (queue) {
			ufbAdd(queue, [deferInfo, action]);
			/*
			 assignment is supposed to return the value being installed
			 in the place, but if the SETF is deferred we return
			 something that will help someone who tries to use
			 the setf'ed value figure out what is going on:
			 */
			return 'deferred-to-ufb';
		} else {
			/*
			 So by not supplying a queue one can get something
			 executed immediately, potentially breaking data integrity
			 but signifying by having coded with-integrity
			 that one is aware of this. If you have read this comment.
			 */
			action(queue, deferInfo);
		}
	} else {
		let wi = gWithinIntegrity
			, dc = deferChanges;

		gWithinIntegrity = true;
		deferChanges = false;
		try {
			if ((!gpulse()) || queue === qChange) {
				dataPulseNext('cwi');
			}
			let result = action(queue, deferInfo);
			finBiz(qNotify);
			return result;
		} finally {
			gWithinIntegrity = wi;
			deferChanges = dc;
		}
	}
}
window['withIntegrity'] = withIntegrity;

function withChg(id, fn) {
	withIntegrity( qChange, id, fn);
}
window['withChg'] = withChg;

// Key block #2 of Cells data integrity, define above

function finBiz (q) { // short for "finish (unfinished) business"
	while (q)
		switch (q) {
			case qNotify:
				// top-level assignment to an "input" Cell enqueues it for notification
				// and then invokes "finish business", meaning "notify all direct dependents
				// and deal with observer side-effects and cascading changes from recalculation
				// of dependents".

				qDo('notify', q);
				// the notified rules may produce new Model instances
				// within the larger Model universe; we need to bring
				// those into play gracefully and ASAP.

				qDo('awaken', qAwaken);

				// now we check to see if a notified rule produced
				// its own new value of which dependent must be notified.

				q = qNotify.emptyp() ? qClient : qNotify;
				break;

			case qClient:
				(clientQHandler || qDo)('client', q);
				q = qClient.emptyp() ? qEphemReset : qClient;
				break;

			case qEphemReset:
				// at this point the state change has been fully processed
				// so we are free to silently* evert ephemerals to nil.
				// * Without notifying dependents or observing the change to nil.

				qDo( 'reset empheral', q);
				q = qChange;
				break;

			case qChange:
				// observers (kicked off as part of notify) are free to
				// make changes to the model, but to preserve integrity
				// they must (well, we offer an "all bets off" back door)
				// enqueue those changes for execution after the original
				// change has fully propagated.
				//
				// Here is where we kick those off (one at a time):

				let work = q.shift();
				if (work) {
					let [info, taskfn] = work;
					dataPulseNext('change');
					taskfn('change', info);
					q = qNotify;
				} else {
					q = null;
				}
				break;

			default:
				throw 'finBiz sees invalid q: '+ q.toString();
		}
}

function qDo (opcode, q) {
	q.forEach( taskInfo => {
		let [deferInfo, task] = taskInfo;
	task( opcode, deferInfo);})
	q.clear();
}


// --- internal Cell states
const kUnbound = Symbol("unbound");

const kUncurrent = "uncurrent";
const kValid = "valid";
const kAwake = "c-awake";
const kQuiesced = "c-quiesced";
const kNascent = "nascent";
const kOptimizedAwayp = "optimized-away";
const kOptimizeWhenValued = "optimize-when-valued";

// lazy options
const kOnceAsked = "lazy-once-asked";
const kUntilAsked = "lazy-until-asked";
const kAlways ="lazy-always";

// other k's
const kObserverUnresolved = 'kObserverUnresolved';

// --- Cells ----------------------

class Cell {
	constructor(value, formula, inputp, ephemeralp, observer, name = "anon", optiWhen = !inputp) {
	    this.name = name;
		this.md = null; //when we get to Model, this will be the model of which I am an attribute
		this.pulse = -1;
		this.pulseLastChanged = -1;
		this.pulseObserved = -1;
		this.lazy = null; // not a predicate (can hold, inter alia, :until-asked)
		this.callers = new Set();
		this.useds = new Set(); // formulas only
		this.ephemeralp = ephemeralp;
		this.inputp = inputp;
		this.observer = observer;
		this.optimize = optiWhen;
		this.quiesceWith = null;
		this.slotOwning = false; // todo uhoh
		// todo FNYI this.unchangedTest = function(a,b) { return a===b;};
		this.synapticp = false; // todo FNYI
		// todo FNYI this.unchangedIf = function(a, b) { this.unchangedTest( a, b)};

		if (formula) {
			this.rule = formula;
			this.pv = kUnbound;
			this.state = kNascent;
			this.others = {}; // once a rule finds another model (see Model)
			// it can optionally save it here for the next evaluation.
			// That all happens in Cell.fm.
		} else {
			this.pv = value;
			this.state = kValid;
		}
		Object.defineProperty(this
			, 'v', {
				enumerable: true
				, get: this.slotValue
				, set: this.slotValueSet

			});
	}
	mx() { return this.md}

	optimizedAwayp() {return this.state===kOptimizedAwayp;}
	unboundp() {return this.pv===kUnbound;}
	uncurrentp() {return this.pv===kUncurrent;}
	validp() {return !(this.unboundp() || this.uncurrentp());}
	valueState() {
		return this.unboundp() ?
			kUnbound : this.uncurrentp() ? kUncurrent : kValid;
	}
	valueChangedp (newv,oldv) {
		/*let uct = (this.unchangedIf || this.unchangedTest);
		ast(uct, 'unchanged test required');
		return !uct(newv, oldv);*/
		return newv !== oldv;
	}
	currentp() {
		//clg(`currentp this pulse ${this.pulse} vs pulse ${gpulse()}`);
		return this.pulse >= gpulse();
	}
	pulseUpdate(key='anon') {
		if (!this.optimizedAwayp()) {
			ast(gpulse() >= this.pulse);
			this.pulse = gpulse();
		}
	}
	awaken() {
	    if (this.rule) {
			if (!this.currentp()) {
				//clg(`calcnset ${this.name} of ${this.md.name}`);
				this.calcNSet('c-awaken');
			}
		} else {
			//clg('awk pulses', gpulse(),this.pulseObserved);
			if (gpulse() > this.pulseObserved) {
				//clg('awakenin obs!!!',this.name);
				this.observe(kUnbound,'awaken');
				this.ephemeralReset();
			}
		}
	} // --- coming to life JIT or forced

	// Key block #4 of data integrity defined above. Reading and
	// writing properties ("slot" reflects the Lisp genetics") gets
	// fed into the Cells machinery. Both these functions are reached
	// transparently thanks to Object.define_property custom getters
	// and setters in the Model class.
	//
	// --- the offical slot access API -----------
	//
	slotValue() {
		let rv = undefined
			, self = this;

		withIntegrity(null,null, function () {
			let vPrior = self.pv;
			rv = self.ensureValueIsCurrent( 'c-read', null);
			//clg('evic said',rv.toString());
			if (!self.md && self.state === kNascent
				&& gpulse() > self.pulseObserved) {
				self.state = kAwake;
				self.observe(vPrior, 'cget');
				self.ephemeralReset();
			}
		});
		if (depender) {
			depender.recordDependency(this);
		}
		return rv;
	}
	slotValueSet(newv) {
	    if (deferChanges) {
	        debugger;
			throw `Assign to ${this.name} must be deferred by wrapping it in WITH-INTEGRITY`;
		} else if (find(this.lazy, [kOnceAsked, kAlways, true])) {
			this.valueAssume(newv, null);
		} else {
	        //clg('svset', this.name, newv);
			withChg(this.name, ()=>{
				this.valueAssume( newv, null);
			});
		}
	}

	// --- dependency graph maintenance ----
	recordDependency(used) {
		if (!used.optimizedAwayp()) {
			//clg(`recdep ${this.name} usedby ${used.name}`);
			this.useds.add(used);
			ast(this.useds.size>0);
			used.callerEnsure(this);
		}
	}
	callerEnsure(caller) {
		//clg('addcaller', this.name, this.md? this.md.dbg():'nomd', caller.name, caller.md? caller.md.dbg():'nomd');
		this.callers.add(caller);
	}
	callerDrop(caller) {
		//clg(`dropping!! caller ${caller.name} of ${this.name}`);
		this.callers.delete(caller);
	}

	// Key block #3 of code essential to data integrity (defined above)
	// The trick is not to use an obsolete value because it too needs to be
	// recalculated but our rule re-evaluation happened to get kicked off
	// first (and we will be accessing this value for the first time thanks
	// to conditional branching so a pre-propagation sort would not find the
	// upcoming obsolete usage).
	//
	// We recursively descend *known* dependencies and ensure they are current
	// before proceeding with the rule iff any have changed. Anything we encounter
	// anew will ensure JIT that it itself is current before returning a value.
	//
	// An increasing integer global "pulse" determines currency, with each
	// formulaic Cell keeping track of the pulse with which it is current.

	ensureValueIsCurrent(tag, ensurer) {
		//clg('evic entry ', this.name);
		if (gNotToBe) {
			//clg('not2be');
			return this.validp() ? this.pv : null;
		} else if (this.currentp()) {
			//clg('currentp',this.pulse,gpulse());
			return this.pv;
		} else if (this.inputp
			&& this.validp()
			&& !(this.rule
				&& this.optimize === kOptimizeWhenValued // todo FNYI
				&& this.pv===null)) {
			//clg('inputp', this.name);
			return this.pv;
		} else if (this.md && this.md.mDeadp()) {
			throw `evic: read of dead ${this.name} of ${this.md.name}`;
		} else {
			let recalc = false;
			if (!this.validp()) {
				//clg('evic not validp');
				recalc = true;
			} else {
				for (let used of this.useds.values()) {
					used.ensureValueIsCurrent('nested', this);
					if (used.pulseLastChanged > this.pulse) {
						recalc = true;
						break;
					}
				}
			}
			if (recalc) {
				if (!this.currentp()) {
					// possible if a used's observer queried me
					//clg('calcnset!!', this.name);
					this.calcNSet('evic', ensurer);
					//clg('cnset left', this.pv.toString())
				} //else clg('late currentp');
				return this.pv;
			} else {
				//clg('valid uninfluenced', this.name);
				this.pulseUpdate('valid-uninfluence');
				return this.pv;
			}
		}
	}
	calcNSet(dbgId, dbgData = {}) {
		//  Calculate, link, record, and propagate.
		if (callStack.includes(this)) {
			let elts = callStack.elts();
			clg(`cyclic dependency: about to calculate ${this.name} already calculating`);
			/*elts.forEach(c=>{
			 clg(`stack c ${c.name} of md ${c.md.name}`);
			 });
			 console.trace();
			throw 'cyclic dependency detected. see console for deets';*/
			debugger;
		}
		let rawValue = this.calcNLink();
		clbug(this,'rawval', rawValue);

		if (!this.optimizedAwayp()) {
			/*
			 this check for optimized-away? arose because a rule using without-c-dependency
			 can be re-entered unnoticed since that clears *call-stack*. If re-entered, a subsequent
			 re-exit will be of an optimized away cell, which will have been assumed
			 as part of the opti-away processing.
			 */
			clbug(this,'assuming ', rawValue, this.useds.size);
			return this.valueAssume(rawValue, null);
		}
	}
	calcNLink() {
		/* The name is accurate: we do no more than invoke the
		 rule of a formula and return its value, but along the
		 way the links between dependencies and dependents get
		 determined anew. */
		let dp = depender
			, dc = deferChanges;

		depender = this;
		deferChanges = true;

		try {
			callStack.push(this);
			this.unlinkFromUsed('pre-rule-clear');
			//clg(`calling ${this.name} rule with md ${this.md} `+this.rule.toString());
			return this.rule(this);
		} finally {
			callStack.pop();
			depender = dp;
			deferChanges = dc;
		}
	}

	// --- state changes, from external assign or recalculation
	valueAssume( newValue, propCode) {
		let self = this;

		withoutCDependency(()=>{
			let priorValue = self.pv
			, priorState = self.valueState();

            self.pv = newValue;
            self.state = kAwake;
            if (self.md && !self.synapticp) {
                mdSlotValueStore( self.md, self.name, newValue);
            }
            self.pulseUpdate('sv-assume');
            if (propCode==='propagate'
                || [kValid,kUncurrent].indexOf(priorState) === -1
                || self.valueChangedp( newValue, priorValue)) {
                let optimize = self.rule ? self.optimize : null;
                if (optimize === kOptimizeWhenValued) {
                    if (self.pv) {
                        self.unlinkFromUsed('opti-when');
                        this.optimizeAwayMaybe(priorValue);
                    }
                } else if (optimize) {
                    self.optimizeAwayMaybe(priorValue);
                }

                if (!(propCode === 'no-propagate'
                    || self.optimizedAwayp())) {
                    self.propagate(priorValue, self.callers);
                }
            }
	    })();
		return newValue;
	}
	propagate(vPrior, callers) {
		// might not need to pass in callers
		if (onePulsep) {
			if (gCustomPropagator) {
				gCustomPropagator(this, vPrior);
			}
		} else {
			this.pulseLastChanged = gpulse();
			let dp = depender
				, cs = callStack
				, pd = gCPropDepth
				, dc = deferChanges;
			try {
				/*if (vPrior && this.slotOwning) {
					// todo OMG call not-to-be on those lost
				}*/
				this.propagateToCallers( callers);
				if (gpulse() > this.pulseObserved
					|| find(this.lazy, [kOnceAsked, kAlways,true])) {
					this.observe(vPrior,'propagate');
				}
				this.ephemeralReset();
			} finally {
				depender = dp;
				callStack = cs;
				gCPropDepth = pd;
				deferChanges = dc;
			}
		}
	}
	propagateToCallers(callers) {
		if (callers.size) {
			let c = this;
			withIntegrity(qNotify, c, ()=> {
				causation.push(c); // this was (kinda) outside withIntegrity
			try {
				for (let caller of callers.values()) {
					//clg('caller lazy '+ caller.lazy.toString());
					//clg('caller pv '+ caller.pv.toString());
					//clg('caller pulse/pulse ', caller.pulse, gpulse());
					if (!(caller.state === kQuiesced
						|| caller.currentp()
						|| find(caller.lazy, [true, kAlways,kOnceAsked])
						|| !caller.useds.has(c))) {
						//clg('calcing eager '+caller.lazy);
						caller.calcNSet('propagate');
					}
				}
			} finally {
				causation.pop();
			}
		});
		}
	}

	// --- the model alters the outside world (or itself, if necessary) ---
	observerResolve () {
		if (!this.observer && this.md) { // The Model class
			this.observer = this.md.slotObserverResolve(this.name);
		}
		return this.observer===kObserverUnresolved ? null : this.observer;
	}
	observe( vPrior, tag) {
		//clg('observe entry', this.name, vPrior.toString());
		let obs = this.observerResolve();


		if (obs) {
			obs(this.name, this.md, this.pv, vPrior, this);
		}
	}

	// --- ephemerals are for event "state" ----
	ephemeralReset() {
		if (this.ephemeralp) { // tolerate calls on non-ephp
			/*
			 we defer resetting ephemerals because everything
			 else gets deferred and we must not in fact reset it until
			 within finBiz we are sure all callers have been recalculated
			 and all observers completed (which happens with recalc).
			 */
			let self = this;
			withIntegrity( qEphemReset, this, function () {
				self.pv = null;
			});
		}
	}

	// --- housekeeping
	unlinkFromUsed(why) {
		for (let used of this.useds.values()) {
			//clg(`${this.name} unlinks fromused dueto ${why}`);
			used.callerDrop(this);
		}
		this.useds.clear();
	}
	mdCellFlush(){
		// todo are we doing this?
		//        if (this.md) {
		//            this.md.cellsFlushed.push([this.name, this.pulseObserved]);
		//        }
	}

	optimizeAwayMaybe(vPrior) {
		if (this.rule
			&& !this.useds.size
			&& this.optimize
			&& !this.optimizedAwayp()
			&& this.validp()
			&& !this.synapticp
			&& !this.inputp) {
			//clg(`opti-away!!! ${this.name}`);
			this.state = kOptimizedAwayp;
			this.observe( vPrior, 'optimized-away');
			if (this.md) {
				this.mdCellFlush();
				// todo install value as constant
			}
			for (let caller of this.callers.values()) {
				this.callerDrop(caller);
				// ouch: next seems like a category error
				caller.ensureValueIsCurrent( 'opti-used', this); // really?
			}
		}
	}

	// todo test not-to-be, quiesce, opti-away, etc
	quiesce() {
		if (this.quiesceWith) {
			clg('quiescing!');
			this.quiesceWith(this);
		}
        this.unlinkFromCallers();
        this.unlinkFromUsed('quiesce');
    }

    unlinkFromCallers() {
	    this.state = kUncurrent;
        for (let caller of this.callers.values()) {
            //clg(`${this.name} unlinks fromused dueto ${why}`);
            this.callerDrop(caller);
        }
        this.callers.clear();
    }

	// ---------- next we offer support for the ever important Family concept -------------------

	kidValuesKids( ) {
		let c = this, md=c.md;
		// "x" prefix throughout this function means "existing"
		let xKid = (c.pv === kUnbound? [] : c.pv); // pv = "prior value", ie prior formula calculation (to-do items)

		if (md.kidValues.length > aDistinct( md.kidValues).length) {
			throw 'Duplicate IDs not allowed in kidValues: '+ md.kidValues.join();
		}
		return md.kidValues.map( kidValue => {
				let xIndex = xKid.findIndex(xk => c.md.kidKey(xk) === kidValue);
				//clg(`kidvalue ${kidValue} will be ${xIndex === -1 ? 'built new' : 'reused'}`);
				return (xIndex === -1) ? md.kidFactory(c, kidValue) : xKid[xIndex];
			})
	}

	fm (what, how, key) { // short for "find model"
		if (!what) return;

		if (!this.md) throw `Family search attempted from Cell ${this} lacking md (s/b a Model)`;
		return this.md.fm( what, how, key);
	}
	fmUp (what,how,key) {
		if (!this.md) throw `fmUp search attempted from Cell ${this} lacking md (s/b a Model)`;
		return this.md.fmUp( what, how, key);
	}
	fmDown (what, key, how) {
		if (!this.md) throw `fmDown search attempted from Cell ${this} lacking md (s/b a Model)`;
		return this.md.fmDown( what, how, key);
	}
}

function aDistinct( a) {
    return a.filter((v, i, a) => a.indexOf(v) === i);
}

window['Cell'] = Cell; // <-- Constructor
Cell.prototype['mx'] = Cell.prototype.mx;

function mdSlotValueStore( me, slotName, value) {
	// me[slotName] = value; vestigial? todo clean up if so
}

function clbug( c, ...args) {
    if ( c.bug ) {
        console.log("clbug> "+c.name+":"+c.useds.size+":"+Array.from(args).join(","));
    }
}

// --- some handy cell factories -------------------

function cF(formula, options = {}) {
	// make a conventional formula cell
	return Object.assign( new Cell(null, formula, false, false, null), options);
}
window['cF'] = cF;

// todo get consistent with all cMakers accepting options
// todo validate options against, eg, ephmeralp

function cF1(formula, options={}) {
	return Object.assign( new Cell(null
			, (c)=>{
			return withoutCDependency(formula)(c);
        }
, false, false, null)
, options);
}
function cF_(formula, options={}) {
	// standard input cell
	return Object.assign(new Cell(null, formula, false, false, null)
		, {lazy: true}
		, options);
}
function c_F(formula, options={}) {
	// standard input cell
	return Object.assign(new Cell(null, formula, false, false, null)
		, {lazy: kUntilAsked}
		, options);
}
function cFI(formula, options={}) {
	/*
	 make a cell whose formula runs once for
	 its initial value but then is set procedurally
	 as an input cell.
	 */
	//return new Cell(null, formula, true, false, null);
    return Object.assign(new Cell(null, formula, true, false, null), options);
}
window['cFI'] = cFI;
function cI(value, options={}) {
	// standard input cell
	return Object.assign(new Cell(value, null, true, false, null)
		, options);
}
window['cI'] = cI;
function cIe(value, options={}) {
	// ephemeral input cell
	return Object.assign(new Cell(value, null, true, true, null), options);
}
function obsDbg (name, me, newv, priorv, c) {
	console.log(`obsDbg! ${name} ${me? me.name||me.id : 'noMd'} useds=${c.useds.size} new=${newv} prior=${priorv===kUnbound?'unbound':priorv}`);
//    console.log(`OBS: ${name} now ${newv} (was ${priorv})`);
}
function XobsDbg (name, me, newv, priorv, c) {
	// handy way to hush obsDbg until sure not needed
}

