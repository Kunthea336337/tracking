(function(){document.getElementById("loadWarn").hidden=true;
var KEY="ramap-typing-v1",db={n:0,students:[]},$=function(i){return document.getElementById(i)};
try{var raw=localStorage.getItem(KEY);if(raw)db=JSON.parse(raw)}catch(e){}
db.students=db.students||[];
function save(){try{localStorage.setItem(KEY,JSON.stringify(db));return true}catch(e){$("storeWarn").hidden=false;return false}}
try{localStorage.setItem(KEY+"-t","1");localStorage.removeItem(KEY+"-t")}catch(e){$("storeWarn").hidden=false}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
var RQ=[["a","Meet your expectation","ឆ្លើយតបតាមការរំពឹងទុក"],["b","Useful in your daily work","មានប្រយោជន៍ក្នុងការងារប្រចាំថ្ងៃ"],["c","Satisfaction","ការពេញចិត្ត"],["d","Can share their knowledge and skill to others","អាចចែករំលែកចំណេះដឹង និងជំនាញដល់អ្នកដទៃ"],["e","Can apply the knowledge","អាចអនុវត្តចំណេះដឹង"],["f","Use the knowledge and skills","ប្រើប្រាស់ចំណេះដឹង និងជំនាញ"]],RL=["Very low","Low","Medium","High","Very high"];
var COLS=[["ល.រ","No.",function(s,i){return i+1}],
["ឈ្មោះសិស្សភាសាខ្មែរ","Name in Khmer",function(s){return s.nameKh}],
["ឈ្មោះជាភាសាអង់គ្លេស","Name in English",function(s){return s.name}],
["ភេទ","Gender",function(s){return s.gender}],
["អាយុ","Age",function(s){return s.age?+s.age:""}],
["ថ្នាក់","Grade",function(s){return s.grade}],
["ឈ្មោះសាលា","School name",function(s){return s.school}],
["មុខវិជ្ជាបញ្ចប់វគ្គសិក្សា","Course completed",function(s){return s.course}],
["ចូលរៀនវគ្គទី","Session",function(s){return s.session}],
["សិស្សថ្មី","New student",function(s){return s.type==="New"?"✓":""}],
["សិស្សចាស់","Returning student",function(s){return s.type==="Returning"?"✓":""}],
["កាលបរិច្ឆេទចូលរៀន","Enrollment date",function(s){return s.d1}],
["កាលបរិច្ឆេទបញ្ចប់វគ្គ","Course end date",function(s){return s.d2}],
["កាលបរិច្ឆេទបិទវគ្គ","Course closing date",function(s){return s.d3}]]
.concat(RQ.map(function(q,k){return[q[2],q[1],function(s){var v=(s.r||[])[k];return v?+v:""}]}),
[["តើអ្នកនឹងប្រើប្រាស់ជំនាញថ្មីរបស់អ្នកយ៉ាងដូចម្តេច?","How will use your new skills?",function(s){return s.plan}],
["តើក្តីស្រមៃរបស់អ្នកជាអ្វី?","What is your dream?",function(s){return s.dream}]]);
function val(c,s,i){var v=c[2](s,i);return v==null?"":v}

$("ratings").innerHTML=RQ.map(function(q){return'<div><label for="r_'+q[0]+'">'+q[2]+" ("+q[1]+')</label><select id="r_'+q[0]+'"><option value="">Not rated</option>'+RL.map(function(l,i){return'<option value="'+(i+1)+'">'+(i+1)+" – "+l+"</option>"}).join("")+"</select></div>"}).join("");
$("hd").innerHTML="<tr>"+COLS.map(function(c){return"<th>"+c[0]+"<small>"+c[1]+"</small></th>"}).join("")+"<th></th></tr>";

document.querySelectorAll(".tabs button").forEach(function(b){b.onclick=function(){show(b.dataset.tab)}});
function show(id){["register","records"].forEach(function(s){$(s).hidden=s!==id});
 document.querySelectorAll(".tabs button").forEach(function(b){b.setAttribute("aria-selected",b.dataset.tab===id)});
 if(id==="records")render()}

$("regForm").onsubmit=function(e){e.preventDefault();db.n=(db.n||0)+1;
 var s={id:"RT-"+String(db.n).padStart(3,"0"),name:$("name").value.trim(),nameKh:$("nameKh").value.trim(),gender:$("gender").value,age:$("age").value,grade:$("grade").value.trim(),school:$("school").value.trim(),course:$("course").value.trim(),session:$("session").value.trim(),type:$("type").value,d1:$("d1").value,d2:$("d2").value,d3:$("d3").value,r:RQ.map(function(q){return $("r_"+q[0]).value}),plan:$("plan").value.trim(),dream:$("dream").value.trim(),date:Date.now()};
 db.students.push(s);var kept=save();$("regForm").reset();$("regMsg").textContent=kept?"Saved "+s.name+" as No. "+db.students.length+".":"Not saved permanently: "+s.name+" will disappear when you close this page. Download Excel first."};

var arm=null;
function render(){
 var list=db.students;
 $("rows").innerHTML=list.length?list.map(function(s){var i=db.students.indexOf(s);
  return"<tr>"+COLS.map(function(c){return"<td>"+esc(val(c,s,i))+"</td>"}).join("")+'<td class="act">'+(arm===s.id?'<input type="password" class="dpw" placeholder="Password" aria-label="Password to confirm delete" autocomplete="off"> <button data-d="'+s.id+'" class="danger">Confirm delete</button> <button data-c="1">Cancel</button>':'<button data-d="'+s.id+'">Delete</button>')+"</td></tr>"}).join("")
  :'<tr><td colspan="'+(COLS.length+1)+'" class="empty">'+"No students yet. Register your first student in the Register student tab."+"</td></tr>"}
function ok(t){return crypto.subtle.digest("SHA-256",new TextEncoder().encode(t)).then(function(b){return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,"0")}).join("")==="2d1a17014c958c6e0aff81e9ddc64af1fe8671a1c7f007dade19323e425f560e"})}
$("rows").onkeydown=function(e){if(e.key==="Enter"&&e.target.classList.contains("dpw"))e.target.parentNode.querySelector("button.danger").click()};
$("rows").onclick=async function(e){var b=e.target.closest("button");if(!b)return;var m=$("recMsg");
 if(b.dataset.c){arm=null;m.textContent="";render();return}
 var id=b.dataset.d;
 if(arm!==id){arm=id;m.textContent="Enter the password, then press Confirm delete.";render();var d=document.querySelector(".dpw");if(d)d.focus();return}
 var inp=b.parentNode.querySelector(".dpw");
 if(!await ok(inp.value)){m.textContent="Wrong password. The student was not deleted.";inp.value="";inp.focus();return}
 db.students=db.students.filter(function(s){return s.id!==id});arm=null;save();m.textContent="Student deleted.";render()};

$("xl").onclick=async function(){var m=$("recMsg");m.textContent="";
 var h=Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode($("pw").value)))).map(function(x){return x.toString(16).padStart(2,"0")}).join("");
 if(h!=="2d1a17014c958c6e0aff81e9ddc64af1fe8671a1c7f007dade19323e425f560e"){m.textContent="Wrong password. Enter the password to download the Excel file.";return}
 $("pw").value="";
 if(!db.students.length){m.textContent="No students to export yet.";return}
 if(!window.XLSX){m.textContent="The Excel library did not load. Check your internet connection and reload the page.";return}
 var rows=[COLS.map(function(c){return c[0]+" ("+c[1]+")"})].concat(db.students.map(function(s,i){return COLS.map(function(c){return val(c,s,i)})}));
 var ws=XLSX.utils.aoa_to_sheet(rows);
 ws["!cols"]=COLS.map(function(c,k){return{wch:k===0?6:k<3?26:k>=COLS.length-2?44:20}});
 var wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,"Students");
 XLSX.writeFile(wb,"student-tracking-"+new Date().toISOString().slice(0,10)+".xlsx");m.textContent="Excel file downloaded."};
})();
