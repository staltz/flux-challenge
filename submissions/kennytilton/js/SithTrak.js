
const SLOT_CT = 5;

const sithApp = new TagSession( null, 'SithTrakSession',
    {
        // --- Obi-tracking -------------------------------------
        obiTrakker: cF( c => new WebSocket('ws://localhost:4000')
            .onmessage = msg => c.md.obiLoc = JSON.parse(msg.data)),

        obiLoc: cI( null),

        // --- Sith loading -------------------------------------

        sithIds: cI([-1,-2,3616,-3,-4])

    }).awaken();

function SithTrak () {
    return div({class: "app-container"},
        h1({class: "css-planet-monitor",
            content: cF( c=> "Obi-Wan currently on " + (sithApp.obiLoc? sithApp.obiLoc.name : "...dunno"))}),
        section({class: "css-scrollable-list"},
             ul({ class: "css-slots"},
                {
                    name: "sith-list",
                    kidValues: cF( c=> sithApp.sithIds),
                    kidKey: k => k.sithId,
                    kidFactory: sithView,

                    nextUp: cF( c=> {
                        let k = c.md.kids[0];
                        return (k && (i = k.info)) ? i.master.id : null;
                    }),
                    nextDown: cF( c=> {
                        let k = c.md.kids[SLOT_CT-1];
                        return (k && (i = k.info)) ? i.apprentice.id : null;
                    }),

                    scrollReq: cI(0, {observer: (name, md, newv) => {
                        clg('scrollreq!!!!!!!=', newv);
                        if ( newv < 0) {
                            if (i=md.kids[0].info) {
                                if (mi = md.nextUp) {
                                    let nids = [mi].concat( sithApp.sithIds.slice(0, SLOT_CT-1));
                                    clg('scrollup nids', nids.join());
                                    withoutIntegrity(()=> sithApp.sithIds = nids);
                                    md.scrollReq += 1;
                                } else {
                                    clg('no next up');
                                }
                            } else {
                                clg('up no info)');
                            }
                        } else if ( newv > 0) {
                            if (i=md.kids[SLOT_CT-1].info) {
                                if (mi = md.nextDown) {
                                    let nids = sithApp.sithIds.slice(1);
                                    nids.push(mi);
                                    clg('scrolldown nids', nids.join());
                                    withoutIntegrity(()=> sithApp.sithIds = nids);
                                    md.scrollReq -= 1;
                                } else {
                                    clg('no next down');
                                }
                            } else {
                                clg('down no info');
                            }
                        }
                    }})

                },
                c => c.kidValuesKids()),
            div({
                    class: "css-scroll-buttons",
                    disabled: cF( c=> c.md.fmUp("sith-list")
                        .kids
                        .some( sview => sview.withObi))
                },
                button(
                    {
                        class: cF( c=> cFscrollDisabled( c.md, "up")),
                        onclick: md => md.fmUp("sith-list").scrollReq += -2,
                        disabled: cF( c=> {
                            return c.md.par.disabled || !c.md.fmTag("ul").nextUp;
                        })
                    }),
                button(
                    {
                        class: cF( c=> cFscrollDisabled( c.md, "down")),
                        onclick: md => md.fmUp("sith-list").scrollReq += 2,
                        disabled: cF( c=> {
                            return c.md.par.disabled || !c.md.fmTag("ul").nextDown;
                        })
                    }))));
}

function sithView( c, sithId) {
    clg('making new sithview!!!!!!!!!!!!!!!', sithId);
    return li(
        {
            class: "css-slot",
            // todo fix style observer
            style: cF( c=> c.md.withObi ? "color:red":"#ede66a")
        },
        {
            sithId: sithId,

            lookup: cF( c=> {
                if (c.md.sithId > 0) {
                    clg('looking up', c.md.sithId);
                    return new mxXHR("http://localhost:3000/dark-jedis/" + c.md.sithId);
                }
            }),

            info: cF( c=> (c.md.lookup? c.md.lookup.okResult:null),
                {observer: (s,md,i) => {
                    if (i) {
                        let slotN = sithApp.sithIds.indexOf( sithId);
                        clg('newsith', sithId, i.name);
                        sithIdsSet( slotN-1, i.master.id )
                        sithIdsSet( slotN+1, i.apprentice.id );

                    }
                }}),

            withObi: cF( c=> c.md.info && sithApp.obiLoc
                && (c.md.info.homeworld.name === sithApp.obiLoc.name))
        },

        h3({ content: cF( c=> (i = c.md.par.info)? i.name : "")}),
        h3({ content: cF( c=> (i = c.md.par.info)? i.homeworld.name : "")}));
}

function sithIdsSet( slotN, sid ) {
    //clg('considering', slotN, sid);
    if (sid && slotN >= 0 && slotN < SLOT_CT) {
        withChg('sithidset', () => {
            if ((sithApp.sithIds[slotN] || -1) !== sid) {
                //clg('really setting', slotN, sid, sithApp.sithIds);
                let nids = sithApp.sithIds.slice();
                nids[slotN] = sid;
                //clg('new nids', nids);
                withoutIntegrity( ()=> {
                    sithApp.sithIds = nids;
                });
            }
        })
    }
}


function cFscrollDisabled (md, fixed) {
    return "css-button-"+fixed + (md.disabled ? " css-button-disabled":"");
}
window['SithTrak'] = SithTrak;

