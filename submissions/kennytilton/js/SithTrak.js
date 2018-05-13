goog.require('Matrix.Cells');
goog.require('Matrix.Model');
goog.require('Matrix.mxWeb');
goog.require('Matrix.mxXHR');

const SLOT_CT = 5;

class Sith extends Model {
    constructor( app, sithId) {
        ast( sithId)
        super(app, "sith-"+sithId, Object.assign(
            {
                sithId: sithId
                , lookup: cF(c => {
                clg('lookup!', c.md.sithId)
                return new mxXHR("http://localhost:3000/dark-jedis/" + c.md.sithId)
            })
                , info: cF( c => (c.md.lookup ? c.md.lookup.okResult : null)
                            , { observer: obsSithInfo})

                , withObi: cF(c => c.md.info
                && app.obiLoc
                && (c.md.info.homeworld.name === app.obiLoc.name))
            }))
    }
}

var sithApp = null;

function obsSithInfo ( slot, sith, info) {
    if (!info) return;

    let masterId = info.master && info.master.id
        , apprenticeId = info.apprentice && info.apprentice.id;

    if (!(masterId || apprenticeId)) return

    let newIds = null
        , myx = sith.par.sithIds.indexOf(sith.sithId)

    if ( myx === -1) return

    if (masterId && myx > 0
        && sith.par.sithIds[myx-1] !== masterId) {
            newIds = sith.par.sithIds.slice()
            newIds[ myx-1] = masterId
    }

    if (apprenticeId && myx + 1 < SLOT_CT
        && sith.par.sithIds[myx+1] !== apprenticeId) {
            newIds = newIds || sith.par.sithIds.slice()
            newIds[ myx+1] = apprenticeId
    }

    if (newIds) {
        sith.par.sithIds = newIds
    }
}

// --- SithTrak (main) ------------------------------------------------------

function SithTrak() {
    let dbg = 2;
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
                    }
                }))})

    return div({class: "app-container"},
        h1({
            class: "css-planet-monitor",
            content: cF(c => "Obi-Wan currently on " + (sithApp.obiLoc ? sithApp.obiLoc.name : "...dunno"))
        })

        , section({class: "css-scrollable-list"},
            ul({class: "css-slots"}
                , {
                    name: "sith-list",

                    next_up: cF(c => (c.md.kids[0] && c.md.kids[0].info) ?
                        c.md.kids[0].info.master.id : null),
                    next_down: cF(c => {
                        let last = c.md.kids[SLOT_CT - 1];
                        return (last && last.info) ?
                            last.info.apprentice.id : null;
                    })
                }
                , c=> {
                    let sv = [];
                    for (n = 0; n < SLOT_CT; ++n) {
                        sv.push( sithView(n))
                    }
                    return sv})
            , div({
                    class: "css-scroll-buttons",
                    disabled: cF(c => sithApp.siths.some( s => s && s.withObi))
                },
                scrollerUpButton(),
                scrollerDownButton()))
    )
}

window['SithTrak'] = SithTrak;


function scrollerUpButton() {
    return button({
        class: cF(c => "css-button-up" + (c.md.disabled ? " css-button-disabled" : ""))
        , onclick: md => {
            let mId = sithApp.siths[0].info.master.id
            sithApp.sithIds = [null, mId].concat(sithApp.sithIds.slice(0,3))
        }
        , disabled: cF(c => {
            if (c.md.par.disabled) {
                return true
            } else {
                let keyS = sithApp.siths[0];
                if (keyS && keyS.info) {
                    clg('info ok: app', keyS.info.master)
                    if (keyS.info.master)
                        return keyS.info.master.id === null
                } else {
                    return true
                }
            }

        })
    })
}

function scrollerDownButton() {
    return button({
        class: cF(c => "css-button-down" + (c.md.disabled ? " css-button-disabled" : ""))
        , onclick: md => {
            let appId = sithApp.siths[SLOT_CT-1].info.apprentice.id
            sithApp.sithIds = sithApp.sithIds.slice(2).concat([appId,null])
        }
        , disabled: cF(c => {
            if (c.md.par.disabled) {
                return true
            } else {
                let keyS = sithApp.siths[SLOT_CT-1];
                if (keyS && keyS.info) {
                    clg('info ok: app', keyS.info.apprentice)
                    if (keyS.info.apprentice)
                        return keyS.info.apprentice.id === null
                } else {
                    return true
                }
            }

        })
    })
}

function sithInfo (slotN) {
    let sith = sithApp.siths[slotN]
    return sith && sith.info
}

function sithView( slotN) {
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