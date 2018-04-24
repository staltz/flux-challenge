goog.provide('Matrix.mxWeb');
goog.require('Matrix.Model');
const mxDom = []; // here we will link JS "mirror" DOM to actual DOM by their numerical ids

var domLogging = false;

window['domLogging'] = domLogging;

function domlog(...args) {
    if ( domLogging)
        console.log('domlog> ', Array.from(args).join(","));
}

function dom2mx(dom, mustFind=true) {
    //clg('dom2mx dom id',dom.id);
	let js = mxDom[dom.id];
	if ( !js && mustFind) {

	    //debugger;
		throw `dom2mx cannot find mxDom for with dom.sid ${dom.sid}, dom.id ${dom.id}`;
	}
	return js;
}

function obsContent (slot, md, newv, oldv, c) {
	if (oldv===kUnbound) return; // on awaken all HTML is assembled at once
	// clg(`obsContent of ${md.name || md.id} setting ihtml!!! to ${newv} from ${oldv}`);
	ast( md.dom, "Tag obs Content");
    domlog( 'content', newv, oldv);
	md.dom.innerHTML = newv;
}

function notToBe( mx) {
    if (mx.cleanUp) {
        mx.cleanUp(mx);
    }

    mx.state = kDoomed;

    if ( mx.kids ) {
        for( let k of mx.kids) {
            notToBe( k);
        }
    }
    for (let slot in mx.cells) {
        let c = mx.cells[slot];
        c.quiesce();
    }
    mx.state = kDead;
}

function obsKids (slot, md, newv, oldv, c) {

	if (oldv===kUnbound) return; // on awaken all HTML is assembled at once

    let pdom = md.dom,
        frag = document.createDocumentFragment();

    ast(pdom);

    for (let oldk of oldv)
        if (!find(oldk,newv)) {
            domlog('dropping DOM', oldk.tag);
            notToBe(oldk);
        }

    for (let newk of newv) {
        if (find( newk, oldv)) {
            // clg('moving newk from old to frag', newk.sithId, newk.dom, newk.dom===null);
            if (newk.dom.parentNode !== pdom) {
                //clg(' doms', dom.parent)

                throw('newk dom parent not = parent');
            }
            frag.appendChild( pdom.removeChild(newk.dom));
        } else {
            let incubator = document.createElement('div');

            domlog( 'building new DOM', newk.tag);

            incubator.innerHTML = Tag.toHTML( newk);

            let newDom = newk.domCache = incubator.removeChild( incubator.firstChild);
            frag.appendChild( newDom);
        }
    }

    pdom.innerHTML = null;
    pdom.appendChild( frag);
}

function obsDisabled (slot, md, newv, oldv, c) {
    if (oldv===kUnbound) return; // on awaken all HTML is assembled at once
    domlog( 'disabled', newv, oldv);
    md.dom.disabled = !!newv;
}

function obsHidden (slot, md, newv, oldv, c) {
    if (oldv===kUnbound) return; // on awaken all HTML is assembled at once

    if (newv)
        md.dom.setAttribute('hidden','');
    else
        md.dom.removeAttribute('hidden');
}

function obsClass (slot, md, newv, oldv, c) {
    if (oldv===kUnbound) return; // on awaken all HTML is assembled at once
    domlog( 'className', newv, oldv);
    md.dom.className  = !newv ? "" : (isString( newv) ? newv : newv.join(" "));
}


function obsStyleProperty (mxprop, md, newv, oldv, c) {
	if (oldv===kUnbound) return; // on awaken all HTML is assembled at once
    let cssProp = mxprop.replace('_', '-')
	//clg( 'attr global', cssProp, newv, oldv);
	md.tag.dom.style[cssProp] = newv;
}

function obsTagEventHandler (property, md, newv, oldv, c) {
	if (oldv===kUnbound) return; // on awaken, all HTML is assembled at once
	//clg(`setting tag ${md.dbg()} style ${property}!!! `+ newv);
    // todo this is untested, might need translation of property
	md.dom[property] = newv;
}

