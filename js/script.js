var pages=["home","about","specialities","health-check","online-report","patient-stories","career"];
function route(){
  var h=(location.hash||"#home").slice(1);if(pages.indexOf(h)<0)h="home";
  pages.forEach(function(p){document.getElementById(p).classList.toggle("on",p===h)});
  document.querySelectorAll("nav a").forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+h)});
  document.getElementById("nav").classList.remove("open");window.scrollTo(0,0);
}
window.addEventListener("hashchange",route);route();
document.getElementById("menu").onclick=function(){document.getElementById("nav").classList.toggle("open")};
[["hc","hcn"],["cr","crn"]].forEach(function(p){
  document.getElementById(p[0]).addEventListener("submit",function(e){e.preventDefault();document.getElementById(p[1]).style.display="block"});
});

(function(){
  var track=document.getElementById("track"),n=track.children.length,i=0,timer=null,dots=document.getElementById("sdots"),sl=document.getElementById("slider");
  for(var k=0;k<n;k++){(function(k){var b=document.createElement("button");b.setAttribute("aria-label","Photo "+(k+1));b.onclick=function(){go(k);restart()};dots.appendChild(b)})(k)}
  function go(x){i=(x+n)%n;track.style.transform="translateX(-"+(i*100)+"%)";[].forEach.call(dots.children,function(d,j){d.classList.toggle("on",j===i)})}
  function restart(){clearInterval(timer);if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)timer=setInterval(function(){go(i+1)},5000)}
  document.getElementById("sprev").onclick=function(){go(i-1);restart()};
  document.getElementById("snext").onclick=function(){go(i+1);restart()};
  sl.addEventListener("mouseenter",function(){clearInterval(timer)});sl.addEventListener("mouseleave",restart);
  var x0=null;sl.addEventListener("touchstart",function(e){x0=e.touches[0].clientX},{passive:true});
  sl.addEventListener("touchend",function(e){if(x0===null)return;var d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40){go(i+(d<0?1:-1));restart()}x0=null});
  go(0);restart();
})();

(function(){
  var chips=document.querySelectorAll("#chips .chip"),cards=document.querySelectorAll("#deptgrid .card"),sel=document.getElementById("c5");
  var names={medical:"Medical",nonmedical:"Non Medical",nursing:"Nursing"};
  chips.forEach(function(c){c.onclick=function(){
    var f=c.getAttribute("data-f");
    chips.forEach(function(x){x.classList.toggle("on",x===c)});
    cards.forEach(function(d){d.style.display=(f==="all"||d.getAttribute("data-d")===f)?"":"none"});
    if(names[f])sel.value=names[f];
  }});
  document.getElementById("applybtn").onclick=function(e){e.preventDefault();document.getElementById("apply").scrollIntoView({behavior:"smooth"})};
})();

(function(){
  document.querySelectorAll(".page-title .wrap").forEach(function(w){var c=document.createElement("div");c.className="cube";c.setAttribute("aria-hidden","true");c.innerHTML="<i></i><i></i><i></i><i></i><i></i><i></i>";w.appendChild(c)});
  if(matchMedia("(pointer:coarse)").matches||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  var T=".card,.photo,.gal figure",cur=null;
  document.addEventListener("mousemove",function(e){
    var el=e.target.closest?e.target.closest(T):null;
    if(cur&&cur!==el)cur.style.transform="";
    cur=el;if(!el)return;
    var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    el.style.transform="perspective(800px) rotateX("+(-y*9).toFixed(2)+"deg) rotateY("+(x*11).toFixed(2)+"deg) translateZ(8px)";
  });
  document.addEventListener("mouseleave",function(){if(cur){cur.style.transform="";cur=null}});
})();

(function(){
  var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches,coarse=matchMedia("(pointer:coarse)").matches;
  var h=document.querySelector(".hero");
  if(h){
    [["cross","6%","14%","0s"],["pill","46%","80%","1.5s"],["cross","92%","22%","3s"],["pill","68%","8%","4.5s"],["cross","28%","72%","6s"]].forEach(function(f){var e=document.createElement("span");e.className="fl "+f[0];e.setAttribute("aria-hidden","true");e.style.setProperty("--x",f[1]);e.style.setProperty("--y",f[2]);e.style.setProperty("--dl",f[3]);h.appendChild(e)});
    var sc=h.querySelector(".scene");
    if(sc&&!coarse&&!reduce){
      h.addEventListener("mousemove",function(e){var r=h.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;sc.style.transform="perspective(900px) rotateY("+(x*22).toFixed(1)+"deg) rotateX("+(-y*14).toFixed(1)+"deg)"});
      h.addEventListener("mouseleave",function(){sc.style.transform=""});
    }
  }
  if(reduce||!("IntersectionObserver" in window))return;
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){var el=en.target;el.classList.add("in");io.unobserve(el);setTimeout(function(){el.classList.remove("rv","in");el.style.removeProperty("--d")},1400)}})},{threshold:.1});
  document.querySelectorAll(".card,.md,.gal figure,.sec h2,.band .motto,.slider,.chips").forEach(function(el){
    var i=Array.prototype.indexOf.call(el.parentNode.children,el);
    el.style.setProperty("--d",(Math.min(i,6)*0.08).toFixed(2)+"s");el.classList.add("rv");io.observe(el);
  });
})();

