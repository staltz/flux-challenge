goog.require('Matrix.Cells');
goog.require('Matrix.Model');
goog.require('Matrix.mxWeb');
goog.require('Matrix.mxXHR');

const SLOT_CT = 5;

const sithApp = new TagSession( null, 'SithTrakSession',
    { // --- Obi-tracking -------------------------------------
        obiTrakker: cF( c => new WebSocket('ws://localhost:4000')
                                .onmessage = msg => c.md.obiLoc = JSON.parse(msg.data)),
        obiLoc: cI( null),

        // --- Sith loading -------------------------------------
        sithIds: cI([-1,-2,3616,-3,-4])});

function SithTrak () {
    return div({class: "app-container"},
        h1({class: "css-planet-monitor",
            content: cF( c=> "Obi-Wan currently on " + (sithApp.obiLoc? sithApp.obiLoc.name : "...dunno"))}),

        section({class: "css-scrollable-list"},
             ul({ class: "css-slots"},
                {
                    name: "sith-list",

                    // next few lines along with kidValuesKids below
                    // is the standard Matrix mechanism to avoid regenerating
                    // all children just because one comes or goes
                    kidValues: cF( c=> sithApp.sithIds),
                    kidKey: k => k.sithId,
                    kidFactory: sithView,

                    // scrolling by two was a challenge since we do not want
                    // to overshoot by scrolling two when only one remained.
                    next_up: cF( c=> (c.md.kids[0] && c.md.kids[0].info) ? c.md.kids[0].info.master.id : null,
                        {observer: (n,md) => md.checkScroll()}),
                    next_down: cF( c=> { let last = c.md.kids[SLOT_CT-1];
                                        return (last && last.info) ?
                                            last.info.apprentice.id : null;},
                        {observer: (n,md) => md.checkScroll()}),

                    scrollReq: cI(0, {observer: (name, md) => md.checkScroll()}),

                    // the workhorse in deferred incremental scrolling
                    checkScroll: function () {
                        let md = this,
                            s = md.scrollReq;

                        if (s < 0 && md.next_up) {
                            sithApp.sithIds = rotateInOnLeft( sithApp.sithIds, md.next_up);
                            md.scrollReq += 1;
                        } else if (s > 0 && md.next_down) {
                            sithApp.sithIds = rotateInOnRight( sithApp.sithIds, md.next_down);
                            md.scrollReq -= 1;
                        }
                    }
                },
                c => c.kidValuesKids()), // implements kidValues, kidKeys, kidFactory above

            div({ class: "css-scroll-buttons",
                    disabled: cF( c=> c.md.fmUp("sith-list").kids.some( sview => sview.withObi))},
                scrollerButton("up"),
                scrollerButton("down"))));
}

function scrollerButton( dir ) {
    return button({
        class: cF( c=> "css-button-" + dir + (c.md.disabled ? " css-button-disabled":"")),
        onclick: md => md.fmUp("sith-list").scrollReq += (dir==="up"? -2:2),
        disabled: cF( c=> c.md.par.disabled || !c.md.fmTag("ul")['next_' + dir])})
}

function sithView( c, sithId) {
    return li({ class: "css-slot",
                style: cF( c=> c.md.withObi ? "color:red": null)},
        {
            sithId: sithId, // serves as child key for efficient DOM adds/removes

            lookup: cF( c=> (c.md.sithId > 0) ?
                new mxXHR("http://localhost:3000/dark-jedis/" + c.md.sithId) : null),

            cleanUp: md=> (md.lookup && md.lookup.xhr) ? md.lookup.xhr.abort():null,

            info: cF( c=> (c.md.lookup? c.md.lookup.okResult : null),
                    {observer: (s,md,i) => {
                        if (!i) return;

                        withChg('bracket', ()=> {
                            let slotN = sithApp.sithIds.indexOf(sithId)
                                , newIds = sithApp.sithIds.slice()
                                , m = slotSetMaybe(newIds, slotN - 1, i.master.id)
                                , a = slotSetMaybe(newIds, slotN + 1, i.apprentice.id);
                            if (a || m)
                                sithApp.sithIds = newIds;});}}),

            withObi: cF( c=> c.md.info && sithApp.obiLoc
                        && (c.md.info.homeworld.name === sithApp.obiLoc.name))

        },
        h3({ content: cF( c=> (i = c.md.par.info)? i.name : "")}),
        h6({ content: cF( c=> (i = c.md.par.info)? i.homeworld.name : "")}));
}

function slotSetMaybe( slots, slotN, elt ) {
    return (elt && slotN >= 0 && slotN < SLOT_CT && ((slots[slotN] || -1) !== elt)) ?
        (slots[slotN] = elt) : false;
}

function rotateInOnLeft( a, e) {
    return [e].concat( a.slice(0, SLOT_CT-1));
}

function rotateInOnRight( a, e) {
    let na = a.slice(1);
    na.push( e);
    return na;
}

window['SithTrak'] = SithTrak;