var AttrAliases = new Map([['class','className']]);

function obsAttrGlobal (property, md, newv, oldv, c) {
    if (oldv===kUnbound) return; // on awaken all HTML is assembled at once
    let trueAttr = AttrAliases.get(property) || property;
    domlog( 'attr global', property, newv, oldv);
    md.dom[trueAttr] = newv;
}

function obsStyleAttr (property, md, newv, oldv, c) {
    if (oldv===kUnbound) return; // on awaken all HTML is assembled at once
    let ss = tagStyleString(md);
    md.dom['style'] = ss;
}

class TagSession extends Model {
    constructor(parent, name, islots) {

        let superSlots = Object.assign({sid: ++sid}, islots);

        super(parent, (name || islots.name), superSlots, false);

        if (!this.routes) this.routes = islots['routes'];
    }
    static make(parent, name, islots) {
        let ts = new TagSession( parent, name, islots);
        // todo this is unfortunate: perhaps we do as another automatic call such as to super, or as Model static
        if (ts.awakenOnInitp) {
            ts.awaken();
        } else {
            withIntegrity(qAwaken, ts, ts => {
                clg('awakening tag session!!!', ts.name);
                ts.awaken();
                return null;
            })
        }
    }
    static cname() {
        return "TagSession"
    }
    init () {
        if (this.routes) {
            Router(this.routes).init();
        }

    }
}

window['TagSession'] = TagSession;
goog.exportSymbol('mxwebtagsession', TagSession);

class Tag extends Model {
	constructor(parent, name, attrs, islots) {

		let superSlots = Object.assign({}, attrs, islots);
		delete superSlots.id;

		super( parent, (name || islots.name), superSlots, false);

		this.sid = ++sid;
		// if (!this.tag) this.tag = 'anon';
		// if (!this.content) this.content = null;

		if (attrs===undefined) debugger;

		if (attrs.id) {
			this.id = attrs.id;
		} else {
		    attrs.id = this.sid;
			this.id = this.sid;
		}

		// handled in Model now (?) this.slotObservers = [];
		this.callbacks = new Map;
        this.attrKeys = [];
        for ( let k in attrs)
            this.attrKeys.push( k);

		// --- binding mxDom with dom -----------------

		mxDom[this.id]=this;
		this.domCache = null;
		Object.defineProperty( this, 'dom',
			{enumerable: true,
			get: ()=> {
				if (this.domCache===null) {
					this.domCache = document.getElementById(this.id);
					ast(this.domCache, "Unable to locate DOM for Tag via Tag.id " + this.id);
					if (!this.domCache) {
					    clg('no dom', name);
					    throw 'Tag unanble find DOM';
                    }
				}
				return this.domCache;}});

		// todo this is unfortunate: perhaps we do as another automatic call such as to super, or as Model static
		if (this.awakenOnInitp) {
			this.awaken();
		} else {
			withIntegrity(qAwaken, this, x=> {
				this.awaken();
		});
		}
	}
	dbg() { return `tag ${this.tag} nm=${this.name} id=${this.id} `}
    static cname() { return "Tag"}
    static isTagKid (k) {
	    // Tag children can be strings or functions (called with a Cell whos md is the parent) that return Tags
        return isString(k) || (k instanceof Function) || (k instanceof Array);
    }

    tagToHTML() {
		let tag = this.tag
			, others = tagAttrsBuild(this)
			, s = tagStyleBuild(this)
			, attrs = `id=${this.id} ${others} ${s}`;

		ast(tag);
        return `<${tag} ${attrs}>${this.content || this.kidsToHTML()}</${tag}>`;
	}

    static toHTML (mx) {
        if (isString(mx)) {
            return mx;
        } else if ( Array.isArray(mx)) {
            return mx.reduce(function (cum, chunk) {
                return cum + Tag.toHTML(chunk)
            }, "");
        } else if ( typeof mx === "function") {
            return mx().tagToHTML();
        } else {
            return mx.tagToHTML();
        }
    }

