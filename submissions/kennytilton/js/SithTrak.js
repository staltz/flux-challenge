goog.require('Matrix.Cells');
goog.require('Matrix.Model');
goog.require('Matrix.mxWeb');
goog.require('Matrix.mxXHR');

const SLOT_CT = 5;

class Sith extends Model {
    constructor( app, sithId) {
        super(app, "sith-"+sithId,
            {
                sithId: sithId
                , lookup: cF(c => {
                    if (c.md.info) {
                        // forget everything if we have the info already
                        return null
                    } else if ( c.md.par.withObi) {
                        // Obi is with a displayed Sith, abort all requests (spec silliness)
                        // abort any existing lookup
                        if (c.pv !==kUnbound && c.pv && c.pv.xhr && c.pv.xhr.isActive()) {
                            clg('aborting lookup!!', c.md.sithId)
                            c.pv.xhr.abort()
                        }
                        return null
                    } else {
                        return new mxXHR("http://localhost:3000/dark-jedis/" + c.md.sithId
                            , {
                                send: true, delay: 0, responseType: 'json'
                                , okHandler: (s, xhr, response) => {
                                    // we have to imperatively set the info because deriving it
                                    // formulaically would be cyclic:
                                    //   info <- lookup <- withObi <- info.homeworld
                                    if ( !c.md.par.withObi) // spec silliness
                                        c.md.info = response
                                }
                            })
                    }
                })
                , info: cI( null, { observer: obsSithInfo})
                , withObi: cF(c => app.obiLoc
                                    && c.md.info
                                    && (c.md.info.homeworld.name === app.obiLoc.name))
                })
    }
}

var sithApp = null;

function obsSithInfo ( slot, sith, info) {
    if (!info) return;

    let masterId = info.master && info.master.id
        , apprenticeId = info.apprentice && info.apprentice.id;

    if (masterId || apprenticeId) {
        let currentIds = sith.par.sithIds
            , myx = sith.par.sithIds.indexOf(sith.sithId)

        if ( myx !== -1) {
            currentIds = sithInject( masterId, currentIds, myx - 1)
            currentIds = sithInject( apprenticeId, currentIds, myx + 1)
            // somewhat cute: if no sithInject call returned a copy,
            // these two will be the same and be a NOP in the Cells engine
            sith.par.sithIds = currentIds
        }
    }
}

function sithInject ( id, siths, idx) {
    if (id && idx >= 0 && idx < SLOT_CT && siths[idx] !== id) {
        newIds = siths.slice()
        newIds[idx] = id
        return newIds
    } else {
        return siths
    }
}

// --- SithTrak (main) ------------------------------------------------------

function SithTrak() {
    sithApp = new TagSession(null, 'SithTrakSession',
        { // --- Obi-tracking -------------------------------------
            obiTrakker: cF(c => new WebSocket('ws://localhost:4000')
                .onmessage = msg => c.md.obiLoc = JSON.parse(msg.data))
            , obiLoc: cI(null)

            // --- Sith loading -------------------------------------
            , sithIds: cI([null, null, 3616, null, null])
            , siths: cF(c => c.md.sithIds.map(id => {
            if ( id ) {
                let curr = (c.pv === kUnbound? [] : c.pv)
                    , s = curr.find(s => s && s.sithId === id)
                return s || new Sith( c.md, id)
            } else return null;
        }), { name: 'sithsObs', observer: obsSithAbortLost})
            , withObi: cF(c => c.md.siths.some( s => s && s.withObi))})

    return div({class: "app-container"},
        h1({
            class: "css-planet-monitor",
            content: cF(c => "Obi-Wan currently on " + (sithApp.obiLoc ? sithApp.obiLoc.name : "...dunno"))
        })

        , section({class: "css-scrollable-list"},
            ul({class: "css-slots"}
                , { name: "sith-list"}
                , c=> range( SLOT_CT).map( slotN => sithView( slotN)))
            , div(
                {
                    class: "css-scroll-buttons"
                    , disabled: cF( c=> {
                        ast(sithApp);
                        return sithApp.withObi
                    })
                }
                , scrollerUpButton()
                , scrollerDownButton()))
        )
}

window['SithTrak'] = SithTrak;

function obsSithAbortLost( slot, app, newv, oldv) {
    if (oldv === kUnbound) return

    oldv.map(s => {
        if (s && newv.indexOf(s) === -1) {
            if (s.lookup && s.lookup.xhr) {
                if (s.lookup.xhr.isActive()) {
                    s.lookup.xhr.abort()
                }
            }
        }
    })
}

// --- scrolling --------------------------------------------------

function scrollerUpButton() {
    return scrollerButton('up', 'master', 0
        , md => {
            let s = sithApp.siths[0]
                , mId = s && s.info && s.info.master && s.info.master.id
            sithApp.sithIds = [null, mId].concat(sithApp.sithIds.slice(0,3))
        })
}

function scrollerDownButton() {
    return scrollerButton('down', 'apprentice', SLOT_CT - 1
        , md => {
            let s = sithApp.siths[SLOT_CT - 1]
                , appId = s && s.info && s.info.apprentice && s.info.apprentice.id
            sithApp.sithIds = sithApp.sithIds.slice(2).concat([appId, null])
        })
}

function scrollerButton( dir, otherProp, otherSlot, onClickFn) {
    return button({
        class: cF(c => "css-button-" + dir + (c.md.disabled ? " css-button-disabled" : ""))
        , onclick: onClickFn
        , disabled: cF(c => {
            if (c.md.par.disabled) {
                return true
            } else {
                let keyS = sithApp.siths[otherSlot];
                if (keyS && keyS.info && keyS.info[otherProp]) {
                    return keyS.info[otherProp].id === null
                } else {
                    return true
                }
            }
        })
    })
}

// --- sith View ---------------------------------------------------

function sithView( slotN) {
    let sithInfo = (slotN) => sithApp.siths[slotN] && sithApp.siths[slotN].info

    return li(
        {
            class: "css-slot",
            style: cF(c => {
                let sith = sithApp.siths[slotN]
                return (sith && sith.withObi) ? "color:red" : null
            })
        },
        h3({content: cF(c => (i = sithInfo(slotN)) ? i.name : "")}),
        h6({content: cF(c => (i = sithInfo(slotN)) ? i.homeworld.name : "")}));
}