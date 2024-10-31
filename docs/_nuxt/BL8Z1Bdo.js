import{d as T,G as u,o as d,c as Q,w as E,u as y,a as _,t as o,b as M,T as et,_ as X,e as j,f as e,g as h,h as m,i as nt,j as it,k as Y,r as K,l as ot,m as at,n as st,F as B,p as W,q as R,v as C,s as lt,x as rt,y as mt,E as ct,C as dt,H as pt,I as _t,B as ut,J as yt,K as V,L as ht,M as vt}from"./BgtUCu0x.js";import{u as ft,g as Z,a as bt,b as gt,d as Nt,c as $t,e as kt,f as wt,h as xt,j as At,i as Rt,_ as Et,k as St,l as Ut,m as Ct,n as Mt,o as Gt,p as It,q as Lt,r as Tt,s as Dt,t as Pt,v as Vt}from"./BcN-N_pM.js";const Bt=T({__name:"declension-slideshow",setup(S){const c=[{gender:u.MASCULINE,militaryRank:"солдат",militaryAppointment:"помічник гранатометника"},{gender:u.MASCULINE,militaryRank:"старший солдат",militaryAppointment:"старший вогнеметник"},{gender:u.MASCULINE,militaryRank:"старший солдат",militaryAppointment:"механік-водій"},{gender:u.MASCULINE,militaryRank:"молодший сержант",militaryAppointment:"бойовий медик взводу"},{gender:u.MASCULINE,militaryRank:"сержант",militaryAppointment:"командир відділення"},{gender:u.MASCULINE,militaryRank:"штаб-сержант",militaryAppointment:"льотчик"},{gender:u.MASCULINE,militaryRank:"штаб-старшина",militaryAppointment:"командир десантного катера"},{gender:u.MASCULINE,militaryRank:"головний старшина",militaryAppointment:"командир морського катера"}],l=ft(c,Z);return(s,v)=>(d(),Q(et,{name:"preview",mode:"out-in"},{default:E(()=>[y(l)?(d(),_("span",{key:`${y(l).militaryRank}${y(l).militaryAppointment}`},o(y(l).militaryRank)+" - "+o(y(l).militaryAppointment),1)):M("",!0)]),_:1}))}}),jt=X(Bt,[["__scopeId","data-v-eb1a827a"]]),qt={id:"preview",class:"px-3 px-lg-4 py-4 my-3 bg-light rounded-3"},Ft={class:"text-truncate"},Ht={class:"d-none d-lg-inline"},Ot={class:"text-muted"},zt=["aria-label","title"],Jt={__name:"banner-section",setup(S){const c=j();return(l,s)=>{const v=jt,p=nt;return d(),_("section",qt,[e("h1",Ft,[h(o(y(c).library.displayName)+" ",1),e("span",Ht,[e("small",Ot,[m(v,{"aria-hidden":!0})])])]),e("p",null,[h(o(l.$t("website.longTitle.military"))+" ",1),e("i",{class:"fa fa-flask ms-1 text-primary","aria-label":l.$t("beta"),title:l.$t("beta")},null,8,zt)]),e("p",null,[m(p,{class:"btn btn-lg btn-primary",to:{hash:"#demo"},role:"button"},{default:E(()=>[h(o(l.$t("liveDemo")),1)]),_:1}),m(p,{class:"btn btn-lg btn-link text-decoration-none",to:{hash:"#usage-example"},role:"button"},{default:E(()=>[h(o(l.$t("documentation.usageExample")),1)]),_:1})])])}}},Kt={id:"demo",class:"my-4"},Wt={class:"row mb-3"},Qt={class:"col-12"},Xt={class:"mb-0"},Yt={class:"d-block h6 text-muted mt-2 mb-0 sentence-capitalize"},Zt={class:"row"},te={class:"col-lg-5 mb-2 mb-lg-0 d-flex"},ee={class:"card-body d-flex flex-column justify-content-between"},ne={class:"mb-4"},ie={class:"alert alert-info",role:"alert"},oe={class:"mb-3"},ae={class:"mb-2"},se=["value"],le={key:0},re={key:0,class:"alert alert-danger"},me={key:1,class:"d-block form-text text-muted"},ce={class:"mb-3"},de={class:"form-label",for:"military-rank"},pe=["placeholder"],_e={class:"mb-3"},ue={class:"form-label",for:"military-appointment"},ye=["placeholder"],he={class:"mb-3"},ve={class:"form-label",for:"family-name"},fe=["placeholder"],be={class:"mb-3"},ge={class:"form-label",for:"given-name"},Ne=["placeholder"],$e={class:"mb-0"},ke={class:"form-label",for:"patronymic-name"},we=["placeholder"],xe={type:"submit",class:"btn btn-primary"},Ae={class:"col-lg-7 d-flex"},Re={class:"card flex-grow-1 flex-fill"},Ee={class:"card-body d-flex flex-column justify-content-between"},Se={class:"table-responsive mb-3"},Ue={class:"table"},Ce={class:"border-top-0 rounded text-nowrap"},Me={class:"border-top-0 w-100"},Ge={class:"border-top-0 text-end"},Ie={class:"py-0 px-1"},Le=["title","aria-label"],Te={class:"text-nowrap"},De={class:"w-100"},Pe={key:0,class:"text-nowrap"},Ve={class:"text-nowrap"},Be={class:"text-end"},je={class:"alert alert-light mb-0",role:"alert"},qe={class:"d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-md-between"},Fe=T({__name:"declension-demo-section",async setup(S){let c,l;const s={gender:u.MASCULINE,militaryRank:"солдат",militaryAppointment:"помічник гранатометника",familyName:"Шевченко",givenName:"Тарас",patronymicName:"Григорович"};function v(t){return gt(t,s)}const p=it(),k=Y(),f=void 0,b=[f,...Object.values(u)],[x,D]=bt(!1),n=K({gender:f,autoDetectedGender:s.gender,militaryRank:"",militaryAppointment:"",familyName:"",givenName:"",patronymicName:""});function G(t){n.gender=t.gender,n.autoDetectedGender=t.autoDetectedGender,n.militaryRank=t.militaryRank,n.militaryAppointment=t.militaryAppointment,n.familyName=t.familyName,n.givenName=t.givenName,n.patronymicName=t.patronymicName}function I(t){return!!((t.gender===f||Object.values(u).includes(t.gender))&&(t!=null&&t.militaryRank||t!=null&&t.militaryAppointment||t.familyName||t.givenName||t.patronymicName))}async function U(){D(!1);let t,a,w,g,N,$;if(I(n)?(t=n.gender,a=n.militaryRank,w=n.militaryAppointment,g=n.familyName,N=n.givenName,$=n.patronymicName):(t=s.gender,a=s.militaryRank,w=s.militaryAppointment,g=s.familyName,N=s.givenName,$=s.patronymicName),t??(t=await Nt({familyName:g,givenName:N,patronymicName:$})),t==null){D(!0);return}n.autoDetectedGender=t;const i={gender:t,militaryRank:a,militaryAppointment:w,familyName:g,givenName:N,patronymicName:$};await L(i),await p.replace({query:{...i}})}async function P(t){G({...n,patronymicName:t}),await U()}const r=K({nominative:null,genitive:null,dative:null,accusative:null,ablative:null,locative:null,vocative:null});async function L(t){const[a,w,g,N,$,i,A]=await Promise.all([$t(t),kt(t),wt(t),Z(t),xt(t),At(t),Rt(t)]);r.nominative=a,r.genitive=w,r.dative=g,r.accusative=N,r.ablative=$,r.locative=i,r.vocative=A}function tt(t){const a=[];return t.militaryRank&&a.push(t.militaryRank),t.militaryAppointment&&a.push(t.militaryAppointment),t.familyName&&a.push(t.familyName),t.givenName&&a.push(t.givenName),t.patronymicName&&a.push(t.patronymicName),a.join(" ")}return ot(async()=>{I(k.query)&&!v(k.query)&&(G(k.query),await U())}),[c,l]=at(()=>L(s)),await c,l(),(t,a)=>{const w=Et,g=lt,N=Ut,$=St;return d(),_("section",Kt,[e("div",Wt,[e("div",Qt,[e("h2",Xt,[h(o(t.$t("liveDemo"))+" ",1),e("small",Yt,o(t.$t("liveDemo.message.military")),1)])])]),e("div",Zt,[e("div",te,[e("form",{id:"declension-form",class:"card flex-grow-1 flex-fill",onSubmit:st(U,["prevent"])},[e("div",ee,[e("div",ne,[e("div",ie,o(t.$t("declension.instruction")),1),e("div",oe,[e("div",ae,[(d(),_(B,null,W(b,i=>e("label",{key:i,class:"radio-inline me-2"},[R(e("input",{"onUpdate:modelValue":a[0]||(a[0]=A=>n.gender=A),type:"radio",name:"gender",value:i},null,8,se),[[rt,n.gender]]),h(" "+o(t.$t(`grammaticalGender.${i}`))+" ",1),i===y(f)?(d(),_("span",le," ("+o(t.$t(`grammaticalGender.${n.autoDetectedGender}`))+") ",1)):M("",!0)])),64))]),y(x)?(d(),_("div",re,o(t.$t("grammaticalGender.detectionFailed")),1)):n.gender===y(f)?(d(),_("small",me,o(t.$t("grammaticalGender.autoDetection")),1)):M("",!0)]),e("div",ce,[e("label",de,o(t.$t("anthroponym.militaryRank")),1),R(e("input",{id:"military-rank","onUpdate:modelValue":a[1]||(a[1]=i=>n.militaryRank=i),type:"text",class:"form-control",name:"military-rank",placeholder:s.militaryRank},null,8,pe),[[C,n.militaryRank,void 0,{trim:!0}]])]),e("div",_e,[e("label",ue,o(t.$t("anthroponym.militaryAppointment")),1),R(e("input",{id:"military-appointment","onUpdate:modelValue":a[2]||(a[2]=i=>n.militaryAppointment=i),type:"text",class:"form-control",name:"military-appointment",placeholder:s.militaryAppointment},null,8,ye),[[C,n.militaryAppointment,void 0,{trim:!0}]])]),e("div",he,[e("label",ve,o(t.$t("anthroponym.familyName")),1),R(e("input",{id:"family-name","onUpdate:modelValue":a[3]||(a[3]=i=>n.familyName=i),type:"text",class:"form-control",name:"family-name",placeholder:s.familyName},null,8,fe),[[C,n.familyName,void 0,{trim:!0}]])]),e("div",be,[e("label",ge,o(t.$t("anthroponym.givenName")),1),R(e("input",{id:"given-name","onUpdate:modelValue":a[4]||(a[4]=i=>n.givenName=i),type:"text",class:"form-control",name:"given-name",placeholder:s.givenName},null,8,Ne),[[C,n.givenName,void 0,{trim:!0}]])]),e("div",$e,[e("label",ke,o(t.$t("anthroponym.patronymicName")),1),R(e("input",{id:"patronymic-name","onUpdate:modelValue":a[5]||(a[5]=i=>n.patronymicName=i),type:"text",class:"form-control",name:"patronymic-name",placeholder:s.patronymicName},null,8,we),[[C,n.patronymicName,void 0,{trim:!0}]]),m(w,{anthroponym:n,onPatronymicNameCorrection:P},null,8,["anthroponym"])])]),e("div",null,[e("button",xe,o(t.$t("declension.inflect")),1),m(g,{class:"btn btn-link pull-right","modal-id":"contact-us-modal"},{default:E(()=>[h(o(t.$t("foundBug")),1)]),_:1})])])],32)]),e("div",Ae,[e("div",Re,[e("div",Ee,[e("div",Se,[e("table",Ue,[e("tbody",null,[e("tr",null,[e("th",Ce,o(t.$t("grammaticalCase")),1),e("th",Me,o(t.$t("declension.results")),1),e("th",Ge,[e("span",Ie,[e("i",{class:"fa fa-info-circle",title:t.$t("declension.copyResult"),"aria-label":t.$t("declension.copyResult")},null,8,Le)])])]),(d(!0),_(B,null,W(mt,i=>{var A,q,F,H,O,z,J;return d(),_("tr",{key:i},[e("th",Te,o(t.$t(`grammaticalCase.${i}`)),1),e("td",De,[(A=r[i])!=null&&A.militaryRank||(q=r[i])!=null&&q.militaryAppointment?(d(),_("span",Pe,[h(o((F=r[i])==null?void 0:F.militaryRank)+" "+o((H=r[i])==null?void 0:H.militaryAppointment),1),a[6]||(a[6]=e("br",null,null,-1))])):M("",!0),e("span",Ve,o((O=r[i])==null?void 0:O.familyName)+" "+o((z=r[i])==null?void 0:z.givenName)+" "+o((J=r[i])==null?void 0:J.patronymicName),1)]),e("td",Be,[r[i]?(d(),Q(N,{key:0,"button-id":`copy-${i}-case-button`,source:tt(r[i])},null,8,["button-id","source"])):M("",!0)])])}),128))])])]),e("div",je,[e("div",qe,[h(o(t.$t("declension.shareResult"))+" ",1),m($,{"buttons-class":"mt-1 mt-md-0 me-md-2"})])])])])])])])}}}),He=X(Fe,[["__scopeId","data-v-f08b612c"]]),Oe={id:"documentation",class:"my-4"},ze={class:"row"},Je={class:"col"},Ke={class:"d-block h6 mt-2 mb-0 text-decoration-none"},We=["href"],Qe={class:"row"},Xe={class:"col"},Ye={class:"d-flex align-items-center mb-0"},Ze={class:"row"},tn={class:"col"},en=T({__name:"docs-section",setup(S){const c=j(),l=`npm install --save ${c.library.name}@^3.1.0 ${c.militaryExtension.name}`,s=`
const shevchenko = require('${c.library.name}');
const { militaryExtension } = require('${c.militaryExtension.name}');

shevchenko.registerExtension(militaryExtension);

async function main() {
  const input = {
    gender: 'masculine',
    militaryRank: 'солдат',
    militaryAppointment: 'помічник гранатометника',
    familyName: 'Шевченко',
    givenName: 'Тарас',
    patronymicName: 'Григорович',
  };

  const output = await shevchenko.inGenitive(input);

  console.log(output); // { militaryRank: "солдата", militaryAppointment: "помічника гранатометника", familyName: "Шевченка", givenName: "Тараса", patronymicName: "Григоровича" }
}

main().catch((error) => console.error(error));
`;return(v,p)=>{const k=Ct,f=Mt,b=Gt,x=It;return d(),_("section",Oe,[e("div",ze,[e("div",Je,[e("h2",null,[h(o(v.$t("documentation"))+" ",1),e("small",Ke,[e("a",{href:y(c).militaryExtension.gitHubUrl,target:"_blank"},o(v.$t("documentation.navigateToExtensionPage")),9,We)])])])]),e("div",Qe,[e("div",Xe,[m(f,null,{default:E(()=>[p[0]||(p[0]=e("h6",{class:"card-subtitle mb-2 text-muted"},"npm",-1)),e("div",Ye,[m(k,{code:l})])]),_:1})])]),e("div",Ze,[e("div",tn,[m(x,null,{default:E(()=>[m(b,{code:s.trim()},null,8,["code"])]),_:1})])])])}}}),nn=Pt(Vt),sn=T({__name:"military",props:{locale:{type:String,default:"uk-UA"}},setup(S){const c=S,{locale:l}=ct(c);Lt({locale:l.value});const s=j(),v=Y(),{t:p}=dt(),{pageUrl:k}=pt(),{buildPageTitle:f}=_t(),b=ut(()=>{const x=p("website.title.military").toString();return f(x)});return yt({title:b,link:[{rel:"canonical",href:V(v.fullPath)}],bodyAttrs:{"data-bs-theme":"military"}}),Tt({description:p("website.description.military"),keywords:p("website.keywords.military"),ogImage:V("/preview-608x608.jpg"),ogImageWidth:608,ogImageHeight:608,ogType:"website",ogUrl:k,ogSiteName:s.library.name,ogTitle:b,ogDescription:p("website.description.military"),twitterImage:V("/preview-608x608.jpg"),twitterCard:"summary",twitterTitle:b,twitterDescription:b}),(x,D)=>{const n=ht,G=Jt,I=He,U=en,P=vt,r=nn,L=Dt;return d(),_(B,null,[m(n),m(G),m(I),m(U),m(P),m(r),m(L)],64)}}});export{sn as _};