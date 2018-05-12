goog.require('Matrix.Cells');
goog.require('Matrix.Model');
goog.require('Matrix.mxWeb');
goog.require('Matrix.mxXHR');

const SLOT_CT = 5;

var jct = 0;

const hiringApp = new TagSession(null, 'HiringSession'
    , {
        itemId: "16967543"
        , jobs: cI([])
        , jobsFiltered: cF( c=> c.md.jobs || [])
    });

// '.c5a,.cae,.c00,.c9c,.cdd,.c73,.c88'

function jobsCollect(dom) {
    let raw = Array.prototype.slice.call(dom.querySelectorAll('.athing'))
        , jobs = [];
    //clg( 'raw ', jct, raw.length, raw.slice(0,5).map( d => d.tagName));

    for (let rn = 0; rn < raw.length; ++rn) {
        let spec = jobSpec(raw[rn]);
        //clg('rwn', rn, jct, spec);
        if (spec.OK) {
            //clg('job posting!!!!!!!!!!!', ++jct, raw[rn].id);
            jobs.push(spec);
            // if (jct > 50) break;
        }
    }
    return jobs;

}


function jobSpec(dom) {
    clg('jopspec', dom.id, dom.tagName, dom.classList)
    let j = {jid: dom.id}
    for (let n = 0; n < dom.children.length; ++n) {
        jobSpecBuild(j, dom.children[n], 0)
    }
    return j
}

function jobSpecBuild(j, dom, deep) {
    let cn = dom.className
        , tab = '' + deep;

    for (let n = 0; n < deep; ++n) {
        tab = tab + '..';
    }

    //if (cn) clg('sub'+tab, cn);
    if (cn === "hnuser") {
        j.user = dom.innerHTML
    } else if (cn === "comment") {
        j.comment = dom
        // clg('comment', dom.children.length, dom.children[0].tagName, dom.innerHTML)
    } else if (cn === "c00") {
        let ih = dom.innerHTML
            , ps = ih.split("<p>")
            , hdr = ps[0]
            , hs = hdr.split("|");

        if (hs.length > 1) {
            let rXonsite = new RegExp('on-?site', 'i')
                , rXremote = new RegExp('remote', 'i');
            j.OK = true
            j.company = hs[0]
            j.hdrest = hs.slice(1)
            // clg('job header', hs.length, hdr)
            if ( hdr.match( rXonsite)) {
                clg('onsite!!!!', hdr)
                j.onsite = true;
            } else j.onsite = false;
            if ( hdr.match( rXremote)) {
                clg('remote!!!!', hdr)
                j.remote = true;
            } else j.remote = false;

        }
    }
    if (cn === "reply") {
        dom.remove()
    } else {
        for (let n = 0; n < dom.children.length; ++n) {
            jobSpecBuild(j, dom.children[n], deep + 1)
        }
    }
}

// ------ the view --------------------------------------


function jobListFilter( mx, jobs) {
    let remoteness = mx.fmUp("remoteness").selection;
    return jobs.filter( j=> {
        return remoteness === 'any'
            || (remoteness === 'remote' && j.remote)
            || (remoteness === 'onsite' && j.onsite)
    })
}

function jobListItem( c, j) {
    clg('jobListItem', j.id);
    return li(
        div(
            p({content: j.jid + ' > ' + j.user})
            , h4(j.company)
            , div( c=> {
                let stars = [], starCt = 5;
                while ( starCt--)
                stars.push( i( {class: "material-icons", style: "color:#eee"}, "grade"))
                return stars
            })
            , p(j.hdrest.join(" | "))

            //, div({content: j.comment.innerHTML})
        ))
}

// --- main ---------------------------------------

function WhosHiring() {
    return div(
        h1("Hacker News Who's Hiring?")
        , iframe({
                src: "resource/hiring-201805.htm"
                , style: "display: none; width:1000px; height:100px"
                , onload: md => {
                    if (md.dom.contentDocument) { // FF
                        clg('contdoc');
                        b = md.dom.contentDocument.getElementsByTagName('body')[0];
                        let jobs = jobsCollect(b);
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
        , h1("Toolbar")
        , ul({}, {
                name: "remoteness"
                , selection: cI('any')
            }
            , [["Any", 'any'], ["On-site", 'onsite'], ["Remote", 'remote']]
                .map(([label, value]) => button({
                    style: cF(c => c.md.selected ? "background:cyan" : "")
                    , onclick: mx => {
                        clg('setting selection', mx.value, mx.selection, mx.tag);
                        mx.fmUp("remoteness").selection = mx.value;
                    }
                    , selected: cF(c => c.md.fmUp("remoteness").selection === value)
                    , content: label
                }, {value: value})))
        , p( {content: cF( c=> "Jobs found: " + c.md.fmUp("job-list").kids.length)})
        , ul({}
            , {
                name: "job-list"
                , jobsFiltered: cF( c=> jobListFilter( c.md, hiringApp.jobs))
                , kidValues: cF(c => c.md.jobsFiltered || [])
                , kidKey: j => j.id
                , kidFactory: jobListItem
            }
            , c => c.kidValuesKids()))
}


window['WhosHiring'] = WhosHiring;

