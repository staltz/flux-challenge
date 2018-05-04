goog.require('Matrix.Cells');
goog.require('Matrix.Model');
goog.require('Matrix.mxWeb');
goog.require('Matrix.mxXHR');

const SLOT_CT = 5;

var jct = 0;

const hiringApp = new TagSession( null, 'HiringSession'
    , {
        itemId: "16967543"
        , jobs: cI( null)
        // , lookup: null // cF(c => (c.md.itemId > 0) ?
        // //new mxXHR("data:resource/hiring-201805.html"): null)
        //
        // , info: cF(c => (c.md.lookup ? c.md.lookup.okResult : null),
        //     {
        //         observer: (s, md, response) => {
        //             if (!response) return;
        //
        //             pln("Res!!!!", response);
        //         }
        //     })
    });

function jobCollect( dom ) {
    let cn = dom.className
        , jobs = [];
    if (cn.search("athing") !== -1) {
        clg('job posting!', ++jct, dom.id)
        jobs.push( jobSpec( dom))
    } else {
        for (let n = 0; n < dom.children.length; ++n) {
            let j = jobCollect( dom.children[n])
            if (j) {
                jobs = jobs.concat( j)
            }
        }
    }
    return jobs;
}

function jobSpec( dom) {
    let j = { jid: dom.id}
    return j
}

function WhosHiring() {
    return div(h1("Hacker News Who's Hiring?")
        , iframe({
                src: "resource/hiring-201805.htm"
                , style: "width:1000px; height:100px"
                , onload: md => {
                    if (md.dom.contentDocument) { // FF
                        clg('contdoc');
                        b = md.dom.contentDocument.getElementsByTagName('body')[0];
                        let jobs = jobCollect( b);
                        clg(' got jobs', jobs.length)
                        hiringApp.jobs = jobs;
                    }
                    else if (md.dom.contentWindow) { // IE
                        clg('contwin');
                        //b = md.dom.contentWindow.document.getElementsByTagName('body')[0];
                    }
                }
            }
            , {
                name: "hnews"
                , inner: cI("not yet")
            })
        , p({
            content: cF(c => {
                let hn = c.md.fmUp("hnews");
                ast(hn, "nohnews");
                return "iflen " + hn.inner.length;
            })
        })
        , ul(
            c=> {
                return hiringApp.jobs?
                    hiringApp.jobs.map( j=> li( p({content: "j="+j.jid})))
                    : [li(p("nope"))];
            }
        ))

}

window['WhosHiring'] = WhosHiring;