    kidsToHTML() {
	    //clg('making kids HTML for', this.dbg());
		return this.kids? this.kids.reduce((pv, kid)=>{ return pv + Tag.toHTML( kid);},''):'';
	}
	slotObserverResolve(slot) {

		let obs = this.slotObservers[slot];

		if (!obs) {
			if (slot === 'content') {
				obs = obsContent;
			} else if (slot === 'kids') {
				obs = obsKids;
            } else if (slot === 'disabled') {
                obs = obsDisabled;
            } else if (slot === 'hidden') {
                obs = obsHidden;
            } else if (slot === 'class') {
                obs = obsClass;
            } else if (slot === 'style') {
                obs = obsStyleAttr;
            } else if (TagEvents.has(slot)) {
				obs = obsTagEventHandler;
			} else if (TagAttributesGlobal.has(slot)) {
				obs = obsAttrGlobal;
			} else {
				//console.warn(`tag ${this.tag} not resolving observer for ${slot}`);
				obs = kObserverUnresolved;
			}
			this.slotObservers[slot] = obs;
		}
		return obs;
	}
	fmTag(tag, key) {
		return this.fmUp(md=> md.tag===tag,{}, key)
	}
}
window['Tag'] = Tag;

function tag2html(x) {
    return Tag.toHTML(x);
}

window['tag2html'] = tag2html;

goog.exportSymbol("tag2html", tag2html);

var isTag = x => x instanceof Tag;

// ---- formerly tags.js ------------------------------------------

/* global Tag TagEvents */
const TagAttributesGlobal =  new Set(['accesskey','autofocus','checked','class'
    ,'content', 'contenteditable'
	,'contextmenu','dir','draggable','dropzone','for','hidden','href'
    ,'id','itemid','itemprop','itemref','itemscope'
	,'itemtype','lang','spellcheck','src','style','tabindex','title','translate', 'type'
    ,'viewBox','fill','d']);

const TagEvents =  new Set(['onabort','onautocomplete','onautocompleteerror','onblur','oncancel'
	,'oncanplay','oncanplaythrough','onchange','onclick','onclose','oncontextmenu','oncuechange'
	,'ondblclick','ondrag','ondragend','ondragenter','ondragexit','ondragleave','ondragover'
	,'ondragstart','ondrop','ondurationchange','onemptied','onended','onerror','onfocus'
	,'oninput','oninvalid','onkeydown','onkeypress','onkeyup','onload','onloadeddata'
	,'onloadedmetadata','onloadstart','onmousedown','onmouseenter','onmouseleave','onmousemove'
	,'onmouseout','onmouseover','onmouseup','onmousewheel','onpause','onplay','onplaying'
	,'onprogress','onratechange','onreset','onresize','onscroll','onseeked','onseeking'
	,'onselect','onshow','onsort','onstalled','onsubmit','onsuspend','ontimeupdate','ontoggle'
	,'onvolumechange','onwaiting']);

function tagEventHandler( event, prop ) {
    //clg( 'Bam tagEventHandler!', event, prop);
    let md = dom2mx( event.target);
    md.callbacks.get(prop)(md, event, prop)
}
function tagAttrsBuild(md) {
	let attrs = '';
    md.attrKeys.forEach( function (prop) {
	    if (TagEvents.has(prop)) {
	        if ( !(md[prop] instanceof Function)) {
                clg('bingo event!!!!!!!!!! ' + prop);
                clg('bingo event handler!!!!!!!!!! ' + md[prop]);
            }

            ast( md[prop] instanceof Function, 'tagattrsbuild handler not fn');
            md.callbacks.set( prop, md[prop]);
            attrs += ` ${prop}="tagEventHandler(event, '${prop}')"`;
        } else {
            switch (prop) {
                case 'disabled':
                case 'autofocus':
                case 'hidden':
                case 'checked':
                    // booleans can stand alone. So weird.
                    if (md[prop]) {
                        attrs += ` ${prop}`;
                    }
                    break;
                case 'value':
                    attrs += ` ${prop}="${md[prop]}"`;
                    break;
                case 'placeholder':
                    attrs += ` ${prop}="${md[prop]}"`;
                    break;

                case 'style':
                    attrs += tagStyleBuild( md);
                    break;

                case 'class':
                    if ( md[prop]) {
                        attrs += ` class="${isString(md[prop]) ? md[prop] : md[prop]
                            .filter(c => (c !== null && c !== undefined))
                            .join(' ')}"`;
                    }
                    break;

                default: {

                    if (md[prop]) {
                        //attrs += ` ${prop}="${md[prop]}"`;
                         if (TagAttributesGlobal.has(prop)) {
                            // clg('bingo attr global '+prop+'='+md[prop]);
                            attrs += ` ${prop}="${md[prop]}"`;
                        } else clg('unknown attribute prop', prop);

                    }
                }
            }
        }
	});
	//if (md.tag==='input') clg(md.tag + ' attrs ' + attrs);
	return attrs;
}

