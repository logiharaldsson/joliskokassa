import{b as h}from"./UseData.8187c2a1.js";import{_ as f}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as r,c,a as s,F as x,r as _,t as a}from"./index.38ea802e.js";const u={data(){return{currentUser:"logi",allBoxes:[],boys:[],girls:[],ages:["1-2","3-6","7-10","11-14","15+"]}},async beforeCreate(){this.allBoxes=await h("2022"),this.modBox("girls"),this.modBox("boys")},computed:{},methods:{modBox(o){console.log("gender:",o),console.log("this.allBoxes:",this.allBoxes);const n=["1-2","3-6","7-10","11-14","15+"];if(o==="boys"){let l=this.allBoxes.filter(e=>e.gender===o);console.log("girls",l),n.forEach(e=>this.boys.push(l.find(t=>t.box_abe===e).sum))}else if(o==="girls"){let l=this.allBoxes.filter(e=>e.gender===o);n.forEach(e=>this.girls.push(l.find(t=>t.box_abe===e).sum))}return!0}}},g=s("div",{class:"text-center fw-bold text-4xl mb-10"}," Fj\xF6ldi kassa eftir kyni og aldri ",-1),m={class:"grid grid-cols-5 gap-5"},p={class:"flex justify-center text-2xl my-2"},y={class:"flex justify-center"},b={class:"relative h-60 w-44 xs:w-80 mx-3 flex-col justify-center bg-pink-300 rounded-lg shadow-xl shadow-slate-300/60"},v={class:"flex justify-center items-center px-7 pt-9 pb-2 mx-7 mt-5"},B={class:"text-6xl text-center text-white mt-8"},w={class:"grid grid-cols-5 gap-5 pt-4 mt-4"},j={class:"flex justify-center text-2xl my-2"},k={class:"flex justify-center"},S={class:"relative h-60 w-44 xs:w-80 mx-3 flex-col justify-center bg-blue-300 rounded-lg shadow-xl shadow-slate-300/60"},E={class:"flex justify-center items-center px-7 pt-9 pb-2 mx-7 mt-5"},F={class:"text-6xl text-center text-white mt-8"};function C(o,n,l,e,t,D){return r(),c(x,null,[g,s("div",m,[(r(!0),c(x,null,_(t.girls,(d,i)=>(r(),c("div",{key:i+"girls"},[s("div",p," Stelpur "+a(t.ages[i]),1),s("div",y,[s("div",b,[s("div",v,[s("p",B,a(d),1)])])])]))),128))]),s("div",w,[(r(!0),c(x,null,_(t.boys,(d,i)=>(r(),c("div",{key:i+"girls"},[s("div",j," Str\xE1kar "+a(t.ages[i]),1),s("div",k,[s("div",S,[s("div",E,[s("p",F,a(d),1)])])])]))),128))])],64)}const V=f(u,[["render",C]]);export{V as default};