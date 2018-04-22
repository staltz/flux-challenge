
const SLOT_CT = 5;

const sithApp = new TagSession( null, 'SithTrakSession',
    {
        // --- Obi-tracking -------------------------------------
        obiTrakker: cF( c => new WebSocket('ws://localhost:4000')
                                .onmessage = msg => c.md.obiLoc = JSON.parse(msg.data)),
        obiLoc: cI( null),

        // --- Sith loading -------------------------------------
        // todo come up with unique constant to disambiguate placeholders
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

                    nextUp: cF( c=> ((k = c.md.kids[0]) && (i = k.info)) ? i.master.id : null,
                        {observer: (n,md) => md.checkScroll()}),

                    nextDown: cF( c=> ((k = c.md.kids[SLOT_CT-1]) && (i = k.info)) ? i.apprentice.id : null,
                        {observer: (n,md) => md.checkScroll()}),

                    scrollReq: cI(0, {observer: (name, md) => md.checkScroll()}),

                    checkScroll: function () {
                        let md = this,
                            s = md.scrollReq;
                        if (s < 0 && (mi = md.nextUp)) {
                            let nids = [mi].concat( sithApp.sithIds.slice(0, SLOT_CT-1));
                            sithApp.sithIds = nids;
                            md.scrollReq += 1;
                        } else if (s > 0 && (mi = md.nextDown)) {
                            let nids = sithApp.sithIds.slice(1);
                            nids.push(mi);
                            sithApp.sithIds = nids;
                            md.scrollReq -= 1;
                        }
                    }
                },
                c => c.kidValuesKids()),
            div({
                    class: "css-scroll-buttons",
                    disabled: cF( c=> c.md.fmUp("sith-list")
                        .kids
                        .some( sview => sview.withObi))
                },
                button({
                    class: cF( c=> "css-button-up" + (c.md.disabled ? " css-button-disabled":"")),
                    onclick: md => md.fmUp("sith-list").scrollReq += -2,
                    disabled: cF( c=> c.md.par.disabled || !c.md.fmTag("ul").nextUp)
                    }),
                button({
                    class: cF( c=> "css-button-up" + (c.md.disabled ? " css-button-disabled":"")),
                    onclick: md => md.fmUp("sith-list").scrollReq += 2,
                    disabled: cF( c=> c.md.par.disabled || !c.md.fmTag("ul").nextDown)
                    }))));
}

function sithView( c, sithId) {
    return li(
        {
            class: "css-slot",
            style: cF( c=> c.md.withObi ? "color:red": null)
        },
        {
            sithId: sithId,

            lookup: cF( c=> (c.md.sithId > 0) ?
                new mxXHR("http://localhost:3000/dark-jedis/" + c.md.sithId) : null),

            cleanUp: (md)=> (lkx = (md.lookup && md.lookup.xhr)) ? lkx.abort():null,

            info: cF( c=> (c.md.lookup? c.md.lookup.okResult:null),
                {observer: (s,md,i) => {
                    if (i) {
                        let slotN = sithApp.sithIds.indexOf( sithId);
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
    if (sid && slotN >= 0 && slotN < SLOT_CT) {
        withChg('sithidset', () => {
            if ((sithApp.sithIds[slotN] || -1) !== sid) {
                let nids = sithApp.sithIds.slice();
                nids[slotN] = sid;
                withoutIntegrity( ()=> {
                    sithApp.sithIds = nids;
                });
            }
        })
    }
}

window['SithTrak'] = SithTrak;