function tag( tag, attrs, customs, kids) {
    if ( kids.length === 1 && isString( kids[0])) {
        if ( attrs.content ) throw( `tag ${tag}has one string child ${kids[0]} but also content ${attrs.content}`);
        attrs.content = kids[0];
        kids = null;
    }
    if (customs)
        for ( let k in attrs || {})
        if (customs.hasOwnProperty( k)) {
            clg(`WARNING: duplicate key ${k} in tag ${tag}`);
        }
    if (attrs)
        for ( let k in customs || {})
        if (attrs.hasOwnProperty( k)) {
            clg(`WARNING: duplicate key ${k} in tag ${tag}`);
        }

    return function (c) {
        //clg('tag ', typeof par, id, par === null, isModel(par), typeof par ==='undefined', factory.cname());

        let cu = customs || {}
            , opts = Object.assign({}, {tag: tag}
                    , kids ? {kids: cKids( kids)} : null
                    , cu)
            , tg = new Tag( c ? c.md : null
                        , cu.name || tag
                        , attrs
                        , opts);
        //clg(`tag sees ids ${id} and mdid ${md.id} name ${md.name}`);
        return tg;
    };
}

function genTagEx(tagName) {
    window[tagName] = function () {
        if ( Tag.isTagKid( arguments[0])) {
            return tag( tagName, {}, {}, allArgs(arguments));
        } else {
            if ( Tag.isTagKid( arguments[1])) {
                return tag( tagName, arguments[0] || {}, {}, cdrArgs(arguments));
            } else {
                return tag( tagName, arguments[0] || {},  arguments[1] || {}, cddrArgs(arguments));
            }
        }
    }
}

var a, abbr, acronym, address, applet, area, article, aside, audio,
    b, base, basefont, bdi, bdo, bgsound, big, blink,
    blockquote, body, br, button, canvas, caption, center,
    cite, code, col, colgroup, command, content,
    data, datalist, dd, del, details, dfn, dialog, dir, div, dl, dt, element, em, embed,
    fieldset, figcaption, figure, font, footer, form, frame, frameset,
    h1, h2, h3, h4, h5, h6, head, header, hgroup, hr, html,
    i, iframe, image, img, input, ins, isindex, kbd, keygen,
    label, legend, li, link, listing, main, map, mark, marquee, menu, menuitem, meta, meter, multicol,
    nav, nextid, nobr, noembed, noframes, noscript, object, ol, optgroup, option, output,
    p, param, path, picture, plaintext, pre, progress, q, rp, rt, rtc, ruby,
    s, samp, script, section, select, shadow, slot, small, source, spacer, span,
    strike, strong, style, sub, summary, sup, svg,
    table, tbody, td, template, textarea, tfoot, th, thead, time, title,
    tr, track, tt, u, ul, mxwvar, video, wbr, xmp;

