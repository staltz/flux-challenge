goog.require('Matrix.Cells');
goog.require('Matrix.Model');
goog.require('Matrix.mxWeb');
goog.require('Matrix.mxXHR');

const SLOT_CT = 5;

class Sith extends Model {
    constructor( app, sithId) {
        ast( sithId)
        super(app, "sith-"+sithId,
            {
                sithId: sithId
                , lookup: cF(c => {
                    return new mxXHR("http://localhost:3000/dark-jedis/" + c.md.sithId)
                })
                , info: cF( c => (c.md.lookup ? c.md.lookup.okResult : null)
                , { observer: obsSithInfo})

                , withObi: cF(c => c.md.info
                && app.obiLoc
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
        let newIds = null
            , myx = sith.par.sithIds.indexOf(sith.sithId)

        if ( myx !== -1) {

            if (masterId && myx > 0 && sith.par.sithIds[myx - 1] !== masterId) {
                newIds = sith.par.sithIds.slice()
                newIds[myx - 1] = masterId
            }

            if (apprenticeId && myx + 1 < SLOT_CT && sith.par.sithIds[myx + 1] !== apprenticeId) {
                newIds = newIds || sith.par.sithIds.slice()
                newIds[myx + 1] = apprenticeId
            }

            if (newIds) {
                sith.par.sithIds = newIds
            }
        }
    }
}

// --- SithTrak (main) ------------------------------------------------------

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
                }), { name: 'sithsObs', observer: obsSithAbortLost})})

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
                    , disabled: cF(c => sithApp.siths.some( s => s && s.withObi))
                },
                scrollerUpButton(),
                scrollerDownButton()))
    )
}

window['SithTrak'] = SithTrak;

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