(function(){
var K="tmDialysisV1",D={patients:[],sessions:[],payments:[],income:[],expenses:[]},cur=null;var FEES={reg:1600,sbf:1200},CATN={reg:"Regular",sbf:"Sonar Bangla Foundation Bangladesh",cus:"Custom"};
try{var r0=localStorage.getItem(K);if(r0){var o=JSON.parse(r0);if(o&&o.patients)D=o}}catch(e){}
D.income=D.income||[];D.expenses=D.expenses||[];
function save(){try{localStorage.setItem(K,JSON.stringify(D))}catch(e){}}
function $(i){return document.getElementById(i)}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function tk(n){return "Tk "+Math.round(n).toLocaleString("en-US")}
function money(n){return tk(n)}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
function today(){var d=new Date();return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2)}
function sum(a,f){return a.reduce(function(t,x){return t+f(x)},0)}
function stat(p){var s=D.sessions.filter(function(x){return x.pid===p.id}).sort(function(a,b){return a.date<b.date?-1:1}),a=D.payments.filter(function(x){return x.pid===p.id}).sort(function(a,b){return a.date<b.date?-1:1});var b=sum(s,function(x){return x.fee}),pd=sum(a,function(x){return x.amount});return{n:s.length,billed:b,paid:pd,due:b-pd,s:s,a:a}}
function pid(id){return D.patients.filter(function(p){return p.id===id})[0]}
function nextId(){var m=0;D.patients.forEach(function(p){var n=parseInt(p.id.replace(/\D/g,""),10)||0;if(n>m)m=n});return "TM-"+("000"+(m+1)).slice(-4)}
function nm(id){var p=pid(id);return p?p.name+" ("+p.id+")":"Unknown patient"}
function kpis(){var sb=sum(D.sessions,function(x){return x.fee}),pd=sum(D.payments,function(x){return x.amount}),oi=sum(D.income,function(x){return x.amount}),ex=sum(D.expenses,function(x){return x.amount});
 $("kpis").innerHTML=[["Patients",D.patients.length,""],["Dialysis sessions",D.sessions.length,""],["Total income",tk(sb+oi),""],["Cash received",tk(pd+oi),""],["Due balance",tk(sb-pd),"due"],["Total expenses",tk(ex),""],["Net cash",tk(pd+oi-ex),""]].map(function(k){return '<div class="kpi '+k[2]+'"><b>'+k[1]+'</b><span>'+k[0]+'</span></div>'}).join("")}
function fillSel(){var o=D.patients.map(function(p){return '<option value="'+p.id+'">'+esc(p.name)+" ("+p.id+")</option>"}).join("")||'<option value="">Add a patient first</option>';["sp","yp"].forEach(function(i){var v=$(i).value;$(i).innerHTML=o;if(v)$(i).value=v});sesFee()}
function sesFee(){var p=pid($("sp").value);if(p&&!$("sf").dataset.touched)$("sf").value=p.fee}
function patients(){var q=$("q").value.toLowerCase().trim(),rows=D.patients.filter(function(p){return !q||(p.name+" "+p.id+" "+p.mobile).toLowerCase().indexOf(q)>-1});
 var h='<thead><tr><th>ID</th><th>Patient</th><th>Mobile</th><th class="n">Fee/session</th><th class="n">Sessions</th><th class="n">Total</th><th class="n">Paid</th><th class="n">Due</th><th></th></tr></thead><tbody>';
 h+=rows.map(function(p){var t=stat(p);return '<tr><td>'+p.id+'</td><td>'+esc(p.name)+'</td><td>'+esc(p.mobile)+'</td><td class="n">'+tk(p.fee)+(p.cat==="sbf"?'<br><small>SBFB rate</small>':p.cat==="reg"?'<br><small>Regular</small>':'')+'</td><td class="n">'+t.n+'</td><td class="n">'+tk(t.billed)+'</td><td class="n">'+tk(t.paid)+'</td><td class="n" style="color:'+(t.due>0?"#c0392b":"inherit")+'">'+tk(t.due)+'</td><td><button class="mini" data-a="rec" data-id="'+p.id+'">Record</button><button class="mini del" data-a="del" data-id="'+p.id+'">Delete</button></td></tr>'}).join("")||'<tr><td colspan="9">No patients found. Add one in the Add Records tab.</td></tr>';
 $("ptbl").innerHTML=h+"</tbody>"}
function recInner(p,btn){var t=stat(p);
 var h='<h2>Patient record: '+esc(p.name)+'</h2><p>ID: '+p.id+' | Mobile: '+esc(p.mobile)+' | Fee per session: '+tk(p.fee)+(CATN[p.cat]?' ('+CATN[p.cat]+')':'')+'</p><p>Sessions: '+t.n+' | Total: '+tk(t.billed)+' | Paid: '+tk(t.paid)+' | <strong>Due: '+tk(t.due)+'</strong></p>';
 h+='<h3 style="margin-top:14px">Dialysis sessions</h3><div class="tblwrap"><table class="t"><thead><tr><th>#</th><th>Date</th><th class="n">Fee</th>'+(btn?'<th></th>':'')+'</tr></thead><tbody>'+(t.s.map(function(x,i){return '<tr><td>'+(i+1)+'</td><td>'+x.date+'</td><td class="n">'+tk(x.fee)+'</td>'+(btn?'<td><button class="mini del" data-a="dled" data-k="session" data-id="'+x.id+'">Remove</button></td>':'')+'</tr>'}).join("")||'<tr><td colspan="4">No sessions yet.</td></tr>')+'</tbody></table></div>';
 h+='<h3 style="margin-top:14px">Payment history</h3><div class="tblwrap"><table class="t"><thead><tr><th>Date</th><th class="n">Amount</th><th>Note</th>'+(btn?'<th></th>':'')+'</tr></thead><tbody>'+(t.a.map(function(x){return '<tr><td>'+x.date+'</td><td class="n">'+tk(x.amount)+'</td><td>'+esc(x.note||"")+'</td>'+(btn?'<td><button class="mini del" data-a="dled" data-k="payment" data-id="'+x.id+'">Remove</button></td>':'')+'</tr>'}).join("")||'<tr><td colspan="4">No payments yet.</td></tr>')+'</tbody></table></div>';
 return h}
function showRec(id){cur=id;var p=pid(id);if(!p){$("rec").innerHTML="";return}
 $("rec").innerHTML='<div class="fbox">'+recInner(p,true)+'<div style="margin-top:14px"><button class="btn" data-a="rprt" type="button">Print A4</button><button class="btn alt" data-a="rpdf" type="button">Download PDF</button><button class="btn alt" data-a="rclose" type="button">Close</button></div></div>'}
/* generic tables */
function cell(c,tag,i,nf){var num=typeof c==="number";return "<"+tag+(num||(i>=nf&&nf>=0&&tag==="th")?' class="n"':"")+">"+(num?tk(c):esc(c))+"</"+tag+">"}
function tableHTML(head,rows,foot,acts){var h='<table class="t"><thead><tr>'+head.map(function(c,i){return cell(c,"th",i,-1)}).join("")+(acts?"<th></th>":"")+"</tr></thead><tbody>";
 h+=rows.map(function(r,ri){return "<tr>"+r.map(function(c,i){return cell(c,"td",i,-1)}).join("")+(acts?'<td><button class="mini del" data-a="dled" data-k="'+acts[ri].k+'" data-id="'+acts[ri].id+'">Remove</button></td>':"")+"</tr>"}).join("")||'<tr><td colspan="'+(head.length+(acts?1:0))+'">No entries.</td></tr>';
 h+="</tbody>";if(foot)h+="<tfoot><tr>"+foot.map(function(c,i){return cell(c,"td",i,-1)}).join("")+(acts?"<td></td>":"")+"</tr></tfoot>";return h+"</table>"}
function pdfRows(title,sub,head,rows,foot,fname){var doc=newDoc(title,sub);if(!doc)return;var fm=function(r){return r.map(function(c){return typeof c==="number"?money(c):c})};
 doc.autoTable({startY:34,head:[head],body:rows.map(fm),foot:foot?[fm(foot)]:undefined,styles:{fontSize:8},headStyles:{fillColor:[0,77,37]},footStyles:{fillColor:[17,130,59]}});saveFile(fname,doc.output("blob"))}
function csvRows(head,rows,foot,fname){var NL=String.fromCharCode(10),q=function(c){return '"'+String(c).replace(/"/g,'""')+'"'};saveFile(fname,[head].concat(rows,foot?[foot]:[]).map(function(r){return r.map(q).join(",")}).join(NL))}
/* ledger */
var TN={session:"Dialysis session",payment:"Payment",income:"Other income",expense:"Expense"},TO={session:0,payment:1,income:2,expense:3};
function entries(){var L=[];
 D.sessions.forEach(function(x){L.push({id:x.id,k:"session",d:x.date,desc:"Dialysis session: "+nm(x.pid),bill:x.fee,rec:0,exp:0})});
 D.payments.forEach(function(x){L.push({id:x.id,k:"payment",d:x.date,desc:"Payment received: "+nm(x.pid)+(x.note?" - "+x.note:""),bill:0,rec:x.amount,exp:0})});
 D.income.forEach(function(x){L.push({id:x.id,k:"income",d:x.date,desc:"Other income: "+x.desc,bill:x.amount,rec:x.amount,exp:0})});
 D.expenses.forEach(function(x){L.push({id:x.id,k:"expense",d:x.date,desc:x.cat+(x.desc?": "+x.desc:""),bill:0,rec:0,exp:x.amount})});
 L.sort(function(a,b){return a.d<b.d?-1:a.d>b.d?1:TO[a.k]-TO[b.k]});var bal=0;L.forEach(function(e){bal+=e.rec-e.exp;e.bal=bal});return L}
var LH=["Date","Type","Details","Income","Received","Expense","Cash balance"];
function ledData(){var t=$("lt").value,q=$("lq").value.toLowerCase().trim(),l=entries().filter(function(e){return (t==="all"||e.k===t)&&(!q||(e.desc+" "+e.d+" "+TN[e.k]).toLowerCase().indexOf(q)>-1)});
 return{l:l,rows:l.map(function(e){return [e.d,TN[e.k],e.desc,e.bill,e.rec,e.exp,e.bal]}),foot:["","Total","",sum(l,function(e){return e.bill}),sum(l,function(e){return e.rec}),sum(l,function(e){return e.exp}),""]}}
function ledger(){var d=ledData();$("ledger").innerHTML=tableHTML(LH,d.rows,d.foot,d.l.map(function(e){return{k:e.k,id:e.id}}))}
/* daily + monthly sheets */
function dayData(d){var L=entries().filter(function(e){return e.d===d}),n=L.filter(function(e){return e.k==="session"}).length,v=function(k,f){return sum(L.filter(function(e){return e.k===k}),function(e){return e[f]})};
 var bs=v("session","bill"),oi=v("income","bill"),pr=v("payment","rec"),ee=v("expense","exp");
 return{L:L,rows:[["Dialysis sessions ("+n+")",bs],["Other income",oi],["Total income",bs+oi],["Payments received from patients",pr],["Total cash received (payments + other income)",pr+oi],["Expenses",ee],["Net cash (received - expenses)",pr+oi-ee]]}}
function dayHTML(){var d=$("dd").value;if(!d)return "<p>Choose a date.</p>";var x=dayData(d);
 return "<h2>Daily accounts sheet: "+d+"</h2>"+tableHTML(["Item","Amount"],x.rows)+'<h3 style="margin-top:14px">Entries</h3>'+tableHTML(["Type","Details","Income","Received","Expense"],x.L.map(function(e){return [TN[e.k],e.desc,e.bill,e.rec,e.exp]}))}
function monData(m){var days={};entries().filter(function(e){return e.d.slice(0,7)===m}).forEach(function(e){var o=days[e.d]=days[e.d]||{n:0,i:0,r:0,x:0};if(e.k==="session")o.n++;o.i+=e.bill;o.r+=e.rec;o.x+=e.exp});
 var ks=Object.keys(days).sort(),rows=ks.map(function(d){var o=days[d];return [d,String(o.n),o.i,o.r,o.x,o.r-o.x]}),g=function(f){return sum(ks,function(d){return days[d][f]})};
 return{rows:rows,foot:["Total",String(g("n")),g("i"),g("r"),g("x"),g("r")-g("x")]}}
var MH=["Date","Sessions","Income","Cash received","Expenses","Net cash"];
function monHTML(){var m=$("mm").value;if(!m)return "<p>Choose a month.</p>";var x=monData(m),due=sum(D.patients,function(p){return stat(p).due});
 return "<h2>Monthly accounts sheet: "+m+"</h2>"+tableHTML(MH,x.rows,x.foot)+"<p style='margin-top:10px'><strong>Total patient dues to date: "+tk(due)+"</strong></p>"}
function sheets(){$("dsheet").innerHTML=dayHTML();$("msheet").innerHTML=monHTML()}
function pdfDay(){var d=$("dd").value;if(!d)return;var x=dayData(d),doc=newDoc("Daily accounts sheet: "+d,"Generated "+today());if(!doc)return;
 doc.autoTable({startY:34,head:[["Item","Amount"]],body:x.rows.map(function(r){return [r[0],money(r[1])]}),styles:{fontSize:9},headStyles:{fillColor:[0,77,37]}});
 doc.autoTable({startY:doc.lastAutoTable.finalY+8,head:[["Type","Details","Income","Received","Expense"]],body:x.L.map(function(e){return [TN[e.k],e.desc,money(e.bill),money(e.rec),money(e.exp)]}),styles:{fontSize:8},headStyles:{fillColor:[17,130,59]}});
 saveFile("daily-accounts-"+d+".pdf",doc.output("blob"))}
/* patient-wise period report */
function inRange(d){var t=$("rt").value,v=String($("rv").value);return t==="d"?d===v:t==="m"?d.slice(0,7)===v:d.slice(0,4)===v}
function repData(){var rows=[];D.patients.forEach(function(p){var s=D.sessions.filter(function(x){return x.pid===p.id&&inRange(x.date)}),a=D.payments.filter(function(x){return x.pid===p.id&&inRange(x.date)});if(!s.length&&!a.length)return;var b=sum(s,function(x){return x.fee}),pd=sum(a,function(x){return x.amount});rows.push([p.id,p.name,p.mobile,String(s.length),b,pd,b-pd,stat(p).due])});
 return{rows:rows,tot:["","Total","",String(sum(rows,function(r){return +r[3]})),sum(rows,function(r){return r[4]}),sum(rows,function(r){return r[5]}),sum(rows,function(r){return r[6]}),sum(rows,function(r){return r[7]})]}}
var HEAD=["ID","Patient","Mobile","Sessions","Billed","Paid","Period balance","Total due"];
function rtitle(){var t=$("rt").value;return (t==="d"?"Daily":t==="m"?"Monthly":"Yearly")+" patient report: "+$("rv").value}
function repHTML(){if(!$("rv").value)return "<p>Choose a period.</p>";var d=repData();return tableHTML(HEAD,d.rows,d.tot)}
function rep(){$("rep").innerHTML=repHTML()}
/* print / pdf / save */
function sheet(inner){var sh=$("printSheet");sh.innerHTML='<h1>T-M Hospital and Kidney Dialysis Center</h1><p>BGB Camp Road, Bhimalpur More, Phulbari, Dinajpur. | Generated: '+today()+'</p>'+inner;window.print()}
function saveFile(name,data){
 if(!(window.claude&&claude.use)){try{var bl=(typeof Blob!=="undefined"&&data instanceof Blob)?data:new Blob([data],{type:"text/csv"}),u=URL.createObjectURL(bl),a=document.createElement("a");a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},2000)}catch(e){alert("Could not save the file.")}return}
 claude.use("downloads").then(function(d){if(!d){alert("Saving is not available in this view. Use Print A4 and choose Save as PDF.");return}return d.save({filename:name,data:data})}).catch(function(e){if(e&&e.code!=="declined")alert("Could not save the file: "+((e&&(e.message||e.code))||"error"))})}
function newDoc(title,sub){if(!window.jspdf){alert("The PDF tool did not load. Use Print A4 and choose Save as PDF.");return null}
 var doc=new jspdf.jsPDF({unit:"mm",format:"a4"});doc.setFontSize(15);doc.text("T-M Hospital and Kidney Dialysis Center",14,16);doc.setFontSize(11);doc.text(title,14,23);doc.setFontSize(9);doc.text(sub,14,29);return doc}
function pdfRecord(p){var t=stat(p),doc=newDoc("Patient record: "+p.name+" ("+p.id+")","Mobile: "+p.mobile+" | Sessions: "+t.n+" | Total: "+money(t.billed)+" | Paid: "+money(t.paid)+" | Due: "+money(t.due));if(!doc)return;
 doc.autoTable({startY:34,head:[["#","Dialysis date","Fee"]],body:t.s.map(function(x,i){return [i+1,x.date,money(x.fee)]}),styles:{fontSize:9},headStyles:{fillColor:[0,77,37]}});
 doc.autoTable({startY:doc.lastAutoTable.finalY+8,head:[["Payment date","Amount","Note"]],body:t.a.map(function(x){return [x.date,money(x.amount),x.note||""]}),styles:{fontSize:9},headStyles:{fillColor:[17,130,59]}});
 saveFile("patient-"+p.id+".pdf",doc.output("blob"))}
function setRV(){var t=$("rt").value,v=$("rv"),n=today();if(t==="d"){v.type="date";v.value=n}else if(t==="m"){v.type="month";v.value=n.slice(0,7)}else{v.type="number";v.min=2000;v.max=2100;v.value=n.slice(0,4)}rep()}
function all(){kpis();fillSel();patients();if(cur)showRec(cur);ledger();sheets();rep()}
function catFee(){var c=$("pc").value;if(FEES[c]){$("pf").value=FEES[c];$("pf").readOnly=true}else{$("pf").readOnly=false}}
/* events */
$("fpat").addEventListener("submit",function(e){e.preventDefault();D.patients.push({id:nextId(),name:$("pn").value.trim(),mobile:$("pm").value.trim(),fee:+$("pf").value,cat:$("pc").value});save();e.target.reset();catFee();all()});
$("fses").addEventListener("submit",function(e){e.preventDefault();if(!$("sp").value)return;D.sessions.push({id:uid(),pid:$("sp").value,date:$("sd").value,fee:+$("sf").value});save();$("sd").value=today();all()});
$("fpay").addEventListener("submit",function(e){e.preventDefault();if(!$("yp").value)return;D.payments.push({id:uid(),pid:$("yp").value,date:$("yd").value,amount:+$("ya").value,note:$("yn").value.trim()});save();$("ya").value="";$("yn").value="";$("yd").value=today();all()});
$("finc").addEventListener("submit",function(e){e.preventDefault();D.income.push({id:uid(),date:$("od").value,desc:$("ot").value.trim(),amount:+$("oa").value});save();$("ot").value="";$("oa").value="";$("od").value=today();all()});
$("fexp").addEventListener("submit",function(e){e.preventDefault();D.expenses.push({id:uid(),date:$("ed").value,cat:$("ec").value,desc:$("et").value.trim(),amount:+$("ea").value});save();$("et").value="";$("ea").value="";$("ed").value=today();all()});
$("pc").addEventListener("change",function(){catFee();if(!FEES[$("pc").value])$("pf").value=""});
$("sp").addEventListener("change",function(){$("sf").dataset.touched="";sesFee()});$("sf").addEventListener("input",function(){$("sf").dataset.touched="1"});
$("q").addEventListener("input",patients);$("lt").addEventListener("change",ledger);$("lq").addEventListener("input",ledger);
$("dd").addEventListener("input",sheets);$("mm").addEventListener("input",sheets);$("rt").addEventListener("change",setRV);$("rv").addEventListener("input",rep);
$("lprint").onclick=function(){var d=ledData();sheet("<h2>Accounts &amp; ledger</h2>"+tableHTML(LH,d.rows,d.foot))};
$("lpdf").onclick=function(){var d=ledData();pdfRows("Accounts & ledger","Generated "+today(),LH,d.rows,d.foot,"accounts-ledger.pdf")};
$("lcsv").onclick=function(){var d=ledData();csvRows(LH,d.rows,d.foot,"accounts-ledger.csv")};
$("dprint").onclick=function(){sheet(dayHTML())};$("dpdf").onclick=pdfDay;
$("mprint").onclick=function(){sheet(monHTML())};
$("mpdf").onclick=function(){var m=$("mm").value;if(!m)return;var x=monData(m);pdfRows("Monthly accounts sheet: "+m,"Generated "+today(),MH,x.rows,x.foot,"monthly-accounts-"+m+".pdf")};
$("mcsv").onclick=function(){var m=$("mm").value;if(!m)return;var x=monData(m);csvRows(MH,x.rows,x.foot,"monthly-accounts-"+m+".csv")};
$("rprint").onclick=function(){sheet("<h2>"+esc(rtitle())+"</h2>"+repHTML())};
$("rpdf").onclick=function(){if(!$("rv").value)return;var d=repData();pdfRows(rtitle(),"Generated "+today(),HEAD,d.rows,d.tot,"patient-report-"+$("rv").value+".pdf")};
$("rcsv").onclick=function(){if(!$("rv").value)return;var d=repData();csvRows(HEAD,d.rows,d.tot,"patient-report-"+$("rv").value+".csv")};
var PN=["dash","pat","add","led","day","mon","rep"];
document.querySelectorAll("#otabs .chip").forEach(function(c){c.onclick=function(){document.querySelectorAll("#otabs .chip").forEach(function(x){x.classList.toggle("on",x===c)});PN.forEach(function(k){$("p-"+k).classList.toggle("on",k===c.getAttribute("data-p"))})}});
var ARR={session:"sessions",payment:"payments",income:"income",expense:"expenses"};
document.getElementById("online-report").addEventListener("click",function(e){var b=e.target.closest("[data-a]");if(!b)return;var a=b.getAttribute("data-a"),id=b.getAttribute("data-id");
 if(a==="rec")showRec(id);
 else if(a==="rclose"){cur=null;$("rec").innerHTML=""}
 else if(a==="del"){var p=pid(id);if(p&&confirm("Delete "+p.name+" and all of their sessions and payments?")){D.patients=D.patients.filter(function(x){return x.id!==id});D.sessions=D.sessions.filter(function(x){return x.pid!==id});D.payments=D.payments.filter(function(x){return x.pid!==id});if(cur===id)cur=null;if(!cur)$("rec").innerHTML="";save();all()}}
 else if(a==="dled"){var k=ARR[b.getAttribute("data-k")];if(k&&confirm("Remove this entry?")){D[k]=D[k].filter(function(x){return x.id!==id});save();all()}}
 else if(a==="rprt"){var p2=pid(cur);if(p2)sheet(recInner(p2,false))}
 else if(a==="rpdf"){var p3=pid(cur);if(p3)pdfRecord(p3)}});
["sd","yd","od","ed","dd"].forEach(function(i){$(i).value=today()});$("mm").value=today().slice(0,7);catFee();setRV();all();
})();