const tagNames = ['a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio',
    'b', 'base', 'basefont', 'bdi', 'bdo', 'bgsound', 'big', 'blink',
    'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center',
    'cite', 'code', 'col', 'colgroup', 'command', 'content',
    'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'embed',
    'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html',
    'i', 'iframe', 'image', 'img', 'input', 'ins', 'isindex', 'kbd', 'keygen',
    'label', 'legend', 'li', 'link', 'listing', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'multicol',
    'nav', 'nextid', 'nobr', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output',
    'p', 'param', 'path', 'picture', 'plaintext', 'pre', 'progress', 'q', 'rp', 'rt', 'rtc', 'ruby',
    's', 'samp', 'script', 'section', 'select', 'shadow', 'slot', 'small', 'source', 'spacer', 'span',
    'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'svg',
    'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title',
    'tr', 'track', 'tt', 'u', 'ul', 'mxwvar', 'video', 'wbr', 'xmp'];

tagNames.map( tg => genTagEx( tg));


goog.exportSymbol('a', a);
goog.exportSymbol('abbr', abbr);
goog.exportSymbol('acronym', acronym);
goog.exportSymbol('address', address);
goog.exportSymbol('applet', applet);
goog.exportSymbol('area', area);
goog.exportSymbol('article', article);
goog.exportSymbol('aside', aside);
goog.exportSymbol('audio', audio);
goog.exportSymbol('b', b);
goog.exportSymbol('base', base);
goog.exportSymbol('basefont', basefont);
goog.exportSymbol('bdi', bdi);
goog.exportSymbol('bdo', bdo);
goog.exportSymbol('bgsound', bgsound);
goog.exportSymbol('big', big);
goog.exportSymbol('blink', blink);
goog.exportSymbol('blockquote', blockquote);
goog.exportSymbol('body', body);
goog.exportSymbol('br', br);
goog.exportSymbol('button', button);
goog.exportSymbol('canvas', canvas);
goog.exportSymbol('caption', caption);
goog.exportSymbol('center', center);
goog.exportSymbol('cite', cite);
goog.exportSymbol('code', code);
goog.exportSymbol('col', col);
goog.exportSymbol('colgroup', colgroup);
goog.exportSymbol('command', command);
goog.exportSymbol('content', content);
goog.exportSymbol('data', data);
goog.exportSymbol('datalist', datalist);
goog.exportSymbol('dd', dd);
goog.exportSymbol('del', del);
goog.exportSymbol('details', details);
goog.exportSymbol('dfn', dfn);
goog.exportSymbol('dialog', dialog);
goog.exportSymbol('dir', dir);
goog.exportSymbol('div', div);
goog.exportSymbol('dl', dl);
goog.exportSymbol('dt', dt);
goog.exportSymbol('element', element);
goog.exportSymbol('em', em);
goog.exportSymbol('embed', embed);
goog.exportSymbol('fieldset', fieldset);
goog.exportSymbol('figcaption', figcaption);
goog.exportSymbol('figure', figure);
goog.exportSymbol('font', font);
goog.exportSymbol('footer', footer);
goog.exportSymbol('form', form);
goog.exportSymbol('frame', frame);
goog.exportSymbol('frameset', frameset);
goog.exportSymbol('h1', h1);
goog.exportSymbol('h2', h2);
goog.exportSymbol('h3', h3);
goog.exportSymbol('h4', h4);
goog.exportSymbol('h5', h5);
goog.exportSymbol('h6', h6);
goog.exportSymbol('head', head);
goog.exportSymbol('header', header);
goog.exportSymbol('hgroup', hgroup);
goog.exportSymbol('hr', hr);
goog.exportSymbol('html', html);
goog.exportSymbol('i', i);
goog.exportSymbol('iframe', iframe);
goog.exportSymbol('image', image);
goog.exportSymbol('img', img);
goog.exportSymbol('input', input);
goog.exportSymbol('ins', ins);
goog.exportSymbol('isindex', isindex);
goog.exportSymbol('kbd', kbd);
goog.exportSymbol('keygen', keygen);
goog.exportSymbol('label', label);
goog.exportSymbol('legend', legend);
goog.exportSymbol('li', li);
goog.exportSymbol('link', link);
goog.exportSymbol('listing', listing);
goog.exportSymbol('main', main);
goog.exportSymbol('map', map);
goog.exportSymbol('mark', mark);
goog.exportSymbol('marquee', marquee);
goog.exportSymbol('menu', menu);
goog.exportSymbol('menuitem', menuitem);
goog.exportSymbol('meta', meta);
goog.exportSymbol('meter', meter);
goog.exportSymbol('multicol', multicol);
goog.exportSymbol('nav', nav);
goog.exportSymbol('nextid', nextid);
goog.exportSymbol('nobr', nobr);
goog.exportSymbol('noembed', noembed);
goog.exportSymbol('noframes', noframes);
goog.exportSymbol('noscript', noscript);
goog.exportSymbol('object', object);
goog.exportSymbol('ol', ol);
goog.exportSymbol('optgroup', optgroup);
goog.exportSymbol('option', option);
goog.exportSymbol('output', output);
goog.exportSymbol('p', p);
goog.exportSymbol('param', param);
goog.exportSymbol('path', path);
goog.exportSymbol('picture', picture);
goog.exportSymbol('plaintext', plaintext);
goog.exportSymbol('pre', pre);
goog.exportSymbol('progress', progress);
goog.exportSymbol('q', q);
goog.exportSymbol('rp', rp);
goog.exportSymbol('rt', rt);
goog.exportSymbol('rtc', rtc);
goog.exportSymbol('ruby', ruby);
goog.exportSymbol('s', s);
goog.exportSymbol('samp', samp);
goog.exportSymbol('script', script);
goog.exportSymbol('section', section);
goog.exportSymbol('select', select);
goog.exportSymbol('shadow', shadow);
goog.exportSymbol('slot', slot);
goog.exportSymbol('small', small);
goog.exportSymbol('source', source);
goog.exportSymbol('spacer', spacer);
goog.exportSymbol('span', span);
goog.exportSymbol('strike', strike);
goog.exportSymbol('strong', strong);
goog.exportSymbol('style', style);
goog.exportSymbol('sub', sub);
goog.exportSymbol('summary', summary);
goog.exportSymbol('sup', sup);
goog.exportSymbol('svg', svg);
goog.exportSymbol('table', table);
goog.exportSymbol('tbody', tbody);
goog.exportSymbol('td', td);
goog.exportSymbol('template', template);
goog.exportSymbol('textarea', textarea);
goog.exportSymbol('tfoot', tfoot);
goog.exportSymbol('th', th);
goog.exportSymbol('thead', thead);
goog.exportSymbol('time', time);
goog.exportSymbol('title', title);
goog.exportSymbol('tr', tr);
goog.exportSymbol('track', track);
goog.exportSymbol('tt', tt);
goog.exportSymbol('u', u);
goog.exportSymbol('ul', ul);
goog.exportSymbol('mxwvar', mxwvar);
goog.exportSymbol('video', video);
goog.exportSymbol('wbr', wbr);
goog.exportSymbol('xmp', xmp);


