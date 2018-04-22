goog.require('goog.net.XhrIo');
goog.provide('zoom.hunh');

var zoom={};zoom.hunh={};


class mxXHR extends Model {
    constructor( uri , options={send: true, delay: 0}) {
        super( null, "mxXhr",
            {
                uri: cI( uri),
                xhr: cI( null), // returned by XhrIO.send
                okResult: cI( null)
            });

        if ( options.send ){
            //clg('sending', uri);
            this.send( options.delay)
        }
    }

    send( delay) {
        let mxx = this
            , go = ()=> goog.net.XhrIo.send( mxx.uri, function(e) {
                let xhr = e.target;
                //clg('send setting xhr:', mxx.uri);
                mxx.xhr = xhr;

                if ( xhr.isSuccess()) {
                    //clg('send sees OK');
                    mxx.okResult = xhr.getResponseJson();
                    //clg('just set result', mxx.okResult);
                } else {
                    //clg('send XHR NG');
                    throw 'getXHR_JSONxhr last error: '+xhr.getLastError();
                }
            });

        if (delay)
            setTimeout( go, delay);
        else
            go();
        return mxx;
    }
}

window['mxXHR'] = mxXHR;

function getXHR_JSON( datau ) {
    //clg('getXHR_JSON Sending request for ['+ datau + ']');
    goog.net.XhrIo.send( datau, function(e) {
        let xhr = e.target;
        //clg('getXHR_JSONxhr', xhr.getStatus(), xhr.isSuccess());
        if ( xhr.isSuccess()) {
            var obj = xhr.getResponseJson();
            return obj;
        } else {
            throw 'getXHR_JSONxhr last error: '+xhr.getLastError();
        }
    });
}

//getXHR_JSON( "https://api.fda.gov/drug/event.json?search=patient.drug.openfda.brand_name:chevy&limit=3");

function testXHR() {
    clg('testXHR');
    let it = mkm( null, "testX", {
        lookup: cF( function (c) {
            clg('lookup');
            let mxx = new mxXHR( "https://api.fda.gov/drug/event.json?search=patient.drug.openfda.brand_name:adderall&limit=3");
            return mxx;
        }),
        result: cF( function (c) {
            clg('res');
            let look = c.md.lookup;
            clg("result sees lookup", look, look.hunh, look.xhr);
            return look.xhr;
        }),
        stuff: cF( function (c) {
            clg('stuff');
            let xhr = c.md.result;
            if ( xhr) {
                if ( xhr.isSuccess() ) {
                    let obj = xhr.getResponseJson();
                    clg('total AEs!!!!!!', obj.meta.results.total);
                    return obj.meta.results.total+ "AEs found";
                } else {
                    clg('xhr last error', xhr.getLastError());
                    return "Error " + xhr.getLastError();
                }
            } else {
                clg('No result!!!');
            }
        })
    });
    //clg('sending!!!!!!!!!!!!', it.lookup.result);

    it.lookup.send();
    console.log('test result '+it.lookup.result);
}

function getabm () {
    clg('getabm!!!!!!!!!!!');
    // let mxx = new mxXHR("https://api.fda.gov/drug/event.json?search=patient.drug.openfda.brand_name:adderall&limit=3"),
    //     bam = cF+ ({slot: "bam", observer: (slot, me, newv) => clg("bam", newv)},
    //         c => clg('bam rule sees', mxx.xhr));
    // mxx.send();
}

// getabm();

function xhraw (uri) {
    xhr = new XMLHttpRequest();
    xhr.addEventListener("load", (e) => { clg('load', e.target.response);
                                        debugger;});
    xhr.addEventListener("abort", (e)=> clg('abort', xhr == e.target));
    xhr.addEventListener("error", (e)=> clg('error', xhr == e.target));
    xhr.open('GET', uri);
    xhr.responseType = "json";
    xhr.send();
}


//xhraw("https://api.fda.gov/drug/event.json?search=patient.drug.openfda.brand_name:Yankees&limit=3");