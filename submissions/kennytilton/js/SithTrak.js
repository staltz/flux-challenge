
const SLOT_CT = 5;

const sithApp = new TagSession( null, 'SithTrakSession',
    {
        // --- Obi-tracking -------------------------------------
        obiTrakker: cF( c => new WebSocket('ws://localhost:4000')
            .onmessage = msg => c.md.obiLoc = JSON.parse(msg.data)),

        obiLoc: cI( null),

        // --- Sith loading -------------------------------------
        sithIds: cI([,,3616,,]),
        scrollReq: cI(0, {observer: (name, md, newv) => {
            clg('scrollreq='+newv);
            if ( newv < 0) {
                if (i=md.loaders[0].info) {
                    if (mi = i.master.id) {
                        let nids = [mi].concat( md.sithIds.slice(0, SLOT_CT-1));
                        withoutIntegrity(()=> md.sithIds = nids);
                        md.scrollReq += 1;
                    }
                }
            }
        }}),

        loaders: (() => {
            let ls = [];
            for ( n=0; n < SLOT_CT; ++n ) {
                ls.push( sithLoader( n));
            }
            return ls;
        })()
    }).awaken();

sithApp.loaders.map( ldr => ldr.awaken());

const nowLoaded = [];

function sithLoader( slotN) {
    return mkmu( null, 'SithLoader', {
        slotN: slotN,
        
        sithId: cF( c=> sithApp.sithIds[slotN]),

        lookup: cF( c=> {
            if (c.md.sithId) {
                clg('looking up', c.md.sithId);
                return new mxXHR("http://localhost:3000/dark-jedis/" + c.md.sithId);
            }
        }),

        info: cF( c=> (c.md.lookup? c.md.lookup.okResult:null),
            {observer: (s,md,i) => {
                if (i) {
                    clg('newsith',slotN,i.name,i.master.url,i.apprentice.url);
                    sithIdsSet( md.slotN-1, i.master.id )
                    sithIdsSet( md.slotN+1, i.apprentice.id );

                }
            }}),

        withObi: cF( c=> c.md.info && sithApp.obiLoc
                        && (c.md.info.homeworld.name === sithApp.obiLoc.name))
    });
}

function sithIdsSet( slotN, sid ) {
    clg('considering', slotN, sid);
    if (sid && slotN >= 0 && slotN < SLOT_CT) {
        withChg('sithidset', () => {
            if ((sithApp.sithIds[slotN] || -1) !== sid) {
                clg('really setting', slotN, sid, sithApp.sithIds);
                let nids = sithApp.sithIds.slice();
                nids[slotN] = sid;
                clg('new nids', nids);
                withoutIntegrity( ()=> {
                    sithApp.sithIds = nids;
                });
            }
        })
    }
}

function SithTrak () {
    return div({class: "app-container"},
        h1({class: "css-planet-monitor",
            content: cF( c=> "Obi-Wan currently on " + (sithApp.obiLoc? sithApp.obiLoc.name : "...dunno"))}),
        section({class: "css-scrollable-list"},
            ul({ class: "css-slots"},
                c => sithApp.loaders.map( (loader, idx) => sithView(loader,idx))),
            div({
                    class: "css-scroll-buttons",
                    disabled: cF( c=> sithApp.loaders.some( ldr=> ldr.withObi))
                },
                button(
                    {
                        class: cF( c=> cFscrollDisabled( c.md, "up")),
                        onclick: mx => sithApp.scrollReq += -1,
                        disabled: cF( c=> {
                            //let s0 = sithApp.siths[0];
                            //return !(s0 && s0.info && s0.info.master.id);
                            return c.md.par.disabled;
                        })
                    }),
                button(
                    {
                        class: cF( c=> cFscrollDisabled( c.md, "down")),
                        onclick: mx => sithApp.scrollReq += 1,
                        disabled: cF( c=> {
                            // let sl = sithApp.siths[sithApp.sithIds.length-1];
                            // return !(sl && sl.info && sl.info.apprentice.id);
                            return c.md.par.disabled;
                        })
                    }))));
}

function sithView( loader, posn) {
    clg('making new sithview!!!!!!!!!!!!!!!');
    return li(
        {
            class: "css-slot",
            // todo fix style observer
            style: cF( c=> loader.withObi ? "color:red":"#ede66a")
        },

        h3({ content: cF( c=> (i = loader.info)? i.name : "")}),
        h3({ content: cF( c=> (i = loader.info)? i.homeworld.name : "")}));
}


function cFscrollDisabled (md, fixed) {
    return "css-button-"+fixed + (md.disabled ? " css-button-disabled":"");
}
window['SithTrak'] = SithTrak;

