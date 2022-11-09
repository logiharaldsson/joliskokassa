import{g as u,i as m,c as f,t as B,d as v}from"./UseData.8187c2a1.js";import{u as C,o as a,c as i,a as o,f as w,t as l,F as h,r as g,e as d,n as c,g as p}from"./index.38ea802e.js";const k={class:"absolute right-0"},I={class:"mr-6 pr-6 text-5xl"},T=o("i",{class:"mt-10 fa-solid fa-gift"},null,-1),A={class:"flex flex-col absolute z-20"},D=["onClick","id"],S={class:"w-screen flex flex-col sm:items-center items-end"},G={class:"relative w-3/5 mr-6 sm:mr-0 flex justify-center text-2xl my-2"},L={class:"flex"},$={class:"flex flex-col justify-center minus-buttons tally-button mr-2"},j={class:"relative h-60 w-44 xs:w-80 mx-3 flex-col justify-center bg-blue-300 rounded-lg shadow-xl shadow-slate-300/60"},N={class:"flex justify-center items-center px-7 pt-9 pb-2 mx-7 mt-5"},_={class:"text-6xl text-center text-white mt-8"},M={class:"relative sm:w-80 w-3/5 mr-6 sm:mr-0 flex justify-center text-2xl my-2"},E={class:"relative mr-6 sm:mr-0 flex justify-center my-2"},H=["onClick"],V=p('<div class="mt-2"><div class="grid grid-cols-6"><div class="text-center p-2 border-b-4 border-gray-500">Kyn</div><div class="text-center p-2 border-b-4 border-gray-500">Aldur</div><div class="text-center p-2 border-b-4 border-gray-500">Kassi #</div><div class="text-center p-2 border-b-4 border-gray-500">A\xF0ger\xF0</div><div class="text-center p-2 border-b-4 border-gray-500">Sta\xF0a</div><div class="text-center p-2 border-b-4 border-gray-500">T\xEDmi</div></div><div id="historyTable" class="w-full"></div></div>',1),J={data(){return{ages:["1-2 \xE1ra","3-6 \xE1ra","7-10 \xE1ra","11-14 \xE1ra","15+ \xE1ra"],agesCategories:["1-2","3-6","7-10","11-14","15+"],ageIndex:0,genderCategories:["stelpur","str\xE1kar"],genderDBCategories:["girls","boys"],genderIndex:1,fetchData:null,fetchBoxNumber:null,fetchBoxCounter:0,supabaseBoxCounter:0,currentUser:"logi",fetchAvailableGiantBoxes:[],boxIndex:0,historyLogs:[],historyLogsIce:[],historyLogsString:"",historyLogsIceCopy:[],sbBoxCounters:[],historyTable:"",fetchTotalCount:0}},async created(){await this.fetchAllBoxes("boys","1-2","2022");const{data:e,table:t}=await u();this.historyTable=t,await this.getTotalBoxCount("2022")},computed:{isMobile(){return window.innerWidth<520},currentGender(){return this.genderCategories[this.genderIndex]},currentAge(){return this.ages[this.ageIndex]},currentDbGender(){return this.genderDBCategories[this.genderIndex]},currentDbAge(){return this.agesCategories[this.ageIndex]},currentCount(){return this.sbBoxCounters[this.boxIndex]}},methods:{async updateBoxCounter(e,t,s,r,n){await m(e,t,s,r,n).then(y=>this.sbBoxCounters[this.boxIndex]=y);const{data:b,table:x}=await u();this.historyTable=x,await this.getTotalBoxCount("2022")},async fetchAllBoxes(e,t,s){await f(e,t,s).then(r=>{this.sbBoxCounters=r}).then(()=>this.boxIndex=this.sbBoxCounters.length-1),await this.getTotalBoxCount("2022")},async getTotalBoxCount(e){B(e).then(t=>this.fetchTotalCount=t)},addToBox(e){const t={gender:this.currentDbGender,age:this.currentDbAge,box_number:this.boxIndex+1,increment:e};JisDataServices.addToBox(JSON.stringify(t)).then(s=>{this.fetchBoxCounter=s.data,this.fetchAvailableGiantBoxes[this.boxIndex]=s.data}).then(()=>this.getHistory())},async getHistory(){JisDataServices.getHistory().then(e=>{console.log("history response",e.data),this.historyLogs=[],e.data.forEach(t=>{this.historyLogs.push(t)})}).then(()=>this.historyLogsString=JSON.stringify(this.historyLogs))},async tallyButton(e){await this.updateBoxCounter(e,this.currentDbGender,this.currentDbAge,this.boxIndex+1,"2022")},async addGiantBox(){Swal.fire({title:"Viltu b\xFAa til n\xFDjan tr\xF6lla kassa?",icon:"question",showCancelButton:!0,confirmButtonColor:"#22C55E",cancelButtonColor:"#EF4444",cancelButtonText:"Nei ekki n\xFAna",confirmButtonText:"J\xE1 endilega!"}).then(async e=>{if(e.isConfirmed){console.log("swal ok");try{const t=await v(this.currentDbGender,this.currentDbAge,"2022");console.log("add giant box:",t),this.fetchAllBoxes(this.currentDbGender,this.currentDbAge,"2022");const{d:s,table:r}=await u();this.historyTable=r}catch(t){console.log(t),Swal.fire({icon:"error",title:"Villa kom upp",text:"Ekki t\xF3kst a\xF0 b\xFAa til n\xFDjan tr\xF6llakassa!",footer:'<a href="mailto: logiharaldss@gmail.com">Hafa samband - logiharaldss@gmail.com</a>'})}}})},async ageButton(e){this.fetchAllBoxes("boys",this.agesCategories[e],"2022"),this.ageIndex=e},changeBoxIndex(e){this.boxIndex=e}},watch:{historyTable(e){const t=document.getElementById("historyTable");t.innerHTML=e}}},O=Object.assign(J,{__name:"Boys",setup(e){return C(),(t,s)=>(a(),i(h,null,[o("div",k,[o("div",I,[o("h1",null,[T,w(" "+l(t.fetchTotalCount),1)])])]),o("div",A,[(a(!0),i(h,null,g(t.agesCategories,(r,n)=>(a(),i("button",{onClick:b=>t.ageButton(n),class:c([{"bg-blue-400":n===t.ageIndex,"text-white":n===t.ageIndex},"target:bg-blue-200 sidebar-item border rounded p-2 m-2 w-36 h-16 text-center shadow-xl hover:bg-blue-300 hover:text-white"]),key:`age-${n}`,id:`${r}`},l(r)+" \xE1ra ",11,D))),128))]),o("div",S,[o("div",G," Str\xE1kar "+l(t.currentAge),1),o("div",L,[o("div",$,[t.isMobile?d("",!0):(a(),i("button",{key:0,class:"text-white rounded p-2 my-2 bg-red-500",onClick:s[0]||(s[0]=r=>t.tallyButton(-1))}," -1 ")),t.isMobile?d("",!0):(a(),i("button",{key:1,class:"text-white rounded p-2 my-2 bg-red-500",onClick:s[1]||(s[1]=r=>t.tallyButton(-5))}," -5 "))]),o("div",j,[o("div",N,[o("p",_,l(t.currentCount),1)])]),o("div",{class:c([{"mr-2":t.isMobile},"flex flex-col justify-center minus-buttons tally-button ml-2"])},[t.isMobile?(a(),i("button",{key:0,class:"text-white rounded p-2 my-2 bg-red-500",onClick:s[2]||(s[2]=r=>t.tallyButton(-1))}," -1 ")):d("",!0),t.isMobile?(a(),i("button",{key:1,class:"text-white rounded p-2 my-2 bg-red-500",onClick:s[3]||(s[3]=r=>t.tallyButton(-5))}," -5 ")):d("",!0),o("button",{class:"text-white rounded p-2 my-2 bg-green-500",onClick:s[4]||(s[4]=r=>t.tallyButton(1))}," +1 "),o("button",{class:"text-white rounded p-2 my-2 bg-green-500",onClick:s[5]||(s[5]=r=>t.tallyButton(5))}," +5 ")],2)]),o("div",M," Kassi #"+l(t.boxIndex+1),1),o("div",E,[o("button",{onClick:s[6]||(s[6]=r=>t.addGiantBox()),class:"m-1 p-2 border shadow-xl rounded hover:bg-gray-400 hover:text-white"}," B\xFAa til kassa "),(a(!0),i(h,null,g(t.sbBoxCounters,(r,n)=>(a(),i("button",{onClick:b=>t.changeBoxIndex(n),key:r+n,class:c([{"bg-blue-400":n===t.boxIndex,"text-white":n===t.boxIndex},"m-1 p-2 px-4 border shadow-xl rounded hover:bg-blue-300 hover:text-white"])},l(n+1),11,H))),128))]),V])],64))}});export{O as default};