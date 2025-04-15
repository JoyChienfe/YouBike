import{L as Z}from"./index-_SSuC524.js";import{r as p,o as v,f as m,w as o,u as t,b as s,F as D,t as U,d as g,g as x,c as S,a as H,h as G,i as j,j as ee,k as P}from"./index-_kP17sD-.js";import{N as i,a as M}from"./FormItem-ipvpbF4n.js";import{N as z,a as $,b as ae,c as le,_ as te,d as ue}from"./FilterComponent-251cZJ5-.js";import{N as k,a as F}from"./Button-LpxxtGnZ.js";import{N as E,a as B}from"./DatePicker-IAplPjRo.js";import"./el-select-v2-NgkewZJv.js";const se={__name:"StationoneComponent",props:{formData:{type:Object},modeldisabled:{type:Boolean}},setup(R,{expose:O}){const K=R,d=p("large"),c=p(null),e=p(null);function I(){e.value.場站周遭環境.ischeck=[...e.value.場站周遭環境],e.value.場站周遭環境.value=e.value.KIOSK功能.value=["停車柱","基板","垃圾多"],e.value.KIOSK功能.ischeck=[...e.value.KIOSK功能],e.value.KIOSK功能.value=e.value.KIOSK功能.value=["黑屏、畫面無反應","內容站點資訊不清楚"],e.value.KIOSK外觀.ischeck=[...e.value.KIOSK外觀],e.value.KIOSK外觀.value=e.value.KIOSK外觀.value=["嚴重髒汙","廣告貼紙","塗鴉","正面Logo貼紙褪色"],e.value.KIOSK燈片.ischeck=[...e.value.KIOSK燈片],e.value.KIOSK燈片.value=e.value.KIOSK燈片.value=["站名牌","後燈片使用說明"],e.value.場站導標桿.ischeck=[...e.value.場站導標桿],e.value.場站導標桿.value=e.value.場站導標桿.value=["歪斜、損毀","漏缺"]}function h(){e.value={...K.formData};const y=e.value.station_name;e.value.city=y.split("-")[0],e.value.station=e.value.station_name.split("-")[1];for(const u in e.value.testtable){const a={...e.value.testtable[u]};!Object.prototype.hasOwnProperty.call(a,"ischeck")&&typeof e.value.testtable[u]=="object"&&(e.value.testtable[u].ischeck=[])}I()}return O({modelRef:e}),h(),(y,u)=>(v(),m(t(M),{ref_key:"formRef",ref:c,model:e.value,disabled:K.modeldisabled,size:d.value},{default:o(()=>[s(t(i),{path:"id",label:"編號"},{default:o(()=>[s(t(z),{value:e.value.id,"onUpdate:value":u[0]||(u[0]=a=>e.value.id=a),disabled:!0},null,8,["value"])]),_:1}),s(t(i),{path:"user_name",label:"姓名"},{default:o(()=>[s(t(k),{value:e.value.user_name,"onUpdate:value":u[1]||(u[1]=a=>e.value.user_name=a),disabled:!0},null,8,["value"])]),_:1}),s(t(i),{path:"user_id",label:"公號"},{default:o(()=>[s(t(k),{value:e.value.user_id,"onUpdate:value":u[2]||(u[2]=a=>e.value.user_id=a),disabled:!0},null,8,["value"])]),_:1}),s(t(i),{path:"test_date",label:"測驗日期"},{default:o(()=>[s(t(k),{value:e.value.test_date,"onUpdate:value":u[3]||(u[3]=a=>e.value.test_date=a),disabled:!0},null,8,["value"])]),_:1}),s(t(i),{path:"sys",label:"車種"},{default:o(()=>[s(t(k),{value:e.value.sys,"onUpdate:value":u[4]||(u[4]=a=>e.value.sys=a),disabled:!0},null,8,["value"])]),_:1}),s(t(i),{path:"sys",label:"場站名稱"},{default:o(()=>[s(t(k),{value:e.value.station,"onUpdate:value":u[5]||(u[5]=a=>e.value.station=a)},null,8,["value"])]),_:1}),s(t(i),{path:"city",label:"城市"},{default:o(()=>[s(t(k),{value:e.value.city,"onUpdate:value":u[6]||(u[6]=a=>e.value.city=a),disabled:!0},null,8,["value"])]),_:1}),s(t(i),{path:"id",label:"場站車輛數"},{default:o(()=>[s(t(z),{value:e.value.carnum,"onUpdate:value":u[7]||(u[7]=a=>e.value.carnum=a)},null,8,["value"])]),_:1}),s(t(i),{path:"id",label:"無法租借車輛數"},{default:o(()=>[s(t(z),{value:e.value.no_carnum,"onUpdate:value":u[8]||(u[8]=a=>e.value.no_carnum=a)},null,8,["value"])]),_:1}),s(t(i),{label:"場站周遭環境",path:"modelRef['場站周遭環境']"},{default:o(()=>[s(t(E),{value:e.value.場站周遭環境.ischeck,"onUpdate:value":u[9]||(u[9]=a=>e.value.場站周遭環境.ischeck=a)},{default:o(()=>[s(t($),null,{default:o(()=>[(v(!0),S(D,null,x(e.value.場站周遭環境.value,a=>(v(),m(t(B),{value:a,key:a},{default:o(()=>[g(U(a),1)]),_:2},1032,["value"]))),128))]),_:1})]),_:1},8,["value"])]),_:1}),s(t(i),{label:"KIOSK功能",path:"modelRef['KIOSK功能']"},{default:o(()=>[s(t(E),{value:e.value.KIOSK功能.ischeck,"onUpdate:value":u[10]||(u[10]=a=>e.value.KIOSK功能.ischeck=a)},{default:o(()=>[s(t($),null,{default:o(()=>[(v(!0),S(D,null,x(e.value.KIOSK功能.value,a=>(v(),m(t(B),{value:a,key:a},{default:o(()=>[g(U(a),1)]),_:2},1032,["value"]))),128))]),_:1})]),_:1},8,["value"])]),_:1}),s(t(i),{label:"KIOSK外觀",path:"modelRef['KIOSK外觀']"},{default:o(()=>[s(t(E),{value:e.value.KIOSK外觀.ischeck,"onUpdate:value":u[11]||(u[11]=a=>e.value.KIOSK外觀.ischeck=a)},{default:o(()=>[s(t($),null,{default:o(()=>[(v(!0),S(D,null,x(e.value.KIOSK外觀.value,a=>(v(),m(t(B),{value:a,key:a},{default:o(()=>[g(U(a),1)]),_:2},1032,["value"]))),128))]),_:1})]),_:1},8,["value"])]),_:1}),s(t(i),{label:"KIOSK燈片",path:"modelRef['KIOSK燈片']"},{default:o(()=>[s(t(E),{value:e.value.KIOSK燈片.ischeck,"onUpdate:value":u[12]||(u[12]=a=>e.value.KIOSK燈片.ischeck=a)},{default:o(()=>[s(t($),null,{default:o(()=>[(v(!0),S(D,null,x(e.value.KIOSK燈片.value,a=>(v(),m(t(B),{value:a,key:a},{default:o(()=>[g(U(a),1)]),_:2},1032,["value"]))),128))]),_:1})]),_:1},8,["value"])]),_:1}),s(t(i),{label:"場站導標桿",path:"modelRef['場站導標桿']"},{default:o(()=>[s(t(E),{value:e.value.場站導標桿.ischeck,"onUpdate:value":u[13]||(u[13]=a=>e.value.場站導標桿.ischeck=a)},{default:o(()=>[s(t($),null,{default:o(()=>[(v(!0),S(D,null,x(e.value.場站導標桿.value,a=>(v(),m(t(B),{value:a,key:a},{default:o(()=>[g(U(a),1)]),_:2},1032,["value"]))),128))]),_:1})]),_:1},8,["value"])]),_:1})]),_:1},8,["model","disabled","size"]))}},q={__name:"StationtwoComponent",props:{formData:{type:Object},modeldisabled:{type:Boolean}},setup(R,{expose:O}){const K=R,d=p("large"),c=p(null),e=p(null);function I(){e.value.場站導標桿.ischeck=[...e.value.場站導標桿],e.value.場站導標桿.value=e.value.場站導標桿.value=["歪斜、損毀","漏缺"]}function h(){e.value={...K.formData};const y=e.value.station_name;e.value.city=y.split("-")[0],e.value.station=e.value.station_name.split("-")[1];for(const u in e.value.testtable){const a={...e.value.testtable[u]};!Object.prototype.hasOwnProperty.call(a,"ischeck")&&typeof e.value.testtable[u]=="object"&&(e.value.testtable[u].ischeck=[])}I()}return O({modelRef:e}),h(),(y,u)=>(v(),m(t(M),{ref_key:"formRef",ref:c,model:e.value,disabled:K.modeldisabled,size:d.value},{default:o(()=>[s(t(i),{path:"id",label:"編號"},{default:o(()=>[s(t(z),{value:e.value.id,"onUpdate:value":u[0]||(u[0]=a=>e.value.id=a),disabled:!0},null,8,["value"])]),_:1}),s(t(i),{path:"user_name",label:"姓名"},{default:o(()=>[s(t(k),{value:e.value.user_name,"onUpdate:value":u[1]||(u[1]=a=>e.value.user_name=a),disabled:!0},null,8,["value"])]),_:1}),s(t(i),{path:"user_id",label:"公號"},{default:o(()=>[s(t(k),{value:e.value.user_id,"onUpdate:value":u[2]||(u[2]=a=>e.value.user_id=a),disabled:!0},null,8,["value"])]),_:1}),s(t(i),{path:"test_date",label:"測驗日期"},{default:o(()=>[s(t(k),{value:e.value.test_date,"onUpdate:value":u[3]||(u[3]=a=>e.value.test_date=a),disabled:!0},null,8,["value"])]),_:1}),s(t(i),{path:"sys",label:"車種"},{default:o(()=>[s(t(k),{value:e.value.sys,"onUpdate:value":u[4]||(u[4]=a=>e.value.sys=a),disabled:!0},null,8,["value"])]),_:1}),s(t(i),{path:"sys",label:"場站名稱"},{default:o(()=>[s(t(k),{value:e.value.station,"onUpdate:value":u[5]||(u[5]=a=>e.value.station=a)},null,8,["value"])]),_:1}),s(t(i),{path:"city",label:"城市"},{default:o(()=>[s(t(k),{value:e.value.city,"onUpdate:value":u[6]||(u[6]=a=>e.value.city=a),disabled:!0},null,8,["value"])]),_:1}),s(t(i),{path:"id",label:"場站車輛數"},{default:o(()=>[s(t(z),{value:e.value.carnum,"onUpdate:value":u[7]||(u[7]=a=>e.value.carnum=a)},null,8,["value"])]),_:1}),s(t(i),{path:"id",label:"無法租借車輛數"},{default:o(()=>[s(t(z),{value:e.value.no_carnum,"onUpdate:value":u[8]||(u[8]=a=>e.value.no_carnum=a)},null,8,["value"])]),_:1}),s(t(i),{label:"場站導標桿",path:"modelRef['場站導標桿']"},{default:o(()=>[s(t(E),{value:e.value.場站導標桿.ischeck,"onUpdate:value":u[9]||(u[9]=a=>e.value.場站導標桿.ischeck=a)},{default:o(()=>[s(t($),null,{default:o(()=>[(v(!0),S(D,null,x(e.value.場站導標桿.value,a=>(v(),m(t(B),{value:a,key:a},{default:o(()=>[g(U(a),1)]),_:2},1032,["value"]))),128))]),_:1})]),_:1},8,["value"])]),_:1})]),_:1},8,["model","disabled","size"]))}},ne={class:"fw-bold"},oe={__name:"stationDrawComponent",props:{methodName:{type:String,required:!0},drawerisopen:{type:Boolean,required:!0},formData:{type:Object},modeldisabled:{type:Boolean}},emits:["drawerclose","getData"],setup(R,{emit:O}){const K=O,d=R,c=p(null),e=p(null);async function I(){let a=null;c.value?(a=c.value.modelRef,await h(a)):e.value&&(a=e.value.modelRef,await y(a)),K("getData"),u()}async function h(a){const _={...a,KIOSK功能:a.KIOSK功能.ischeck,場站周遭環境:a.場站周遭環境.ischeck,KIOSK外觀:a.KIOSK外觀.ischeck,KIOSK燈片:a.KIOSK燈片.ischeck,場站導標桿:a.場站導標桿.ischeck},{id:N}=a;_.station_name=`${_.city}-${_.station}`;const L=`https://backend-simulation.youbike.com.tw/station/station1/${N}`;await j.put(L,_)}async function y(a){const _={...a,場站導標桿:a.場站導標桿.ischeck},{id:N}=a;_.station_name=`${_.city}-${_.station}`;const L=`https://backend-simulation.youbike.com.tw/station/station2/${N}`;await j.put(L,_)}function u(){K("drawerclose")}return(a,_)=>(v(),m(t(le),{show:d.drawerisopen,"onUpdate:show":_[0]||(_[0]=N=>d.drawerisopen=N),width:600,class:"fw-bold","close-on-esc":!1,"mask-closable":!1},{default:o(()=>[s(t(ae),{"native-scrollbar":!1},{header:o(()=>[H("span",ne,U(d.methodName),1)]),default:o(()=>[d.formData.sys==="1.0"?(v(),m(se,{key:0,formData:d.formData,modeldisabled:d.modeldisabled,ref_key:"oneRef",ref:c},null,8,["formData","modeldisabled"])):d.formData.sys==="2.0+2.0e"?(v(),m(q,{key:1,formData:d.formData,modeldisabled:d.modeldisabled,ref_key:"twoRef",ref:e},null,8,["formData","modeldisabled"])):d.formData.sys==="2.0"?(v(),m(q,{key:2,formData:d.formData,modeldisabled:d.modeldisabled,ref_key:"twoRef",ref:e},null,8,["formData","modeldisabled"])):d.formData.sys==="2.0+2.0E"?(v(),m(q,{key:3,formData:d.formData,modeldisabled:d.modeldisabled,ref_key:"twoRef",ref:e},null,8,["formData","modeldisabled"])):G("",!0)]),footer:o(()=>[d.methodName==="查看"?(v(),m(t(F),{key:0,type:"primary",onClick:u,class:"fw-bold col-12",style:{height:"50px"}},{default:o(()=>[g("關閉")]),_:1})):d.methodName==="編輯"?(v(),S(D,{key:1},[s(t(F),{onClick:u,class:"fw-bold"},{default:o(()=>[g("取消")]),_:1}),s(t(F),{class:"ms-3 fw-bold",onClick:I},{default:o(()=>[g("送出")]),_:1})],64)):G("",!0)]),_:1})]),_:1},8,["show"]))}},re={class:"container py-3 fw-bolders"},me={__name:"StationFromView",setup(R){const O=ee("$swal"),K=[{label:"1.0",value:"1.0"},{label:"2.0+2.0E",value:"2.0+2.0E"}],d=p(!1),c=p([]),e=p(),I=({check:n,edit:l,dele:r})=>[{title:"編號",key:"f_id",align:"center"},{title:"公號",key:"id",align:"center"},{title:"姓名",key:"name",align:"center"},{title:"測驗日期",key:"test_date",align:"center"},{title:"車種",key:"car_type",align:"center"},{title:"城市",key:"city",align:"center"},{title:"方法",key:"check",align:"center",render(f){return P(F,{strong:!0,tertiary:!0,size:"small",color:"blue",class:"fw-bolder",onClick:()=>n(f)},{default:()=>"查看"})}},{title:"方法",key:"edit",align:"center",render(f){return P(F,{strong:!0,tertiary:!0,size:"small",color:"green",class:"fw-bolder",onClick:()=>l(f)},{default:()=>"編輯"})}},{title:"方法",key:"delete",align:"center",render(f){return P(F,{strong:!0,tertiary:!0,size:"small",color:"red",class:"fw-bolder",onClick:()=>r(f)},{default:()=>"刪除"})}}],h=p(!1),y=p(""),u=p(!0);function a(n){h.value=!0,N(n)}function _(){h.value=!1}function N(n){n==="check"?(y.value="查看",u.value=!0):n==="edit"?(y.value="編輯",u.value=!1):y.value="錯誤方法"}async function L(n,l){let r=null;l==="1.0"?r=`https://backend-simulation.youbike.com.tw/station/station1/${n}`:r=`https://backend-simulation.youbike.com.tw/station/station2/${n}`;try{await j.delete(r)}catch(f){console.log(f)}}async function W(){return!!(await O({title:"確定刪除?",text:"刪除將不可復原",icon:"warning",showCancelButton:!0,confirmButtonColor:"#d33",confirmButtonText:"確定"})).isConfirmed}const V=p(null),J=I({check(n){a("check"),c.value.forEach(l=>{l.id===n.f_id&&l.sys===n.car_type&&(V.value=l)}),console.log(V.value),console.log("查看",n)},edit(n){a("edit"),c.value.forEach(l=>{l.id===n.f_id&&l.sys===n.car_type&&(V.value=l)}),console.log("編輯",n)},async dele(n){try{if(await W()){const{f_id:r,car_type:f}=n;await L(r,f),await T()}}catch{console.log("刪除失敗")}}});function Q(n,l,r){let f=new Date(n);f.setHours(0,0,0,0);let C=new Date(l);C.setHours(23,59,59,999);let b=new Date(r);return b>=f&&b<=C}async function T(){try{d.value=!0;const f=await Promise.all([j.get("https://backend-simulation.youbike.com.tw/station/station1"),j.get("https://backend-simulation.youbike.com.tw/station/station2"),j.get("https://backend-simulation.youbike.com.tw/user/users")]),C=f[0].data,b=f[1].data;d.value=!1,c.value=[...C,...b],e.value=c.value.map(w=>({f_id:w.id,id:w.user_id,name:w.user_name,test_date:w.test_date,car_type:w.sys,city:w.station_name.split("-")[0]}))}catch(n){console.log(n)}}function X(){e.value=c.value.map(n=>{const l=n.station_name.split("-");return{f_id:n.id,name:n.user_name,id:n.user_id,test_date:n.test_date,car_type:n.sys,city:l[1]?l[0]:""}})}function A(n){return Math.abs(n).toString().length===1?`0${n}`:`${n}`}function Y(n){if(e.value=[],n.type==="name")c.value.forEach(l=>{const r=l.station_name.split("-");l.user_name===n.value&&e.value.push({f_id:l.id,name:l.user_name,id:l.user_id,test_date:l.test_date,car_type:l.sys,city:r[1]?r[0]:""})});else if(n.type==="userid")c.value.forEach(l=>{const r=l.station_name.split("-");l.user_id===n.value&&e.value.push({f_id:l.id,name:l.user_name,id:l.user_id,test_date:l.test_date,car_type:l.sys,city:r[1]?r[0]:""})});else if(n.type==="date"){const{year:l,day:r,month:f}=n.value,C=`${l}-${A(f)}-${A(r)}`;c.value.forEach(b=>{const w=b.station_name.split("-");b.test_date.split(" ")[0]===C&&e.value.push({f_id:b.id,name:b.user_name,id:b.user_id,test_date:b.test_date,car_type:b.sys,city:w[1]?w[0]:""})})}else n.type==="sys"?c.value.forEach(l=>{const r=l.station_name.split("-");n.value==="2.0+2.0E"&&(l.sys==="2.0+2.0e"||l.sys==="2.0+2.0E"||l.sys==="2.0")?e.value.push({f_id:l.id,name:l.user_name,id:l.user_id,test_date:l.test_date,car_type:l.sys,city:r[1]?r[0]:""}):l.sys===n.value&&e.value.push({f_id:l.id,name:l.user_name,id:l.user_id,test_date:l.test_date,car_type:l.sys,city:r[1]?r[0]:""})}):n.type==="city"?c.value.forEach(l=>{const r=l.station_name.split("-")[1]?l.station_name.split("-")[0]:"";r===n.value&&e.value.push({f_id:l.id,name:l.user_name,id:l.user_id,test_date:l.test_date,car_type:l.sys,city:r})}):n.type==="dates"&&c.value.forEach(l=>{if(Q(n.value[0],n.value[1],Date.parse(l.test_date))){const r=l.station_name.split("-");console.log(l.test_date),e.value.push({f_id:l.id,name:l.user_name,id:l.user_id,test_date:l.test_date,car_type:l.sys,city:r[1]?r[0]:""})}})}return(async()=>await T())(),(n,l)=>(v(),S(D,null,[s(t(Z),{active:d.value,"onUpdate:active":l[0]||(l[0]=r=>d.value=r),"can-cancel":!1,"is-full-page":!0},null,8,["active"]),H("div",re,[s(t($),{vertical:""},{default:o(()=>[s(te,{sysoptions:K,data:c.value,onFilter:Y,onClearform:X},null,8,["data"]),s(t(ue),{columns:t(J),data:e.value,bordered:!1,striped:"",size:"small",pagination:{pageSize:15},"paginate-single-page":!1},null,8,["columns","data"])]),_:1}),s(oe,{formData:V.value,drawerisopen:h.value,onDrawerclose:_,methodName:y.value,modeldisabled:u.value,onGetData:T},null,8,["formData","drawerisopen","methodName","modeldisabled"])])],64))}};export{me as default};
