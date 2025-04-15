import{q as G,v as Q,x as H,r as S,k as c,E as X,bY as Z,c as ee,a as E,b as y,w as z,u as C,F as oe,o as B,bJ as W,f as re,d as A,h as te,i as ne}from"./index-DYvk49EB.js";import{b as se,A as x,x as w,d as T,D as g,m as R,l as le,u as F,r as ae,e as ie,ad as ce,s as de,E as ue,aj as ge,av as pe,w as f,t as he,g as ve,N,a as fe}from"./Button-V9_vzQNf.js";import{f as me,E as be,W as Ce,I as xe,S as we}from"./fade-in-height-expand.cssr-AuuYbEMb.js";import{N as L,a as Ie}from"./FormItem-Kea7gmpp.js";const ye={iconMargin:"11px 8px 0 12px",iconMarginRtl:"11px 12px 0 8px",iconSize:"24px",closeIconSize:"16px",closeSize:"20px",closeMargin:"13px 14px 0 0",closeMarginRtl:"13px 0 0 14px",padding:"13px"},ze=l=>{const{lineHeight:r,borderRadius:i,fontWeightStrong:m,baseColor:n,dividerColor:d,actionColor:_,textColor1:p,textColor2:a,closeColorHover:h,closeColorPressed:u,closeIconColor:s,closeIconColorHover:t,closeIconColorPressed:e,infoColor:o,successColor:b,warningColor:I,errorColor:k,fontSize:P}=l;return Object.assign(Object.assign({},ye),{fontSize:P,lineHeight:r,titleFontWeight:m,borderRadius:i,border:`1px solid ${d}`,color:_,titleTextColor:p,iconColor:a,contentTextColor:a,closeBorderRadius:i,closeColorHover:h,closeColorPressed:u,closeIconColor:s,closeIconColorHover:t,closeIconColorPressed:e,borderInfo:`1px solid ${x(n,w(o,{alpha:.25}))}`,colorInfo:x(n,w(o,{alpha:.08})),titleTextColorInfo:p,iconColorInfo:o,contentTextColorInfo:a,closeColorHoverInfo:h,closeColorPressedInfo:u,closeIconColorInfo:s,closeIconColorHoverInfo:t,closeIconColorPressedInfo:e,borderSuccess:`1px solid ${x(n,w(b,{alpha:.25}))}`,colorSuccess:x(n,w(b,{alpha:.08})),titleTextColorSuccess:p,iconColorSuccess:b,contentTextColorSuccess:a,closeColorHoverSuccess:h,closeColorPressedSuccess:u,closeIconColorSuccess:s,closeIconColorHoverSuccess:t,closeIconColorPressedSuccess:e,borderWarning:`1px solid ${x(n,w(I,{alpha:.33}))}`,colorWarning:x(n,w(I,{alpha:.08})),titleTextColorWarning:p,iconColorWarning:I,contentTextColorWarning:a,closeColorHoverWarning:h,closeColorPressedWarning:u,closeIconColorWarning:s,closeIconColorHoverWarning:t,closeIconColorPressedWarning:e,borderError:`1px solid ${x(n,w(k,{alpha:.25}))}`,colorError:x(n,w(k,{alpha:.08})),titleTextColorError:p,iconColorError:k,contentTextColorError:a,closeColorHoverError:h,closeColorPressedError:u,closeIconColorError:s,closeIconColorHoverError:t,closeIconColorPressedError:e})},Te={name:"Alert",common:se,self:ze},_e=Te,ke=T("alert",`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[g("border",`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),R("closable",[T("alert-body",[g("title",`
 padding-right: 24px;
 `)])]),g("icon",{color:"var(--n-icon-color)"}),T("alert-body",{padding:"var(--n-padding)"},[g("title",{color:"var(--n-title-text-color)"}),g("content",{color:"var(--n-content-text-color)"})]),me({originalTransition:"transform .3s var(--n-bezier)",enterToProps:{transform:"scale(1)"},leaveToProps:{transform:"scale(0.9)"}}),g("icon",`
 position: absolute;
 left: 0;
 top: 0;
 align-items: center;
 justify-content: center;
 display: flex;
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 margin: var(--n-icon-margin);
 `),g("close",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),R("show-icon",[T("alert-body",{paddingLeft:"calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))"})]),R("right-adjust",[T("alert-body",{paddingRight:"calc(var(--n-close-size) + var(--n-padding) + 2px)"})]),T("alert-body",`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[g("title",`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[le("& +",[g("content",{marginTop:"9px"})])]),g("content",{transition:"color .3s var(--n-bezier)",fontSize:"var(--n-font-size)"})]),g("icon",{transition:"color .3s var(--n-bezier)"})]),Se=Object.assign(Object.assign({},F.props),{title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:"default"},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function}),Ee=G({name:"Alert",inheritAttrs:!1,props:Se,setup(l){const{mergedClsPrefixRef:r,mergedBorderedRef:i,inlineThemeDisabled:m,mergedRtlRef:n}=Q(l),d=F("Alert","-alert",ke,_e,l,r),_=ae("Alert",n,r),p=H(()=>{const{common:{cubicBezierEaseInOut:e},self:o}=d.value,{fontSize:b,borderRadius:I,titleFontWeight:k,lineHeight:P,iconSize:M,iconMargin:$,iconMarginRtl:V,closeIconSize:j,closeBorderRadius:D,closeSize:O,closeMargin:K,closeMarginRtl:U,padding:q}=o,{type:v}=l,{left:J,right:Y}=pe($);return{"--n-bezier":e,"--n-color":o[f("color",v)],"--n-close-icon-size":j,"--n-close-border-radius":D,"--n-close-color-hover":o[f("closeColorHover",v)],"--n-close-color-pressed":o[f("closeColorPressed",v)],"--n-close-icon-color":o[f("closeIconColor",v)],"--n-close-icon-color-hover":o[f("closeIconColorHover",v)],"--n-close-icon-color-pressed":o[f("closeIconColorPressed",v)],"--n-icon-color":o[f("iconColor",v)],"--n-border":o[f("border",v)],"--n-title-text-color":o[f("titleTextColor",v)],"--n-content-text-color":o[f("contentTextColor",v)],"--n-line-height":P,"--n-border-radius":I,"--n-font-size":b,"--n-title-font-weight":k,"--n-icon-size":M,"--n-icon-margin":$,"--n-icon-margin-rtl":V,"--n-close-size":O,"--n-close-margin":K,"--n-close-margin-rtl":U,"--n-padding":q,"--n-icon-margin-left":J,"--n-icon-margin-right":Y}}),a=m?ie("alert",H(()=>l.type[0]),p,l):void 0,h=S(!0),u=()=>{const{onAfterLeave:e,onAfterHide:o}=l;e&&e(),o&&o()};return{rtlEnabled:_,mergedClsPrefix:r,mergedBordered:i,visible:h,handleCloseClick:()=>{var e;Promise.resolve((e=l.onClose)===null||e===void 0?void 0:e.call(l)).then(o=>{o!==!1&&(h.value=!1)})},handleAfterLeave:()=>{u()},mergedTheme:d,cssVars:m?void 0:p,themeClass:a==null?void 0:a.themeClass,onRender:a==null?void 0:a.onRender}},render(){var l;return(l=this.onRender)===null||l===void 0||l.call(this),c(ge,{onAfterLeave:this.handleAfterLeave},{default:()=>{const{mergedClsPrefix:r,$slots:i}=this,m={class:[`${r}-alert`,this.themeClass,this.closable&&`${r}-alert--closable`,this.showIcon&&`${r}-alert--show-icon`,!this.title&&this.closable&&`${r}-alert--right-adjust`,this.rtlEnabled&&`${r}-alert--rtl`],style:this.cssVars,role:"alert"};return this.visible?c("div",Object.assign({},X(this.$attrs,m)),this.closable&&c(ce,{clsPrefix:r,class:`${r}-alert__close`,onClick:this.handleCloseClick}),this.bordered&&c("div",{class:`${r}-alert__border`}),this.showIcon&&c("div",{class:`${r}-alert__icon`,"aria-hidden":"true"},de(i.icon,()=>[c(he,{clsPrefix:r},{default:()=>{switch(this.type){case"success":return c(we,null);case"info":return c(xe,null);case"warning":return c(Ce,null);case"error":return c(be,null);default:return null}}})])),c("div",{class:[`${r}-alert-body`,this.mergedBordered&&`${r}-alert-body--bordered`]},ue(i.header,n=>{const d=n||this.title;return d?c("div",{class:`${r}-alert-body__title`},d):null}),i.default&&c("div",{class:`${r}-alert-body__content`},i))):null}})}}),Pe={class:"mt-3 mx-auto px-5",style:{"max-width":"900px"}},Re=E("h2",{class:"mb-3"},"後台登入",-1),$e=E("div",null,"英文只允許大寫",-1),He=E("div",null,null,-1),Le={__name:"LoginView",setup(l){const r=Z(),i=S(!1),m=S(null),n=S({account:"",password:""}),d=S(!1);function _(){d.value=!0,n.value.account=n.value.account.toUpperCase()}const p={account:[{required:!0,message:"請輸入帳號",trigger:"blur"}],password:[{required:!0,message:"請輸入密碼",trigger:"blur"}]};async function a(s,t){try{const e="https://backend-simulation.youbike.com.tw/member/login",o={account:s,password:t},b=await ne.post(e,o);if(!b.data||!b.data.token)throw new Error("未能獲取有效的JWT token");const{token:I}=b.data;return I}catch(e){throw new Error(e.response.data.message)}}function h(){const s=new Date;return console.log(s),new Date(s.getTime()+8*60*60*1e3).toString()}const u=async()=>{try{i.value=!1,await m.value.validate();const{account:s,password:t}=n.value,e=await a(s,t),o=h();document.cookie=`youbiketestBack=${e}; expires=${o};path=/;`,r.push("/from")}catch(s){s.message==="帳號非管理員"?(await new Promise(t=>setTimeout(function(){t()},500)),i.value=!0,console.error("帳號非管理員")):s.message==="帳號密碼錯誤"?(await new Promise(t=>setTimeout(function(){t()},500)),i.value=!0,console.error("帳號密碼錯誤")):console.error("無法完成登入，請稍後再試",s)}};return window.location.href="https://portal.youbike.com.tw/login",(s,t)=>(B(),ee(oe,null,[E("div",Pe,[Re,y(C(Ie),{ref_key:"formRef",ref:m,rules:p,size:"large",model:n.value},{default:z(()=>[y(C(L),{label:"帳號",path:"account"},{default:z(()=>[y(C(ve),{trigger:"click",show:d.value,"onUpdate:show":t[1]||(t[1]=e=>d.value=e)},{trigger:z(()=>[y(C(N),{value:n.value.account,"onUpdate:value":t[0]||(t[0]=e=>n.value.account=e),placeholder:"請輸入帳號",onInput:_,onKeyup:W(u,["enter"]),"input-props":{autocomplete:"username"}},null,8,["value"])]),default:z(()=>[$e]),_:1},8,["show"])]),_:1}),y(C(L),{label:"密碼",path:"password"},{default:z(()=>[y(C(N),{value:n.value.password,"onUpdate:value":t[2]||(t[2]=e=>n.value.password=e),placeholder:"請輸入密碼",type:"password","show-password-on":"mousedown",onKeyup:W(u,["enter"]),"input-props":{autocomplete:"current-password"}},null,8,["value"])]),_:1}),i.value?(B(),re(C(Ee),{key:0,title:"Error",type:"error",class:"mb-5"},{default:z(()=>[A(" 帳號密碼錯誤 ")]),_:1})):te("",!0),y(C(fe),{"attr-type":"button",type:"primary",onClick:u,class:"col-12 col-md-2"},{default:z(()=>[A(" 送出 ")]),_:1})]),_:1},8,["model"])]),He],64))}};export{Le as default};