//-------------------------------------------------------------------------------
// ---------------- in-line Style ----------------------------------------------
//

class mxCSS extends Model {
    constructor(tag, islots) {

        let superSlots = Object.assign({}, islots); // todo do we need a copy?

        super(null, 'css', superSlots, false);

        this.cssProps = [];
        for ( let k in islots)
            this.cssProps.push( k);

        clg("cssProps!!!!", this.cssProps);

        this.sid = ++sid; // todo purpose unclear
        this.tag = tag;
        this.slotObservers = [];

        withIntegrity(qAwaken, this, x => this.awaken());
    }

    dbg() { return `mxCSS ${this.tag.tag} tagnm=${this.tag.name}`}

    static cname() { return "mxCSS"}

    slotObserverResolve(slot) {
        return obsStyleProperty;
    }
}

function mkCSS( props) {
    return function (tag) {
        return new mxCSS( tag, props)
    }
}

function tagStyleBuild(md) {
    let ss = '',
        style = md.style;

    if ( style instanceof Function) {
        //clg(' model style!!!!');
        style = style( md);
    }

    if ( isString( style)) {
        ss = style;
    } else if ( style instanceof mxCSS ) {
        style.cssProps.forEach( function (mxprop) {
            let cssProp = mxprop.replace('_', '-')
                , cssValue = style[mxprop];
            //clg('bildstyle',mxprop, cssProp, cssValue);
            ss += `${cssProp}:${cssValue};`;
        })
    } else { // raw map
        for (let prop in style) {
            let cssProp = prop.replace('_', '-')
                , cssValue = style[prop];
            //clg('bildstyle',cssProp, cssValue);
            ss += `${cssProp}:${cssValue};`;
        }
    }

    return ss===''? '' : ` style="${ss}"`;
}

