import{L as B}from"./index-Zs8OE-TM.js";import{E as z,b as D}from"./el-select-v2-uqbd0Xin.js";import{r,c as b,b as s,u,a as t,w,h as E,i as h,o as g,d as y}from"./index-1wNMdcX6.js";import{N as S}from"./Divider-b4MCFnvY.js";import{a as x,N as _}from"./Button-osvKZ-2c.js";const T={class:"container"},j=t("div",{class:"row mx-0 mt-3"},[t("h1",{class:"report-h1 fw-bold"},"分數角色管理")],-1),H={class:"row mx-0"},I={class:"col-6 mb-3"},M={key:0,class:"row mx-auto px-0"},O={class:"col-md-3"},P=t("label",{for:"labelname",class:"form-label fw-bolder"},"姓名",-1),A={class:"col-md-3 mt-2 mt-md-0"},F=t("label",{for:"labelid",class:"form-label fw-bolder"},"公號",-1),G={class:"col-md-3 mt-2 mt-md-0"},J=t("label",{for:"labelid",class:"form-label fw-bolder"},"目前角色",-1),K={class:"col-md-3 mt-2 mt-md-0"},Q=t("label",{for:"",class:"form-label fw-bolder"},"修改成的角色",-1),R={class:"col col-md-auto mt-3 d-flex flex-column justify-content-end"},le={__name:"PointroleView",setup(W){const c=r(!1),d=r([]),v=r([]),i=r(null),n=r(!1);function N(l){l!==""?(c.value=!0,setTimeout(()=>{c.value=!1,d.value=v.value.filter(e=>e.label.toLowerCase().includes(l.toLowerCase()))},200)):d.value=[]}async function k(){try{n.value=!0;const e=await h.get("https://backend-simulation.youbike.com.tw/user/users");return n.value=!1,e}catch(l){console.log(l)}}function V(l){v.value=l.data.map(e=>({label:`${e.user_id}-${e.user_name}-${e.role_id}`,value:`${e.user_id}-${e.user_name}-${e.role_id}`}))}const m=r(!1),o=r({user_name:null,user_id:null,role:null,editrole:"營運處"}),$=r([{label:"一般幕僚",value:"一般幕僚"},{label:"營運處",value:"營運處"}]);async function p(){o.value={user_name:null,user_id:null,role:null,editrole:"營運處"},i.value=null,v.value=[],d.value=[];const l=await k();V(l)}function C(){if(!i.value)return;const l=i.value.split("-"),[e,a,f]=l;o.value.user_name=a,o.value.user_id=e,o.value.role=f,m.value=!0}function U(){p(),m.value=!1}async function L(){try{const{user_id:l,editrole:e}=o.value;n.value=!0;const a="https://backend-simulation.youbike.com.tw/user/role",f={id:l,role:e};await h.patch(a,f),n.value=!1,U()}catch(l){console.log(l)}}return(async()=>await p())(),(l,e)=>(g(),b("div",T,[s(u(B),{active:n.value,"onUpdate:active":e[0]||(e[0]=a=>n.value=a),"can-cancel":!1,"is-full-page":!0},null,8,["active"]),j,t("div",H,[t("div",I,[s(u(z),{class:"me-3",modelValue:i.value,"onUpdate:modelValue":e[1]||(e[1]=a=>i.value=a),filterable:"",remote:"","remote-method":N,clearable:"",options:d.value,loading:c.value,placeholder:"請輸入資料"},null,8,["modelValue","options","loading"]),s(u(x),{type:"info",onClick:C,class:"mt-3"},{default:w(()=>[y("確定")]),_:1})]),m.value?(g(),b("div",M,[s(u(S)),t("div",O,[P,s(u(_),{size:"large",round:"",disabled:!0,value:o.value.user_name,"onUpdate:value":e[2]||(e[2]=a=>o.value.user_name=a)},null,8,["value"])]),t("div",A,[F,s(u(_),{size:"large",round:"",disabled:!0,value:o.value.user_id,"onUpdate:value":e[3]||(e[3]=a=>o.value.user_id=a)},null,8,["value"])]),t("div",G,[J,s(u(_),{size:"large",round:"",disabled:!0,value:o.value.role,"onUpdate:value":e[4]||(e[4]=a=>o.value.role=a)},null,8,["value"])]),t("div",K,[Q,s(u(D),{value:o.value.editrole,"onUpdate:value":e[5]||(e[5]=a=>o.value.editrole=a),options:$.value},null,8,["value","options"])]),t("div",R,[s(u(x),{type:"info",onClick:L},{default:w(()=>[y("送出")]),_:1})])])):E("",!0)])]))}};export{le as default};
