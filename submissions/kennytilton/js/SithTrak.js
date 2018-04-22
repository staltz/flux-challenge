
const SLOT_CT = 5;

const sithApp = new TagSession( null, 'SithTrakSession',
    {
        obiTrak: cF( c => new WebSocket('ws://localhost:4000').onmessage = (msg) => {
            c.md.obiLoc = JSON.parse(msg.data);
        }),

        obiLoc: cI( null, {observer: (name, me, newv)=> {
            if (newv) {
                // clg('obiLoc now on', newv.id, newv.name);
            }
        }}),

        sithIds: cI([3616,-1,-1,-1,-1]),

        siths: cF( c=> {
            let curr = c.pv;
            return c.md.sithIds.map( sithId=> {
                if (sithId === -1) {
                    return null;
                }
                let s = (curr !== kUnbound && curr.find( sith => (sith && sith.sithId === sithId)));
                if ( !s )
                    clg('building new sith!!!!!!'
                        , sithId
                        , curr !== kUnbound? curr.map( s=> s? s.sithId:-1):null);
                return s || mkm( null, 'Sith', {
                    sithId: sithId,
                    lookup: cF( c=> new mxXHR( "http://localhost:3000/dark-jedis/"+sithId)),
                    info: cF( c=> c.md.lookup.okResult,
                        {observer: function( n, mx, i) {
                            if (i) {
                                // clg('bam info', i.name, sithApp.sithIds);
                                let sids = sithApp.sithIds
                                    , idx = sids.findIndex( id=> id===sithId);
                                // clg('seeseds', sids, idx);

                                if (idx === -1) {
                                    throw 'looked up sid no longer sought?';
                                } else if ( i.apprentice.id && idx < sids.length-1
                                            && sids[idx+1] !== i.apprentice.id) {
                                    //clg('extend fill apprentice', idx+1, i.apprentice.id);
                                    withChg('add-apprentice', ()=> {
                                        let nsids = sids.slice();
                                        nsids[idx+1] = i.apprentice.id;
                                        sithApp.sithIds = nsids;
                                    })
                                }
                            }
                        }})
                });
            })
        })
    }).awaken();

function sithView( posn) {
    // clg('sithView sees', posn);
    return li(
        {
            class: "css-slot",
            style: cF( c=> {
                if (sithApp.obiLoc && c.md.sith && c.md.sith.info) {
                    return c.md.sith.info.homeworld.name === sithApp.obiLoc.name ? "color:red":"color:cyan";
                } else return null;
            })
        },
        {
            sith: cF( c=> ( sithApp.siths ? sithApp.siths[posn] : null))
        },

        h3( {content: cF( c=> { // todo make like H1 below
            if (i = (c.md.par.sith && c.md.par.sith.info)) {
                //clg('name!!!', i.name);
                return i.name
            }
        })})
        , h3( {content: cF( c=> { // todo make like H1 below
            if (i = (c.md.par.sith && c.md.par.sith.info)) {
                // clg('homeworld!!!', i.homeworld.name);
                return i.homeworld.name
            }
        })})
    );
}

function SithTrak () {
    return div({class: "app-container"},
        h1({class: "css-planet-monitor",
            content: cF( c=> "Obi-Wan currently on " + (sithApp.obiLoc? sithApp.obiLoc.name : "...dunno"))}),
        section({class: "css-scrollable-list"},
            ul({ class: "css-slots"},
                c => sithApp.sithIds.map( (sid, idx) => sithView(idx))),
            div({class: "css-scroll-buttons"},
                button({
                    class: cF( c=> cFscrollDisabled( c.md, "up"))
                    , onclick: mx => {
                        sithApp.sithIds = [null, null].concat(sithApp.sithIds).slice(2);
                    }
                    , disabled: cF( c=> {
                        let s0 = sithApp.siths[0];
                        return !(s0 && s0.info && s0.info.master.id);
                    })
                }),
                button({
                    class: cF( c=> cFscrollDisabled( c.md, "down")),
                    onclick: mx => {
                        sithApp.sithIds = sithApp.sithIds.slice(2);
                    },
                    disabled: cF( c=> {
                        let sl = sithApp.siths[sithApp.sithIds.length-1];
                        return !(sl && sl.info && sl.info.apprentice.id);
                    })
                }))));
}

function cFscrollDisabled (md, fixed) {
    return "css-button-"+fixed + (md.disabled ? " css-button-disabled":"");
}
window['SithTrak'] = SithTrak;