function tagStyleString(md) {
    let ss = '',
        style = md.style;

    if ( style instanceof Function) {
        //clg(' model style!!!!');
        style = style( md);
    }

    if ( isString( style)) {
        ss = style;
    } else if ( style instanceof mxCSS ) {
        style.cssProps.forEach( function (mxprop) {
            let cssProp = mxprop.replace('_', '-')
                , cssValue = style[mxprop];
            //clg('bildstyle',mxprop, cssProp, cssValue);
            ss += `${cssProp}:${cssValue};`;
        })
    } else { // raw map
        for (let prop in style) {
            let cssProp = prop.replace('_', '-')
                , cssValue = style[prop];
            //clg('bildstyle',cssProp, cssValue);
            ss += `${cssProp}:${cssValue};`;
        }
    }

    return ss;
}


//-------------------------------------------------------------------------------
//--- Persistence via window.localStorage ---------------------------------------

class MXStorable extends Model {
    // this constructor can create a new storable (in window.localStorage
    // as well as the matrix), or load a storable into the matrix

    constructor( icslots) {
        let islots = icslots || {},
            netSlots = Object.assign(
                // these first two will be overridden when loading fro localStorage
                { id: (islots.lsPrefix || "MXSTOR_ANON")  + uuidv4(),
                    created: Date.now()},
                islots,
                // on load from storage, this deleted will be present and thus
                // not loaded as mutable input cell. ie, no undelete.
                {deleted: islots.deleted || cI(null)});

        super(null, null, netSlots, false);

        //this.deleted = this.deleted || null;

        this.store();
    }

    static storableProperties () { return ["id", "created","deleted"]}

/*    static make( klass, islots ) {
        let s = new klass( islots);
        s.store();
        return s;
    }*/

    toJSON () {
        // clg('or constructor', this.constructor.storableProperties());
        return this.constructor.storableProperties()
            .reduce( (j, p) => { j[p] = this[p];
                return j;}, {});
    }

    static load (klass, id) {
        let obj = window.localStorage.getObject( id);
        //clg('loading', id, obj.deleted);
        return new klass( obj)
    }

    static obsAnyChange ( slot, row, newv, priorv, c) {
        row.store();
    }

    slotObserverResolve(slot) {
        // tell the Matrix engine about our slot observer (same for all slots)
        return MXStorable.obsAnyChange
    }

    store () {
        MXStorable.storeObject( this.id, this.toJSON());
    }

    static storeObject ( id, obj) {
        window.localStorage.setObject( id, obj);
    }

    delete() {
        this.deleted = Date.now();
    }

    static loadAllItems(klass, prefix) {
        return Object.keys(window.localStorage || {})
            .filter( k => k.startsWith( prefix))
            .map( key => MXStorable.load( klass, key));
    }
}

window['MXStorable'] = MXStorable;

goog.exportSymbol('MXStorable', MXStorable);
// goog.exportSymbol('loadAllItems', loadAllItems);


// MXStorable.prototype['make'] = MXStorable.prototype.make;
// MXStorable.prototype['toJSON'] = MXStorable.prototype.toJSON;
// MXStorable.prototype['load'] = MXStorable.prototype.load;
// MXStorable.prototype['store'] = MXStorable.prototype.store;
// MXStorable.prototype['storeObject'] = MXStorable.prototype.storeObject;
// MXStorable.prototype['delete'] = MXStorable.prototype.delete;
// MXStorable.prototype['loadAllItems'] = MXStorable.prototype.loadAllItems;