import{a4 as Q,ah as a,bG as rn,r as w,x as ue,i as tn,W as F,bW as an,bD as b,bO as l,bF as C,bE as z,bX as j,bH as ln,bI as Se,bY as sn,bZ as cn,b_ as un,bc as pe,b$ as dn,c0 as fn,c1 as ge,aG as hn,ad as vn,bs as be,aN as pn,c2 as gn,bR as bn,bS as q,c3 as se,c4 as xn,F as mn,c5 as wn,ax as xe,c6 as me,c7 as we,c8 as yn,c9 as ye,ca as Cn,cb as y,cc as Ce,bV as ce,cd as zn}from"./index-9437428c.js";const Sn=Q({name:"Eye",render(){return a("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},a("path",{d:"M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"}),a("circle",{cx:"256",cy:"256",r:"80",fill:"none",stroke:"currentColor","stroke-miterlimit":"10","stroke-width":"32"}))}}),An=Q({name:"EyeOff",render(){return a("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},a("path",{d:"M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z",fill:"currentColor"}),a("path",{d:"M255.66 384c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47z",fill:"currentColor"}),a("path",{d:"M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78z",fill:"currentColor"}),a("path",{d:"M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160z",fill:"currentColor"}),a("path",{d:"M165.78 233.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38z",fill:"currentColor"}))}}),Ae=rn("n-input");function Rn(n){let x=0;for(const t of n)x++;return x}function J(n){return n===""||n==null}function _n(n){const x=w(null);function t(){const{value:g}=n;if(!(g!=null&&g.focus)){R();return}const{selectionStart:d,selectionEnd:s,value:u}=g;if(d==null||s==null){R();return}x.value={start:d,end:s,beforeText:u.slice(0,d),afterText:u.slice(s)}}function A(){var g;const{value:d}=x,{value:s}=n;if(!d||!s)return;const{value:u}=s,{start:c,beforeText:i,afterText:v}=d;let m=u.length;if(u.endsWith(v))m=u.length-v.length;else if(u.startsWith(i))m=i.length;else{const I=i[c-1],S=u.indexOf(I,c-1);S!==-1&&(m=S+1)}(g=s.setSelectionRange)===null||g===void 0||g.call(s,m,m)}function R(){x.value=null}return ue(n,R),{recordCursor:t,restoreCursor:A}}const ze=Q({name:"InputWordCount",setup(n,{slots:x}){const{mergedValueRef:t,maxlengthRef:A,mergedClsPrefixRef:R,countGraphemesRef:g}=tn(Ae),d=F(()=>{const{value:s}=t;return s===null||Array.isArray(s)?0:(g.value||Rn)(s)});return()=>{const{value:s}=A,{value:u}=t;return a("span",{class:`${R.value}-input-word-count`},an(x.default,{value:u===null||Array.isArray(u)?"":u},()=>[s===void 0?d.value:`${d.value} / ${s}`]))}}}),Fn=b("input",`
 max-width: 100%;
 cursor: text;
 line-height: 1.5;
 z-index: auto;
 outline: none;
 box-sizing: border-box;
 position: relative;
 display: inline-flex;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color .3s var(--n-bezier);
 font-size: var(--n-font-size);
 --n-padding-vertical: calc((var(--n-height) - 1.5 * var(--n-font-size)) / 2);
`,[l("input, textarea",`
 overflow: hidden;
 flex-grow: 1;
 position: relative;
 `),l("input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder",`
 box-sizing: border-box;
 font-size: inherit;
 line-height: 1.5;
 font-family: inherit;
 border: none;
 outline: none;
 background-color: #0000;
 text-align: inherit;
 transition:
 -webkit-text-fill-color .3s var(--n-bezier),
 caret-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 text-decoration-color .3s var(--n-bezier);
 `),l("input-el, textarea-el",`
 -webkit-appearance: none;
 scrollbar-width: none;
 width: 100%;
 min-width: 0;
 text-decoration-color: var(--n-text-decoration-color);
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 background-color: transparent;
 `,[C("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",`
 width: 0;
 height: 0;
 display: none;
 `),C("&::placeholder",`
 color: #0000;
 -webkit-text-fill-color: transparent !important;
 `),C("&:-webkit-autofill ~",[l("placeholder","display: none;")])]),z("round",[j("textarea","border-radius: calc(var(--n-height) / 2);")]),l("placeholder",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: hidden;
 color: var(--n-placeholder-color);
 `,[C("span",`
 width: 100%;
 display: inline-block;
 `)]),z("textarea",[l("placeholder","overflow: visible;")]),j("autosize","width: 100%;"),z("autosize",[l("textarea-el, input-el",`
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 `)]),b("input-wrapper",`
 overflow: hidden;
 display: inline-flex;
 flex-grow: 1;
 position: relative;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 `),l("input-mirror",`
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre;
 pointer-events: none;
 `),l("input-el",`
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 `,[C("+",[l("placeholder",`
 display: flex;
 align-items: center; 
 `)])]),j("textarea",[l("placeholder","white-space: nowrap;")]),l("eye",`
 transition: color .3s var(--n-bezier);
 `),z("textarea","width: 100%;",[b("input-word-count",`
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `),z("resizable",[b("input-wrapper",`
 resize: vertical;
 min-height: var(--n-height);
 `)]),l("textarea-el, textarea-mirror, placeholder",`
 height: 100%;
 padding-left: 0;
 padding-right: 0;
 padding-top: var(--n-padding-vertical);
 padding-bottom: var(--n-padding-vertical);
 word-break: break-word;
 display: inline-block;
 vertical-align: bottom;
 box-sizing: border-box;
 line-height: var(--n-line-height-textarea);
 margin: 0;
 resize: none;
 white-space: pre-wrap;
 `),l("textarea-mirror",`
 width: 100%;
 pointer-events: none;
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre-wrap;
 overflow-wrap: break-word;
 `)]),z("pair",[l("input-el, placeholder","text-align: center;"),l("separator",`
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 white-space: nowrap;
 `,[b("icon",`
 color: var(--n-icon-color);
 `),b("base-icon",`
 color: var(--n-icon-color);
 `)])]),z("disabled",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[l("border","border: var(--n-border-disabled);"),l("input-el, textarea-el",`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `),l("placeholder","color: var(--n-placeholder-color-disabled);"),l("separator","color: var(--n-text-color-disabled);",[b("icon",`
 color: var(--n-icon-color-disabled);
 `),b("base-icon",`
 color: var(--n-icon-color-disabled);
 `)]),b("input-word-count",`
 color: var(--n-count-text-color-disabled);
 `),l("suffix, prefix","color: var(--n-text-color-disabled);",[b("icon",`
 color: var(--n-icon-color-disabled);
 `),b("internal-icon",`
 color: var(--n-icon-color-disabled);
 `)])]),j("disabled",[l("eye",`
 display: flex;
 align-items: center;
 justify-content: center;
 color: var(--n-icon-color);
 cursor: pointer;
 `,[C("&:hover",`
 color: var(--n-icon-color-hover);
 `),C("&:active",`
 color: var(--n-icon-color-pressed);
 `)]),C("&:hover",[l("state-border","border: var(--n-border-hover);")]),z("focus","background-color: var(--n-color-focus);",[l("state-border",`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),l("border, state-border",`
 box-sizing: border-box;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: inherit;
 border: var(--n-border);
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),l("state-border",`
 border-color: #0000;
 z-index: 1;
 `),l("prefix","margin-right: 4px;"),l("suffix",`
 margin-left: 4px;
 `),l("suffix, prefix",`
 transition: color .3s var(--n-bezier);
 flex-wrap: nowrap;
 flex-shrink: 0;
 line-height: var(--n-height);
 white-space: nowrap;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 color: var(--n-suffix-text-color);
 `,[b("base-loading",`
 font-size: var(--n-icon-size);
 margin: 0 2px;
 color: var(--n-loading-color);
 `),b("base-clear",`
 font-size: var(--n-icon-size);
 `,[l("placeholder",[b("base-icon",`
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)])]),C(">",[b("icon",`
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)]),b("base-icon",`
 font-size: var(--n-icon-size);
 `)]),b("input-word-count",`
 pointer-events: none;
 line-height: 1.5;
 font-size: .85em;
 color: var(--n-count-text-color);
 transition: color .3s var(--n-bezier);
 margin-left: 4px;
 font-variant: tabular-nums;
 `),["warning","error"].map(n=>z(`${n}-status`,[j("disabled",[b("base-loading",`
 color: var(--n-loading-color-${n})
 `),l("input-el, textarea-el",`
 caret-color: var(--n-caret-color-${n});
 `),l("state-border",`
 border: var(--n-border-${n});
 `),C("&:hover",[l("state-border",`
 border: var(--n-border-hover-${n});
 `)]),C("&:focus",`
 background-color: var(--n-color-focus-${n});
 `,[l("state-border",`
 box-shadow: var(--n-box-shadow-focus-${n});
 border: var(--n-border-focus-${n});
 `)]),z("focus",`
 background-color: var(--n-color-focus-${n});
 `,[l("state-border",`
 box-shadow: var(--n-box-shadow-focus-${n});
 border: var(--n-border-focus-${n});
 `)])])]))]),Bn=b("input",[z("disabled",[l("input-el, textarea-el",`
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `)])]),En=Object.assign(Object.assign({},Se.props),{bordered:{type:Boolean,default:void 0},type:{type:String,default:"text"},placeholder:[Array,String],defaultValue:{type:[String,Array],default:null},value:[String,Array],disabled:{type:Boolean,default:void 0},size:String,rows:{type:[Number,String],default:3},round:Boolean,minlength:[String,Number],maxlength:[String,Number],clearable:Boolean,autosize:{type:[Boolean,Object],default:!1},pair:Boolean,separator:String,readonly:{type:[String,Boolean],default:!1},passivelyActivated:Boolean,showPasswordOn:String,stateful:{type:Boolean,default:!0},autofocus:Boolean,inputProps:Object,resizable:{type:Boolean,default:!0},showCount:Boolean,loading:{type:Boolean,default:void 0},allowInput:Function,renderCount:Function,onMousedown:Function,onKeydown:Function,onKeyup:Function,onInput:[Function,Array],onFocus:[Function,Array],onBlur:[Function,Array],onClick:[Function,Array],onChange:[Function,Array],onClear:[Function,Array],countGraphemes:Function,status:String,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],textDecoration:[String,Array],attrSize:{type:Number,default:20},onInputBlur:[Function,Array],onInputFocus:[Function,Array],onDeactivate:[Function,Array],onActivate:[Function,Array],onWrapperFocus:[Function,Array],onWrapperBlur:[Function,Array],internalDeactivateOnEnter:Boolean,internalForceFocus:Boolean,internalLoadingBeforeSuffix:Boolean,showPasswordToggle:Boolean}),Pn=Q({name:"Input",props:En,setup(n){const{mergedClsPrefixRef:x,mergedBorderedRef:t,inlineThemeDisabled:A,mergedRtlRef:R}=ln(n),g=Se("Input","-input",Fn,Cn,n,x);sn&&cn("-input-safari",Bn,x);const d=w(null),s=w(null),u=w(null),c=w(null),i=w(null),v=w(null),m=w(null),I=_n(m),S=w(null),{localeRef:Re}=un("Input"),U=w(n.defaultValue),_e=pe(n,"value"),_=dn(_e,U),V=fn(n),{mergedSizeRef:ee,mergedDisabledRef:T,mergedStatusRef:Fe}=V,k=w(!1),W=w(!1),B=w(!1),D=w(!1);let oe=null;const ne=F(()=>{const{placeholder:e,pair:o}=n;return o?Array.isArray(e)?e:e===void 0?["",""]:[e,e]:e===void 0?[Re.value.placeholder]:[e]}),Be=F(()=>{const{value:e}=B,{value:o}=_,{value:r}=ne;return!e&&(J(o)||Array.isArray(o)&&J(o[0]))&&r[0]}),Ee=F(()=>{const{value:e}=B,{value:o}=_,{value:r}=ne;return!e&&r[1]&&(J(o)||Array.isArray(o)&&J(o[1]))}),re=ge(()=>n.internalForceFocus||k.value),$e=ge(()=>{if(T.value||n.readonly||!n.clearable||!re.value&&!W.value)return!1;const{value:e}=_,{value:o}=re;return n.pair?!!(Array.isArray(e)&&(e[0]||e[1]))&&(W.value||o):!!e&&(W.value||o)}),te=F(()=>{const{showPasswordOn:e}=n;if(e)return e;if(n.showPasswordToggle)return"click"}),O=w(!1),Pe=F(()=>{const{textDecoration:e}=n;return e?Array.isArray(e)?e.map(o=>({textDecoration:o})):[{textDecoration:e}]:["",""]}),de=w(void 0),Ie=()=>{var e,o;if(n.type==="textarea"){const{autosize:r}=n;if(r&&(de.value=(o=(e=S.value)===null||e===void 0?void 0:e.$el)===null||o===void 0?void 0:o.offsetWidth),!s.value||typeof r=="boolean")return;const{paddingTop:h,paddingBottom:p,lineHeight:f}=window.getComputedStyle(s.value),E=Number(h.slice(0,-2)),$=Number(p.slice(0,-2)),P=Number(f.slice(0,-2)),{value:N}=u;if(!N)return;if(r.minRows){const H=Math.max(r.minRows,1),le=`${E+$+P*H}px`;N.style.minHeight=le}if(r.maxRows){const H=`${E+$+P*r.maxRows}px`;N.style.maxHeight=H}}},Te=F(()=>{const{maxlength:e}=n;return e===void 0?void 0:Number(e)});hn(()=>{const{value:e}=_;Array.isArray(e)||ie(e)});const ke=vn().proxy;function K(e){const{onUpdateValue:o,"onUpdate:value":r,onInput:h}=n,{nTriggerFormInput:p}=V;o&&y(o,e),r&&y(r,e),h&&y(h,e),U.value=e,p()}function L(e){const{onChange:o}=n,{nTriggerFormChange:r}=V;o&&y(o,e),U.value=e,r()}function Me(e){const{onBlur:o}=n,{nTriggerFormBlur:r}=V;o&&y(o,e),r()}function Ve(e){const{onFocus:o}=n,{nTriggerFormFocus:r}=V;o&&y(o,e),r()}function We(e){const{onClear:o}=n;o&&y(o,e)}function De(e){const{onInputBlur:o}=n;o&&y(o,e)}function Oe(e){const{onInputFocus:o}=n;o&&y(o,e)}function Ne(){const{onDeactivate:e}=n;e&&y(e)}function He(){const{onActivate:e}=n;e&&y(e)}function je(e){const{onClick:o}=n;o&&y(o,e)}function Ue(e){const{onWrapperFocus:o}=n;o&&y(o,e)}function Ke(e){const{onWrapperBlur:o}=n;o&&y(o,e)}function Le(){B.value=!0}function Ge(e){B.value=!1,e.target===v.value?G(e,1):G(e,0)}function G(e,o=0,r="input"){const h=e.target.value;if(ie(h),e instanceof InputEvent&&!e.isComposing&&(B.value=!1),n.type==="textarea"){const{value:f}=S;f&&f.syncUnifiedContainer()}if(oe=h,B.value)return;I.recordCursor();const p=Xe(h);if(p)if(!n.pair)r==="input"?K(h):L(h);else{let{value:f}=_;Array.isArray(f)?f=[f[0],f[1]]:f=["",""],f[o]=h,r==="input"?K(f):L(f)}ke.$forceUpdate(),p||xe(I.restoreCursor)}function Xe(e){const{countGraphemes:o,maxlength:r,minlength:h}=n;if(o){let f;if(r!==void 0&&(f===void 0&&(f=o(e)),f>Number(r))||h!==void 0&&(f===void 0&&(f=o(e)),f<Number(r)))return!1}const{allowInput:p}=n;return typeof p=="function"?p(e):!0}function Ye(e){De(e),e.relatedTarget===d.value&&Ne(),e.relatedTarget!==null&&(e.relatedTarget===i.value||e.relatedTarget===v.value||e.relatedTarget===s.value)||(D.value=!1),X(e,"blur"),m.value=null}function Ze(e,o){Oe(e),k.value=!0,D.value=!0,He(),X(e,"focus"),o===0?m.value=i.value:o===1?m.value=v.value:o===2&&(m.value=s.value)}function qe(e){n.passivelyActivated&&(Ke(e),X(e,"blur"))}function Je(e){n.passivelyActivated&&(k.value=!0,Ue(e),X(e,"focus"))}function X(e,o){e.relatedTarget!==null&&(e.relatedTarget===i.value||e.relatedTarget===v.value||e.relatedTarget===s.value||e.relatedTarget===d.value)||(o==="focus"?(Ve(e),k.value=!0):o==="blur"&&(Me(e),k.value=!1))}function Qe(e,o){G(e,o,"change")}function eo(e){je(e)}function oo(e){We(e),n.pair?(K(["",""]),L(["",""])):(K(""),L(""))}function no(e){const{onMousedown:o}=n;o&&o(e);const{tagName:r}=e.target;if(r!=="INPUT"&&r!=="TEXTAREA"){if(n.resizable){const{value:h}=d;if(h){const{left:p,top:f,width:E,height:$}=h.getBoundingClientRect(),P=14;if(p+E-P<e.clientX&&e.clientX<p+E&&f+$-P<e.clientY&&e.clientY<f+$)return}}e.preventDefault(),k.value||fe()}}function ro(){var e;W.value=!0,n.type==="textarea"&&((e=S.value)===null||e===void 0||e.handleMouseEnterWrapper())}function to(){var e;W.value=!1,n.type==="textarea"&&((e=S.value)===null||e===void 0||e.handleMouseLeaveWrapper())}function ao(){T.value||te.value==="click"&&(O.value=!O.value)}function io(e){if(T.value)return;e.preventDefault();const o=h=>{h.preventDefault(),Ce("mouseup",document,o)};if(me("mouseup",document,o),te.value!=="mousedown")return;O.value=!0;const r=()=>{O.value=!1,Ce("mouseup",document,r)};me("mouseup",document,r)}function lo(e){var o;switch((o=n.onKeydown)===null||o===void 0||o.call(n,e),e.key){case"Escape":ae();break;case"Enter":so(e);break}}function so(e){var o,r;if(n.passivelyActivated){const{value:h}=D;if(h){n.internalDeactivateOnEnter&&ae();return}e.preventDefault(),n.type==="textarea"?(o=s.value)===null||o===void 0||o.focus():(r=i.value)===null||r===void 0||r.focus()}}function ae(){n.passivelyActivated&&(D.value=!1,xe(()=>{var e;(e=d.value)===null||e===void 0||e.focus()}))}function fe(){var e,o,r;T.value||(n.passivelyActivated?(e=d.value)===null||e===void 0||e.focus():((o=s.value)===null||o===void 0||o.focus(),(r=i.value)===null||r===void 0||r.focus()))}function co(){var e;!((e=d.value)===null||e===void 0)&&e.contains(document.activeElement)&&document.activeElement.blur()}function uo(){var e,o;(e=s.value)===null||e===void 0||e.select(),(o=i.value)===null||o===void 0||o.select()}function fo(){T.value||(s.value?s.value.focus():i.value&&i.value.focus())}function ho(){const{value:e}=d;e!=null&&e.contains(document.activeElement)&&e!==document.activeElement&&ae()}function vo(e){if(n.type==="textarea"){const{value:o}=s;o==null||o.scrollTo(e)}else{const{value:o}=i;o==null||o.scrollTo(e)}}function ie(e){const{type:o,pair:r,autosize:h}=n;if(!r&&h)if(o==="textarea"){const{value:p}=u;p&&(p.textContent=(e??"")+`\r
`)}else{const{value:p}=c;p&&(e?p.textContent=e:p.innerHTML="&nbsp;")}}function po(){Ie()}const he=w({top:"0"});function go(e){var o;const{scrollTop:r}=e.target;he.value.top=`${-r}px`,(o=S.value)===null||o===void 0||o.syncUnifiedContainer()}let Y=null;be(()=>{const{autosize:e,type:o}=n;e&&o==="textarea"?Y=ue(_,r=>{!Array.isArray(r)&&r!==oe&&ie(r)}):Y==null||Y()});let Z=null;be(()=>{n.type==="textarea"?Z=ue(_,e=>{var o;!Array.isArray(e)&&e!==oe&&((o=S.value)===null||o===void 0||o.syncUnifiedContainer())}):Z==null||Z()}),pn(Ae,{mergedValueRef:_,maxlengthRef:Te,mergedClsPrefixRef:x,countGraphemesRef:pe(n,"countGraphemes")});const bo={wrapperElRef:d,inputElRef:i,textareaElRef:s,isCompositing:B,focus:fe,blur:co,select:uo,deactivate:ho,activate:fo,scrollTo:vo},xo=gn("Input",R,x),ve=F(()=>{const{value:e}=ee,{common:{cubicBezierEaseInOut:o},self:{color:r,borderRadius:h,textColor:p,caretColor:f,caretColorError:E,caretColorWarning:$,textDecorationColor:P,border:N,borderDisabled:H,borderHover:le,borderFocus:mo,placeholderColor:wo,placeholderColorDisabled:yo,lineHeightTextarea:Co,colorDisabled:zo,colorFocus:So,textColorDisabled:Ao,boxShadowFocus:Ro,iconSize:_o,colorFocusWarning:Fo,boxShadowFocusWarning:Bo,borderWarning:Eo,borderFocusWarning:$o,borderHoverWarning:Po,colorFocusError:Io,boxShadowFocusError:To,borderError:ko,borderFocusError:Mo,borderHoverError:Vo,clearSize:Wo,clearColor:Do,clearColorHover:Oo,clearColorPressed:No,iconColor:Ho,iconColorDisabled:jo,suffixTextColor:Uo,countTextColor:Ko,countTextColorDisabled:Lo,iconColorHover:Go,iconColorPressed:Xo,loadingColor:Yo,loadingColorError:Zo,loadingColorWarning:qo,[ce("padding",e)]:Jo,[ce("fontSize",e)]:Qo,[ce("height",e)]:en}}=g.value,{left:on,right:nn}=zn(Jo);return{"--n-bezier":o,"--n-count-text-color":Ko,"--n-count-text-color-disabled":Lo,"--n-color":r,"--n-font-size":Qo,"--n-border-radius":h,"--n-height":en,"--n-padding-left":on,"--n-padding-right":nn,"--n-text-color":p,"--n-caret-color":f,"--n-text-decoration-color":P,"--n-border":N,"--n-border-disabled":H,"--n-border-hover":le,"--n-border-focus":mo,"--n-placeholder-color":wo,"--n-placeholder-color-disabled":yo,"--n-icon-size":_o,"--n-line-height-textarea":Co,"--n-color-disabled":zo,"--n-color-focus":So,"--n-text-color-disabled":Ao,"--n-box-shadow-focus":Ro,"--n-loading-color":Yo,"--n-caret-color-warning":$,"--n-color-focus-warning":Fo,"--n-box-shadow-focus-warning":Bo,"--n-border-warning":Eo,"--n-border-focus-warning":$o,"--n-border-hover-warning":Po,"--n-loading-color-warning":qo,"--n-caret-color-error":E,"--n-color-focus-error":Io,"--n-box-shadow-focus-error":To,"--n-border-error":ko,"--n-border-focus-error":Mo,"--n-border-hover-error":Vo,"--n-loading-color-error":Zo,"--n-clear-color":Do,"--n-clear-size":Wo,"--n-clear-color-hover":Oo,"--n-clear-color-pressed":No,"--n-icon-color":Ho,"--n-icon-color-hover":Go,"--n-icon-color-pressed":Xo,"--n-icon-color-disabled":jo,"--n-suffix-text-color":Uo}}),M=A?bn("input",F(()=>{const{value:e}=ee;return e[0]}),ve,n):void 0;return Object.assign(Object.assign({},bo),{wrapperElRef:d,inputElRef:i,inputMirrorElRef:c,inputEl2Ref:v,textareaElRef:s,textareaMirrorElRef:u,textareaScrollbarInstRef:S,rtlEnabled:xo,uncontrolledValue:U,mergedValue:_,passwordVisible:O,mergedPlaceholder:ne,showPlaceholder1:Be,showPlaceholder2:Ee,mergedFocus:re,isComposing:B,activated:D,showClearButton:$e,mergedSize:ee,mergedDisabled:T,textDecorationStyle:Pe,mergedClsPrefix:x,mergedBordered:t,mergedShowPasswordOn:te,placeholderStyle:he,mergedStatus:Fe,textAreaScrollContainerWidth:de,handleTextAreaScroll:go,handleCompositionStart:Le,handleCompositionEnd:Ge,handleInput:G,handleInputBlur:Ye,handleInputFocus:Ze,handleWrapperBlur:qe,handleWrapperFocus:Je,handleMouseEnter:ro,handleMouseLeave:to,handleMouseDown:no,handleChange:Qe,handleClick:eo,handleClear:oo,handlePasswordToggleClick:ao,handlePasswordToggleMousedown:io,handleWrapperKeydown:lo,handleTextAreaMirrorResize:po,getTextareaScrollContainer:()=>s.value,mergedTheme:g,cssVars:A?void 0:ve,themeClass:M==null?void 0:M.themeClass,onRender:M==null?void 0:M.onRender})},render(){var n,x;const{mergedClsPrefix:t,mergedStatus:A,themeClass:R,type:g,countGraphemes:d,onRender:s}=this,u=this.$slots;return s==null||s(),a("div",{ref:"wrapperElRef",class:[`${t}-input`,R,A&&`${t}-input--${A}-status`,{[`${t}-input--rtl`]:this.rtlEnabled,[`${t}-input--disabled`]:this.mergedDisabled,[`${t}-input--textarea`]:g==="textarea",[`${t}-input--resizable`]:this.resizable&&!this.autosize,[`${t}-input--autosize`]:this.autosize,[`${t}-input--round`]:this.round&&g!=="textarea",[`${t}-input--pair`]:this.pair,[`${t}-input--focus`]:this.mergedFocus,[`${t}-input--stateful`]:this.stateful}],style:this.cssVars,tabindex:!this.mergedDisabled&&this.passivelyActivated&&!this.activated?0:void 0,onFocus:this.handleWrapperFocus,onBlur:this.handleWrapperBlur,onClick:this.handleClick,onMousedown:this.handleMouseDown,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd,onKeyup:this.onKeyup,onKeydown:this.handleWrapperKeydown},a("div",{class:`${t}-input-wrapper`},q(u.prefix,c=>c&&a("div",{class:`${t}-input__prefix`},c)),g==="textarea"?a(xn,{ref:"textareaScrollbarInstRef",class:`${t}-input__textarea`,container:this.getTextareaScrollContainer,triggerDisplayManually:!0,useUnifiedContainer:!0,internalHoistYRail:!0},{default:()=>{var c,i;const{textAreaScrollContainerWidth:v}=this,m={width:this.autosize&&v&&`${v}px`};return a(mn,null,a("textarea",Object.assign({},this.inputProps,{ref:"textareaElRef",class:[`${t}-input__textarea-el`,(c=this.inputProps)===null||c===void 0?void 0:c.class],autofocus:this.autofocus,rows:Number(this.rows),placeholder:this.placeholder,value:this.mergedValue,disabled:this.mergedDisabled,maxlength:d?void 0:this.maxlength,minlength:d?void 0:this.minlength,readonly:this.readonly,tabindex:this.passivelyActivated&&!this.activated?-1:void 0,style:[this.textDecorationStyle[0],(i=this.inputProps)===null||i===void 0?void 0:i.style,m],onBlur:this.handleInputBlur,onFocus:I=>this.handleInputFocus(I,2),onInput:this.handleInput,onChange:this.handleChange,onScroll:this.handleTextAreaScroll})),this.showPlaceholder1?a("div",{class:`${t}-input__placeholder`,style:[this.placeholderStyle,m],key:"placeholder"},this.mergedPlaceholder[0]):null,this.autosize?a(wn,{onResize:this.handleTextAreaMirrorResize},{default:()=>a("div",{ref:"textareaMirrorElRef",class:`${t}-input__textarea-mirror`,key:"mirror"})}):null)}}):a("div",{class:`${t}-input__input`},a("input",Object.assign({type:g==="password"&&this.mergedShowPasswordOn&&this.passwordVisible?"text":g},this.inputProps,{ref:"inputElRef",class:[`${t}-input__input-el`,(n=this.inputProps)===null||n===void 0?void 0:n.class],style:[this.textDecorationStyle[0],(x=this.inputProps)===null||x===void 0?void 0:x.style],tabindex:this.passivelyActivated&&!this.activated?-1:void 0,placeholder:this.mergedPlaceholder[0],disabled:this.mergedDisabled,maxlength:d?void 0:this.maxlength,minlength:d?void 0:this.minlength,value:Array.isArray(this.mergedValue)?this.mergedValue[0]:this.mergedValue,readonly:this.readonly,autofocus:this.autofocus,size:this.attrSize,onBlur:this.handleInputBlur,onFocus:c=>this.handleInputFocus(c,0),onInput:c=>this.handleInput(c,0),onChange:c=>this.handleChange(c,0)})),this.showPlaceholder1?a("div",{class:`${t}-input__placeholder`},a("span",null,this.mergedPlaceholder[0])):null,this.autosize?a("div",{class:`${t}-input__input-mirror`,key:"mirror",ref:"inputMirrorElRef"}," "):null),!this.pair&&q(u.suffix,c=>c||this.clearable||this.showCount||this.mergedShowPasswordOn||this.loading!==void 0?a("div",{class:`${t}-input__suffix`},[q(u["clear-icon-placeholder"],i=>(this.clearable||i)&&a(we,{clsPrefix:t,show:this.showClearButton,onClear:this.handleClear},{placeholder:()=>i,icon:()=>{var v,m;return(m=(v=this.$slots)["clear-icon"])===null||m===void 0?void 0:m.call(v)}})),this.internalLoadingBeforeSuffix?null:c,this.loading!==void 0?a(yn,{clsPrefix:t,loading:this.loading,showArrow:!1,showClear:!1,style:this.cssVars}):null,this.internalLoadingBeforeSuffix?c:null,this.showCount&&this.type!=="textarea"?a(ze,null,{default:i=>{var v;return(v=u.count)===null||v===void 0?void 0:v.call(u,i)}}):null,this.mergedShowPasswordOn&&this.type==="password"?a("div",{class:`${t}-input__eye`,onMousedown:this.handlePasswordToggleMousedown,onClick:this.handlePasswordToggleClick},this.passwordVisible?se(u["password-visible-icon"],()=>[a(ye,{clsPrefix:t},{default:()=>a(Sn,null)})]):se(u["password-invisible-icon"],()=>[a(ye,{clsPrefix:t},{default:()=>a(An,null)})])):null]):null)),this.pair?a("span",{class:`${t}-input__separator`},se(u.separator,()=>[this.separator])):null,this.pair?a("div",{class:`${t}-input-wrapper`},a("div",{class:`${t}-input__input`},a("input",{ref:"inputEl2Ref",type:this.type,class:`${t}-input__input-el`,tabindex:this.passivelyActivated&&!this.activated?-1:void 0,placeholder:this.mergedPlaceholder[1],disabled:this.mergedDisabled,maxlength:d?void 0:this.maxlength,minlength:d?void 0:this.minlength,value:Array.isArray(this.mergedValue)?this.mergedValue[1]:void 0,readonly:this.readonly,style:this.textDecorationStyle[1],onBlur:this.handleInputBlur,onFocus:c=>this.handleInputFocus(c,1),onInput:c=>this.handleInput(c,1),onChange:c=>this.handleChange(c,1)}),this.showPlaceholder2?a("div",{class:`${t}-input__placeholder`},a("span",null,this.mergedPlaceholder[1])):null),q(u.suffix,c=>(this.clearable||c)&&a("div",{class:`${t}-input__suffix`},[this.clearable&&a(we,{clsPrefix:t,show:this.showClearButton,onClear:this.handleClear},{icon:()=>{var i;return(i=u["clear-icon"])===null||i===void 0?void 0:i.call(u)},placeholder:()=>{var i;return(i=u["clear-icon-placeholder"])===null||i===void 0?void 0:i.call(u)}}),c]))):null,this.mergedBordered?a("div",{class:`${t}-input__border`}):null,this.mergedBordered?a("div",{class:`${t}-input__state-border`}):null,this.showCount&&g==="textarea"?a(ze,null,{default:c=>{var i;const{renderCount:v}=this;return v?v(c):(i=u.count)===null||i===void 0?void 0:i.call(u,c)}}):null)}});export{Pn as N};
