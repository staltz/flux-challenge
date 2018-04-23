goog.provide('sithtrak.sithtrak');
goog.require('Matrix.Cells');
goog.require('Matrix.Model');
goog.require('Matrix.mxWeb');
goog.require('Matrix.mxXHR');

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

                    // next few lines along with kidValuesKids below
                    // is the mechanism by which we avoid regenerating
                    // all children just because one comes or goes
                    kidValues: cF( c=> sithApp.sithIds),
                    kidKey: k => k.sithId,
                    kidFactory: sithView,

                    // scrolling by two was quite a challenge since we did not want
                    // to overshoot by scrolling two when only one remained. We had to
                    // get quite clever with the data flow, and get a bit ugly by
                    // sprinkling around checkScroll calls wherever we see one scroll
                    // and see if the second of two is stil to come.
                    nextUp: cF( c=> ((k = c.md.kids[0]) && (i = k.info)) ? i.master.id : null,
                        {observer: (n,md) => md.checkScroll()}),

                    nextDown: cF( c=> ((k = c.md.kids[SLOT_CT-1]) && (i = k.info)) ? i.apprentice.id : null,
                        {observer: (n,md) => md.checkScroll()}),

                    scrollReq: cI(0, {observer: (name, md) => md.checkScroll()}),

                    checkScroll: function () {
                        let md = this,
                            s = md.scrollReq;

                        if (s < 0 && (mi = md.nextUp)) {
                            sithApp.sithIds = [mi].concat( sithApp.sithIds.slice(0, SLOT_CT-1));
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
            div({ class: "css-scroll-buttons",
                    disabled: cF( c=> c.md.fmUp("sith-list").kids.some( sview => sview.withObi))},
                button({
                    class: cF( c=> "css-button-up" + (c.md.disabled ? " css-button-disabled":"")),
                    onclick: md => md.fmUp("sith-list").scrollReq += -2,
                    disabled: cF( c=> c.md.par.disabled || !c.md.fmTag("ul").nextUp)
                    }),
                button({
                    class: cF( c=> "css-button-down" + (c.md.disabled ? " css-button-disabled":"")),
                    onclick: md => md.fmUp("sith-list").scrollReq += 2,
                    disabled: cF( c=> c.md.par.disabled || !c.md.fmTag("ul").nextDown)}))));
}

function sithView( c, sithId) {
    return li({ class: "css-slot",
                style: cF( c=> c.md.withObi ? "color:red": null)},
        {
            sithId: sithId,

            lookup: cF( c=> (c.md.sithId > 0) ?
                new mxXHR("http://localhost:3000/dark-jedis/" + c.md.sithId) : null),

            cleanUp: md=> (lkx = (md.lookup && md.lookup.xhr)) ? lkx.abort():null,

            info: cF( c=> (c.md.lookup? c.md.lookup.okResult:null),
                    {observer: (s,md,i) => {
                        if (i) {
                            withChg('bracket', ()=> {
                                let slotN = sithApp.sithIds.indexOf(sithId)
                                    , newIds = sithApp.sithIds.slice()
                                    , m = sithIdsSet(newIds, slotN - 1, i.master.id)
                                    , a = sithIdsSet(newIds, slotN + 1, i.apprentice.id);
                                if (a || m) {
                                    sithApp.sithIds = newIds;
                                }
                            });
                        }
                    }}),

            withObi: cF( c=> c.md.info && sithApp.obiLoc
                        && (c.md.info.homeworld.name === sithApp.obiLoc.name))

        },
        h3({ content: cF( c=> (i = c.md.par.info)? i.name : "")}),
        h6({ content: cF( c=> (i = c.md.par.info)? i.homeworld.name : "")}));
}


function sithIdsSet( tempIds, slotN, sithId ) {
    return (sithId && slotN >= 0 && slotN < SLOT_CT && ((tempIds[slotN] || -1) != sithId)) ?
        tempIds[slotN] = sithId : false;
}

window['SithTrak'] = SithTrak;