!function(e,n,t,r){function i(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function a(e){if(e&&e.__esModule)return e;var n=Object.create(null);return e&&Object.keys(e).forEach(function(t){if("default"!==t){var r=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(n,t,r.get?r:{enumerable:!0,get:function(){return e[t]}})}}),n.default=e,n}var o=/*#__PURE__*/i(e),l=/*#__PURE__*/a(e),c=/*#__PURE__*/a(n),u=/*#__PURE__*/i(t),s=/*#__PURE__*/i(r);function d(){return d=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},d.apply(this,arguments)}function f(e,n){return n||(n=e.slice(0)),e.raw=n,e}function m(){return(m=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}var p=e.memo(function(n){var t=n.children,r=n.math,i=n.block,a=n.errorColor,l=n.renderError,c=n.settings,u=n.as,d=function(e,n){if(null==e)return{};var t,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n.indexOf(t=a[r])>=0||(i[t]=e[t]);return i}(n,["children","math","block","errorColor","renderError","settings","as"]),f=u||(i?"div":"span"),p=null!=t?t:r,h=e.useState({innerHtml:""}),g=h[0],y=h[1];return e.useEffect(function(){try{var e=s.default.renderToString(p,m({displayMode:!!i,errorColor:a,throwOnError:!!l},c));y({innerHtml:e})}catch(e){if(!(e instanceof s.default.ParseError||e instanceof TypeError))throw e;y(l?{errorElement:l(e)}:{innerHtml:e.message})}},[i,p,a,l,c]),"errorElement"in g?g.errorElement:o.default.createElement(f,Object.assign({},d,{dangerouslySetInnerHTML:{__html:g.innerHtml}}))});function h(){return h=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},h.apply(this,arguments)}var g,y,k,v=["children","options"];(k=g||(g={})).blockQuote="0",k.breakLine="1",k.breakThematic="2",k.codeBlock="3",k.codeFenced="4",k.codeInline="5",k.footnote="6",k.footnoteReference="7",k.gfmTask="8",k.heading="9",k.headingSetext="10",k.htmlBlock="11",k.htmlComment="12",k.htmlSelfClosing="13",k.image="14",k.link="15",k.linkAngleBraceStyleDetector="16",k.linkBareUrlDetector="17",k.linkMailtoDetector="18",k.newlineCoalescer="19",k.orderedList="20",k.paragraph="21",k.ref="22",k.refImage="23",k.refLink="24",k.table="25",k.tableSeparator="26",k.text="27",k.textBolded="28",k.textEmphasized="29",k.textEscaped="30",k.textMarked="31",k.textStrikethroughed="32",k.unorderedList="33",function(e){e[e.MAX=0]="MAX",e[e.HIGH=1]="HIGH",e[e.MED=2]="MED",e[e.LOW=3]="LOW",e[e.MIN=4]="MIN"}(y||(y={}));var x=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce(function(e,n){return e[n.toLowerCase()]=n,e},{for:"htmlFor"}),b={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},E=["style","script"],w=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,O=/mailto:/i,C=/\n{2,}$/,j=/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,S=/^ *> ?/gm,z=/^ {2,}\n/,M=/^(?:( *[-*_])){3,} *(?:\n *)+\n/,A=/^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,T=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,I=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,$=/^(?:\n *)*\n/,L=/\r\n?/g,R=/^\[\^([^\]]+)](:.*)\n/,H=/^\[\^([^\]]+)]/,_=/\f/g,B=/^\s*?\[(x|\s)\]/,N=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,P=/^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,D=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,U=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,G=/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,F=/^<!--[\s\S]*?(?:-->)/,W=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,q=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,Z=/^\{.*\}$/,J=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,X=/^<([^ >]+@[^ >]+)>/,V=/^<([^ >]+:\/[^ >]+)>/,Q=/-([a-z])?/gi,K=/^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,Y=/^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,ee=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,ne=/^\[([^\]]*)\] ?\[([^\]]*)\]/,te=/(\[|\])/g,re=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,ie=/\t/g,ae=/^ *\| */,oe=/(^ *\||\| *$)/g,le=/ *$/,ce=/^ *:-+: *$/,ue=/^ *:-+ *$/,se=/^ *-+: *$/,de=/^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,fe=/^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,me=/^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/,pe=/^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,he=/^\\([^0-9A-Za-z\s])/,ge=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,ye=/^\n+/,ke=/^([ \t]*)/,ve=/\\([^\\])/g,xe=/ *\n+$/,be=/(?:^|\n)( *)$/,Ee="(?:\\d+\\.)",we="(?:[*+-])";function Oe(e){return"( *)("+(1===e?Ee:we)+") +"}var Ce=Oe(1),je=Oe(2);function Se(e){return new RegExp("^"+(1===e?Ce:je))}var ze=Se(1),Me=Se(2);function Ae(e){return new RegExp("^"+(1===e?Ce:je)+"[^\\n]*(?:\\n(?!\\1"+(1===e?Ee:we)+" )[^\\n]*)*(\\n|$)","gm")}var Te=Ae(1),Ie=Ae(2);function $e(e){var n=1===e?Ee:we;return new RegExp("^( *)("+n+") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1"+n+" (?!"+n+" ))\\n*|\\s*\\n*$)")}var Le=$e(1),Re=$e(2);function He(e,n){var t=1===n,r=t?Le:Re,i=t?Te:Ie,a=t?ze:Me;return{match:function(e,n,t){var i=be.exec(t);return i&&(n.list||!n.inline&&!n.simple)?r.exec(e=i[1]+e):null},order:1,parse:function(e,n,r){var o=t?+e[2]:void 0,l=e[0].replace(C,"\n").match(i),c=!1;return{items:l.map(function(e,t){var i=a.exec(e)[0].length,o=new RegExp("^ {1,"+i+"}","gm"),u=e.replace(o,"").replace(a,""),s=t===l.length-1,d=-1!==u.indexOf("\n\n")||s&&c;c=d;var f,m=r.inline,p=r.list;r.list=!0,d?(r.inline=!1,f=u.replace(xe,"\n\n")):(r.inline=!0,f=u.replace(xe,""));var h=n(f,r);return r.inline=m,r.list=p,h}),ordered:t,start:o}},render:function(n,t,r){return e(n.ordered?"ol":"ul",{key:r.key,start:"20"===n.type?n.start:void 0},n.items.map(function(n,i){return e("li",{key:i},t(n,r))}))}}}var _e=/^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,Be=/^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,Ne=[j,A,T,N,D,P,F,K,Te,Le,Ie,Re],Pe=[].concat(Ne,[/^[^\n]+(?:  \n|\n{2,})/,U,q]);function De(e){return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function Ue(e){return se.test(e)?"right":ce.test(e)?"center":ue.test(e)?"left":null}function Ge(e,n,t){var r=t.inTable;t.inTable=!0;var i=n(e.trim(),t);t.inTable=r;var a=[[]];return i.forEach(function(e,n){"26"===e.type?0!==n&&n!==i.length-1&&a.push([]):("27"!==e.type||null!=i[n+1]&&"26"!==i[n+1].type||(e.text=e.text.replace(le,"")),a[a.length-1].push(e))}),a}function Fe(e,n,t){t.inline=!0;var r=Ge(e[1],n,t),i=e[2].replace(oe,"").split("|").map(Ue),a=function(e,n,t){return e.trim().split("\n").map(function(e){return Ge(e,n,t)})}(e[3],n,t);return t.inline=!1,{align:i,cells:a,header:r,type:"25"}}function We(e,n){return null==e.align[n]?{}:{textAlign:e.align[n]}}function qe(e){return function(n,t){return t.inline?e.exec(n):null}}function Ze(e){return function(n,t){return t.inline||t.simple?e.exec(n):null}}function Je(e){return function(n,t){return t.inline||t.simple?null:e.exec(n)}}function Xe(e){return function(n){return e.exec(n)}}function Ve(e,n,t){if(n.inline||n.simple)return null;if(t&&!t.endsWith("\n"))return null;var r="";e.split("\n").every(function(e){return!Ne.some(function(n){return n.test(e)})&&(r+=e+"\n",e.trim())});var i=r.trimEnd();return""==i?null:[r,i]}function Qe(e){try{if(decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data(?!:image)):/i))return}catch(e){return null}return e}function Ke(e){return e.replace(ve,"$1")}function Ye(e,n,t){var r=t.inline||!1,i=t.simple||!1;t.inline=!0,t.simple=!0;var a=e(n,t);return t.inline=r,t.simple=i,a}function en(e,n,t){var r=t.inline||!1,i=t.simple||!1;t.inline=!1,t.simple=!0;var a=e(n,t);return t.inline=r,t.simple=i,a}function nn(e,n,t){return t.inline=!1,e(n,t)}var tn,rn,an,on,ln,cn,un,sn,dn,fn,mn=function(e,n,t){return{children:Ye(n,e[1],t)}};function pn(){return{}}function hn(){return null}function gn(){return[].slice.call(arguments).filter(Boolean).join(" ")}function yn(e,n,t){for(var r=e,i=n.split(".");i.length&&void 0!==(r=r[i[0]]);)i.shift();return r||t}function kn(e,n){var t=yn(n,e);return t?"function"==typeof t||"object"==typeof t&&"render"in t?t:yn(n,e+".component",e):e}function vn(e,n){var t;void 0===n&&(n={}),n.overrides=n.overrides||{},n.slugify=n.slugify||De,n.namedCodesToUnicode=n.namedCodesToUnicode?h({},b,n.namedCodesToUnicode):b;var r=n.createElement||l.createElement;function i(e,t){var i=yn(n.overrides,e+".props",{});return r.apply(void 0,[kn(e,n.overrides),h({},t,i,{className:gn(null==t?void 0:t.className,i.className)||void 0})].concat([].slice.call(arguments,2)))}function a(e){var t=!1;n.forceInline?t=!0:n.forceBlock||(t=!1===re.test(e));for(var r=m(f(t?e:e.trimEnd().replace(ye,"")+"\n\n",{inline:t}));"string"==typeof r[r.length-1]&&!r[r.length-1].trim();)r.pop();if(null===n.wrapper)return r;var a,o=n.wrapper||(t?"span":"div");if(r.length>1||n.forceWrapper)a=r;else{if(1===r.length)return"string"==typeof(a=r[0])?i("span",{key:"outer"},a):a;a=null}return l.createElement(o,{key:"outer"},a)}function o(e){var n=e.match(w);return n?n.reduce(function(e,n,t){var r=n.indexOf("=");if(-1!==r){var i=function(e){return-1!==e.indexOf("-")&&null===e.match(W)&&(e=e.replace(Q,function(e,n){return n.toUpperCase()})),e}(n.slice(0,r)).trim(),o=function(e){var n=e[0];return('"'===n||"'"===n)&&e.length>=2&&e[e.length-1]===n?e.slice(1,-1):e}(n.slice(r+1).trim()),c=x[i]||i,u=e[c]=function(e,n){return"style"===e?n.split(/;\s?/).reduce(function(e,n){var t=n.slice(0,n.indexOf(":"));return e[t.replace(/(-[a-z])/g,function(e){return e[1].toUpperCase()})]=n.slice(t.length+1).trim(),e},{}):"href"===e||"src"===e?Qe(n):(n.match(Z)&&(n=n.slice(1,n.length-1)),"true"===n||"false"!==n&&n)}(i,o);"string"==typeof u&&(U.test(u)||q.test(u))&&(e[c]=l.cloneElement(a(u.trim()),{key:t}))}else"style"!==n&&(e[x[n]||n]=!0);return e},{}):null}var c=[],u={},s=((t={})[0]={match:Je(j),order:1,parse:function(e,n,t){return{children:n(e[0].replace(S,""),t)}},render:function(e,n,t){return i("blockquote",{key:t.key},n(e.children,t))}},t[1]={match:Xe(z),order:1,parse:pn,render:function(e,n,t){return i("br",{key:t.key})}},t[2]={match:Je(M),order:1,parse:pn,render:function(e,n,t){return i("hr",{key:t.key})}},t[3]={match:Je(T),order:0,parse:function(e){return{lang:void 0,text:e[0].replace(/^ {4}/gm,"").replace(/\n+$/,"")}},render:function(e,n,t){return i("pre",{key:t.key},i("code",h({},e.attrs,{className:e.lang?"lang-"+e.lang:""}),e.text))}},t[4]={match:Je(A),order:0,parse:function(e){return{attrs:o(e[3]||""),lang:e[2]||void 0,text:e[4],type:"3"}}},t[5]={match:Ze(I),order:3,parse:function(e){return{text:e[2]}},render:function(e,n,t){return i("code",{key:t.key},e.text)}},t[6]={match:Je(R),order:0,parse:function(e){return c.push({footnote:e[2],identifier:e[1]}),{}},render:hn},t[7]={match:qe(H),order:1,parse:function(e){return{target:"#"+n.slugify(e[1]),text:e[1]}},render:function(e,n,t){return i("a",{key:t.key,href:Qe(e.target)},i("sup",{key:t.key},e.text))}},t[8]={match:qe(B),order:1,parse:function(e){return{completed:"x"===e[1].toLowerCase()}},render:function(e,n,t){return i("input",{checked:e.completed,key:t.key,readOnly:!0,type:"checkbox"})}},t[9]={match:Je(n.enforceAtxHeadings?P:N),order:1,parse:function(e,t,r){return{children:Ye(t,e[2],r),id:n.slugify(e[2]),level:e[1].length}},render:function(e,n,t){return i("h"+e.level,{id:e.id,key:t.key},n(e.children,t))}},t[10]={match:Je(D),order:0,parse:function(e,n,t){return{children:Ye(n,e[1],t),level:"="===e[2]?1:2,type:"9"}}},t[11]={match:Xe(U),order:1,parse:function(e,n,t){var r,i=e[3].match(ke),a=new RegExp("^"+i[1],"gm"),l=e[3].replace(a,""),c=(r=l,Pe.some(function(e){return e.test(r)})?nn:Ye),u=e[1].toLowerCase(),s=-1!==E.indexOf(u),d={attrs:o(e[2]),noInnerParse:s,tag:s?u:e[1]};return t.inAnchor=t.inAnchor||"a"===u,s?d.text=e[3]:d.children=c(n,l,t),t.inAnchor=!1,d},render:function(e,n,t){return i(e.tag,h({key:t.key},e.attrs),e.text||n(e.children,t))}},t[13]={match:Xe(q),order:1,parse:function(e){return{attrs:o(e[2]||""),tag:e[1]}},render:function(e,n,t){return i(e.tag,h({},e.attrs,{key:t.key}))}},t[12]={match:Xe(F),order:1,parse:function(){return{}},render:hn},t[14]={match:Ze(Be),order:1,parse:function(e){return{alt:e[1],target:Ke(e[2]),title:e[3]}},render:function(e,n,t){return i("img",{key:t.key,alt:e.alt||void 0,title:e.title||void 0,src:Qe(e.target)})}},t[15]={match:qe(_e),order:3,parse:function(e,n,t){return{children:en(n,e[1],t),target:Ke(e[2]),title:e[3]}},render:function(e,n,t){return i("a",{key:t.key,href:Qe(e.target),title:e.title},n(e.children,t))}},t[16]={match:qe(V),order:0,parse:function(e){return{children:[{text:e[1],type:"27"}],target:e[1],type:"15"}}},t[17]={match:function(e,n){return n.inAnchor?null:qe(J)(e,n)},order:0,parse:function(e){return{children:[{text:e[1],type:"27"}],target:e[1],title:void 0,type:"15"}}},t[18]={match:qe(X),order:0,parse:function(e){var n=e[1],t=e[1];return O.test(t)||(t="mailto:"+t),{children:[{text:n.replace("mailto:",""),type:"27"}],target:t,type:"15"}}},t[20]=He(i,1),t[33]=He(i,2),t[19]={match:Je($),order:3,parse:pn,render:function(){return"\n"}},t[21]={match:Ve,order:3,parse:mn,render:function(e,n,t){return i("p",{key:t.key},n(e.children,t))}},t[22]={match:qe(Y),order:0,parse:function(e){return u[e[1]]={target:e[2],title:e[4]},{}},render:hn},t[23]={match:Ze(ee),order:0,parse:function(e){return{alt:e[1]||void 0,ref:e[2]}},render:function(e,n,t){return i("img",{key:t.key,alt:e.alt,src:Qe(u[e.ref].target),title:u[e.ref].title})}},t[24]={match:qe(ne),order:0,parse:function(e,n,t){return{children:n(e[1],t),fallbackChildren:n(e[0].replace(te,"\\$1"),t),ref:e[2]}},render:function(e,n,t){return u[e.ref]?i("a",{key:t.key,href:Qe(u[e.ref].target),title:u[e.ref].title},n(e.children,t)):i("span",{key:t.key},n(e.fallbackChildren,t))}},t[25]={match:Je(K),order:1,parse:Fe,render:function(e,n,t){return i("table",{key:t.key},i("thead",null,i("tr",null,e.header.map(function(r,a){return i("th",{key:a,style:We(e,a)},n(r,t))}))),i("tbody",null,e.cells.map(function(r,a){return i("tr",{key:a},r.map(function(r,a){return i("td",{key:a,style:We(e,a)},n(r,t))}))})))}},t[26]={match:function(e,n){return n.inTable?(n.inline=!0,ae.exec(e)):null},order:1,parse:function(){return{type:"26"}},render:function(){return" | "}},t[27]={match:Xe(ge),order:4,parse:function(e){return{text:e[0].replace(G,function(e,t){return n.namedCodesToUnicode[t]?n.namedCodesToUnicode[t]:e})}},render:function(e){return e.text}},t[28]={match:Ze(de),order:2,parse:function(e,n,t){return{children:n(e[2],t)}},render:function(e,n,t){return i("strong",{key:t.key},n(e.children,t))}},t[29]={match:Ze(fe),order:3,parse:function(e,n,t){return{children:n(e[2],t)}},render:function(e,n,t){return i("em",{key:t.key},n(e.children,t))}},t[30]={match:Ze(he),order:1,parse:function(e){return{text:e[1],type:"27"}}},t[31]={match:Ze(me),order:3,parse:mn,render:function(e,n,t){return i("mark",{key:t.key},n(e.children,t))}},t[32]={match:Ze(pe),order:3,parse:mn,render:function(e,n,t){return i("del",{key:t.key},n(e.children,t))}},t);!0===n.disableParsingRawHTML&&(delete s[11],delete s[13]);var d,f=function(e){var n=Object.keys(e);function t(r,i){for(var a=[],o="";r;)for(var l=0;l<n.length;){var c=n[l],u=e[c],s=u.match(r,i,o);if(s){var d=s[0];r=r.substring(d.length);var f=u.parse(s,t,i);null==f.type&&(f.type=c),a.push(f),o=d;break}l++}return a}return n.sort(function(n,t){var r=e[n].order,i=e[t].order;return r!==i?r-i:1}),function(e,n){return t(function(e){return e.replace(L,"\n").replace(_,"").replace(ie,"    ")}(e),n)}}(s),m=(d=function(e,n){return function(t,r,i){var a=e[t.type].render;return n?n(function(){return a(t,r,i)},t,r,i):a(t,r,i)}}(s,n.renderRule),function e(n,t){if(void 0===t&&(t={}),Array.isArray(n)){for(var r=t.key,i=[],a=!1,o=0;o<n.length;o++){t.key=o;var l=e(n[o],t),c="string"==typeof l;c&&a?i[i.length-1]+=l:null!==l&&i.push(l),a=c}return t.key=r,i}return d(n,e,t)}),p=a(e);return c.length?i("div",null,p,i("footer",{key:"footer"},c.map(function(e){return i("div",{id:n.slugify(e.identifier),key:e.identifier},e.identifier,m(f(e.footnote,{inline:!0})))}))):p}function xn(e){var n=e.children,t=e.options,r=function(e,n){if(null==e)return{};var t,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n.indexOf(t=a[r])>=0||(i[t]=e[t]);return i}(e,v);return l.cloneElement(vn(n,t),r)}function bn(){var e=l.useState(document.getElementById("sample-content").textContent.trim()),n=e[0],t=e[1],r=l.useCallback(function(e){return t(e.target.value)},[]);/*#__PURE__*/return l.createElement("main",null,/*#__PURE__*/l.createElement(On,null),/*#__PURE__*/l.createElement(Cn,null,/*#__PURE__*/l.createElement("a",{target:"_blank",href:"https://github.com/quantizor/markdown-to-jsx",title:"Check out the markdown-to-jsx source code",rel:"noopener noreferrer"},/*#__PURE__*/l.createElement("img",{src:"./images/logo.svg",alt:"markdown-to-jsx logo"})),/*#__PURE__*/l.createElement(jn,null,/*#__PURE__*/l.createElement("h1",null,/*#__PURE__*/l.createElement("code",null,"markdown-to-jsx")," is an easy-to-use markdown component that takes Github-flavored Markdown (GFM) and makes native JSX without dangerous hacks. "),/*#__PURE__*/l.createElement("h2",null,"It's lightweight, customizable, and happily supports React-like libraries.")),/*#__PURE__*/l.createElement(Sn,null,"See the"," ",/*#__PURE__*/l.createElement("a",{target:"_blank",href:"https://github.com/quantizor/markdown-to-jsx/blob/main/README.md",rel:"noopener noreferrer"},"project README")," ","for detailed installation & usage instructions.")),/*#__PURE__*/l.createElement(Mn,null,/*#__PURE__*/l.createElement(An,{onInput:r,value:n}),/*#__PURE__*/l.createElement(Tn,null,/*#__PURE__*/l.createElement(xn,{options:$n},n))))}var En="cornflowerblue",wn="#fefefe",On=t.createGlobalStyle(tn||(tn=f(["\n\t*,\n\t*::before,\n\t*::after {\n\t\tbox-sizing: border-box;\n\t\toutline-color: ",";\n\t}\n\n\thtml,\n\tbody,\n\t#root,\n\tmain {\n\t\tmargin: 0;\n\t\tmin-height: 100vh;\n\t}\n\n\thtml {\n\t\tbackground: #1a1c23;\n\t\tcolor: ",";\n\t\tfont-family: Inter, Helvetica Neue, Helvetica, sans-serif;\n\t\tfont-size: 14px;\n\t\tline-height: 1.5;\n\t}\n\n\th1,\n\th2,\n\th3,\n\th4,\n\th5,\n\th6 {\n\t\tmargin: 0 0 1rem;\n    text-wrap: balance;\n\t}\n\n\th1 {\n\t\tfont-size: 2rem;\n\t}\n\n\th2 {\n\t\tfont-size: 1.8rem;\n\t}\n\n\th3 {\n\t\tfont-size: 1.6rem;\n\t}\n\n\th4 {\n\t\tfont-size: 1.4rem;\n\t}\n\n\th5 {\n\t\tfont-size: 1.2rem;\n\t}\n\n\th6 {\n\t\tfont-size: 1rem;\n\t}\n\n\ta {\n\t\tcolor: ",";\n\t\ttransition: color 200ms ease;\n\n\t\t&:hover,\n\t\t&:focus {\n\t\t\tcolor: color-mix(in srgb, "," 75%, transparent);\n\t\t}\n\t}\n\n  :root {\n    --code-bg: color-mix(in srgb, "," 15%, transparent);\n  }\n\n\tcode {\n    background: var(--code-bg) !important;\n    border-radius: 2px;\n\t\tdisplay: inline-block;\n    font-family: 'Jetbrains Mono', Consolas, Monaco, monospace;\n    font-size: 0.9em;\n\t\tpadding: 0 4px;\n    text-decoration: inherit;\n\t}\n\n\tpre code {\n\t\tborder: 0;\n\t\tdisplay: block;\n\t\tpadding: 1em;\n\t}\n\n\tmain {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tpadding: 3rem 1.5rem 0;\n\t\tmargin: 0;\n\n\t\t@media all and (min-width: 1024px) {\n\t\t\tpadding: 3rem;\n\t\t}\n\t}\n\n  p {\n    text-wrap: balance;\n  }\n"])),En,wn,En,En,En),Cn=u.default.header(rn||(rn=f(["\n  flex-shrink: 0;\n  margin-bottom: 2em;\n  text-align: center;\n\n  img {\n    height: 100px;\n  }\n"]))),jn=u.default.p(an||(an=f(["\n  font-size: 16px;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 60vw;\n\n  h1,\n  h2 {\n    font: inherit;\n  }\n\n  @media all and (max-width: 500px) {\n    max-width: none;\n  }\n\n  @media all and (max-width: 1023px) {\n    h1,\n    h2 {\n      display: block;\n      margin-bottom: 1.5rem;\n    }\n  }\n"]))),Sn=u.default.p(on||(on=f(["\n  color: color-mix(in srgb, "," 20%, white);\n"])),wn),zn=t.css(ln||(ln=f(["\n  flex: 0 0 50%;\n  padding: 1em;\n"]))),Mn=u.default.section(cn||(cn=f(["\n  display: flex;\n  flex-grow: 1;\n  margin-left: -1.5rem;\n  margin-right: -1.5rem;\n\n  @media all and (min-width: 1024px) {\n    margin-left: 0;\n    margin-right: 0;\n  }\n\n  @media all and (max-width: 500px) {\n    flex-direction: column;\n  }\n"]))),An=u.default.textarea(un||(un=f(["\n  ",";\n  background: color-mix(in srgb, "," 10%, transparent);\n  border: 0;\n  color: inherit;\n  position: sticky;\n  top: 0;\n  font-family: 'Jetbrains Mono', Consolas, Monaco, monospace;\n  font-size: inherit;\n  max-height: 100vh;\n\n  @media all and (max-width: 500px) {\n    height: 300px;\n    position: relative;\n  }\n"])),zn,En),Tn=u.default.div(sn||(sn=f(["\n  ",";\n  padding-left: 2rem;\n  padding-right: 1rem;\n  overflow: auto;\n  overflow-x: hidden;\n"])),zn),In=u.default.button(dn||(dn=f(["\n  background: color-mix(in srgb, "," 50%, black);\n  border: 1px solid color-mix(in srgb, "," 50%, transparent);\n  border-radius: 2px;\n  color: #fff;\n  cursor: pointer;\n  padding: 0.25em 0.75em;\n  font: inherit;\n  transition: background 200ms ease;\n\n  &:hover,\n  &:focus {\n    background: ",";\n  }\n\n  &:active {\n    background: color-mix(in srgb, "," 80%, black);\n  }\n"])),En,En,En,En),$n={overrides:{code:function(e){var n=l.useRef(null);return l.useEffect(function(){var t;n.current&&null!=(t=e.className)&&t.includes("lang-")&&window.hljs&&(window.hljs.highlightElement(n.current),n.current.removeAttribute("data-highlighted"))},[e.className,e.children]),/*#__PURE__*/l.createElement("code",d({},e,{ref:n}))},MyComponent:{component:function(e){/*#__PURE__*/return l.createElement(In,d({},e,{onClick:function(){alert("Look ma, I'm a real component!")}}))}}},renderRule:function(e,n,t,r){return n.type===g.codeBlock&&"latex"===n.lang?/*#__PURE__*/l.createElement(p,{as:"div",key:r.key,style:{margin:"1.5em 0"}},String.raw(fn||(fn=f(["",""])),n.text)):e()}};c.render(/*#__PURE__*/l.createElement(bn,null),document.getElementById("root"))}(React,ReactDOM,styled,katex);
//# sourceMappingURL=markdown-to-jsx.js.map
