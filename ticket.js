/* ══ ALL MATCHES DATA ══ */
const allMatches = [
  {id:1,comp:"Botola Pro D1",compKey:"botola",date:"Sam 17 Mai 2026",time:"20:00",
   home:{name:"WYDAD",city:"Casablanca",color:"#C8102E",bg:"#C8102E22",emoji:"🔴"},
   away:{name:"RAJA",city:"Casablanca",color:"#2E8B57",bg:"#2E8B5722",emoji:"🟢"},
   venue:"Stade Mohammed V",minPrice:80,totalAvail:600,hot:true,hasWydad:true,isCasa:true,day:17},
  {id:2,comp:"Coupe du Trône",compKey:"coupe",date:"Mer 21 Mai 2026",time:"18:30",
   home:{name:"FAR",city:"Rabat",color:"#1565C0",bg:"#1565C022",emoji:"🔵"},
   away:{name:"MAS",city:"Fès",color:"#FF6F00",bg:"#FF6F0022",emoji:"🟠"},
   venue:"Complexe Moulay Abdellah",minPrice:50,totalAvail:1060,hot:false,hasWydad:false,isCasa:false,day:21},
  {id:3,comp:"Botola Pro D1",compKey:"botola",date:"Dim 25 Mai 2026",time:"19:00",
   home:{name:"KAWKAB",city:"Marrakech",color:"#8B0000",bg:"#8B000022",emoji:"🔴"},
   away:{name:"WYDAD",city:"Casablanca",color:"#C8102E",bg:"#C8102E22",emoji:"🔴"},
   venue:"Stade de Marrakech",minPrice:60,totalAvail:1110,hot:false,hasWydad:true,isCasa:false,day:25},
  {id:4,comp:"Botola Pro D1",compKey:"botola",date:"Sam 31 Mai 2026",time:"20:30",
   home:{name:"WYDAD",city:"Casablanca",color:"#C8102E",bg:"#C8102E22",emoji:"🔴"},
   away:{name:"HASSANIA",city:"Agadir",color:"#FF8C00",bg:"#FF8C0022",emoji:"🟡"},
   venue:"Stade Mohammed V",minPrice:80,totalAvail:850,hot:false,hasWydad:true,isCasa:true,day:31},
  {id:5,comp:"Botola Pro D1",compKey:"botola",date:"Dim 8 Juin 2026",time:"18:00",
   home:{name:"MAT",city:"Tétouan",color:"#006400",bg:"#00640022",emoji:"🟩"},
   away:{name:"RAJA",city:"Casablanca",color:"#2E8B57",bg:"#2E8B5722",emoji:"🟢"},
   venue:"Stade Saniat R'mel",minPrice:50,totalAvail:2100,hot:false,hasWydad:false,isCasa:false,day:8},
  {id:6,comp:"Coupe du Trône",compKey:"coupe",date:"Sam 14 Juin 2026",time:"20:00",
   home:{name:"WYDAD",city:"Casablanca",color:"#C8102E",bg:"#C8102E22",emoji:"🔴"},
   away:{name:"FAR",city:"Rabat",color:"#1565C0",bg:"#1565C022",emoji:"🔵"},
   venue:"Stade Mohammed V",minPrice:100,totalAvail:300,hot:true,hasWydad:true,isCasa:true,day:14},
];

let currentFilter = 'all';
let calView = 'list';
let calMonth = 4; // May = index 4 (0-based)
const months = ["Janv","Févr","Mars","Avr","Mai","Juin","Juil","Août","Sep","Oct","Nov","Déc"];
const fullMonths = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

function getAvailBadge(n){
  if(n===0) return '<span class="mr-avail avail-none">Complet</span>';
  if(n<100) return '<span class="mr-avail avail-few">⚠ '+n+' restantes</span>';
  return '<span class="mr-avail avail-ok">✔ Disponible</span>';
}

function renderAllMatches(filter){
  const list = document.getElementById('allMatchList');
  let filtered = allMatches;
  if(filter==='botola') filtered = allMatches.filter(m=>m.compKey==='botola');
  else if(filter==='coupe') filtered = allMatches.filter(m=>m.compKey==='coupe');
  else if(filter==='wydan') filtered = allMatches.filter(m=>m.hasWydad);
  else if(filter==='casa') filtered = allMatches.filter(m=>m.isCasa);
  list.innerHTML = filtered.map(m=>`
    <div class="match-row ${m.hot?'hot':''}">
      <div class="match-row-top">
        <span class="comp-tag">${m.comp}</span>
        <span class="match-date-tag">${m.date}</span>
        <span class="match-time-tag"><i class="ti ti-clock" style="font-size:12px"></i>${m.time}</span>
      </div>
      <div class="match-row-teams">
        <div class="mr-team">
          <div class="mr-badge" style="background:${m.home.bg};color:${m.home.color}">${m.home.emoji}</div>
          <div><div class="mr-name">${m.home.name}</div><div class="mr-city">${m.home.city}</div></div>
        </div>
        <div class="mr-vs">
          <div class="mr-vs-text">VS</div>
          <div class="mr-venue">${m.venue}</div>
        </div>
        <div class="mr-team r">
          <div class="mr-badge" style="background:${m.away.bg};color:${m.away.color}">${m.away.emoji}</div>
          <div style="text-align:right"><div class="mr-name">${m.away.name}</div><div class="mr-city">${m.away.city}</div></div>
        </div>
      </div>
      <div class="match-row-bottom">
        <div>
          <div class="mr-price-from">À partir de</div>
          <div class="mr-price">${m.minPrice} <span>DH</span></div>
        </div>
        ${getAvailBadge(m.totalAvail)}
        <button class="btn-buy" onclick="window.location='ticketwydad.html'">Acheter →</button>
      </div>
    </div>`).join('');
}

function filterMatches(el, key){
  document.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('on'));
  el.classList.add('on');
  currentFilter = key;
  renderAllMatches(key);
}

function setCalView(type, btn){
  calView = type;
  document.querySelectorAll('.ctog').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  document.getElementById('listView').style.display = type==='list' ? 'block' : 'none';
  document.getElementById('calView').style.display = type==='cal' ? 'block' : 'none';
  if(type==='cal') renderCal();
}

function changeMonth(d){
  calMonth = Math.max(0,Math.min(11,calMonth+d));
  renderCal();
}

function renderCal(){
  const label = document.getElementById('calMonthLabel');
  label.textContent = fullMonths[calMonth].toUpperCase()+' 2026';
  const grid = document.getElementById('calGridWrap');
  const days = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
  // first day of month (2026)
  const firstDay = new Date(2026, calMonth, 1).getDay(); // 0=Sun
  const adjusted = (firstDay + 6) % 7; // Mon=0
  const daysInMonth = new Date(2026, calMonth+1, 0).getDate();
  const matchDays = allMatches.filter(m=>{
    // map month by index
    const mMonthMap = {4:4,4:4};
    return true; // show all for demo, highlight by day
  }).map(m=>({day:m.day, label:`${m.home.name} vs ${m.away.name}`}));

  let html = days.map(d=>`<div class="cal-head">${d}</div>`).join('');
  for(let i=0;i<adjusted;i++) html += '<div class="cal-day"></div>';
  for(let d=1;d<=daysInMonth;d++){
    const matchesOnDay = calMonth===4 ? allMatches.filter(m=>m.day===d && m.day<=31) 
                        : calMonth===5 ? allMatches.filter(m=>m.day===d && [8,14].includes(m.day))
                        : [];
    const hasMatch = matchesOnDay.length > 0;
    html += `<div class="cal-day cur-month ${hasMatch?'has-match':''}" ${hasMatch?`onclick="showCalMatch(${matchesOnDay[0].id})"`:''}>
      <div class="cal-day-num">${d}</div>
      ${hasMatch?'<div class="cal-match-dot"></div>':''}
    </div>`;
  }
  grid.innerHTML = html;
}

function showCalMatch(id){
  const m = allMatches.find(x=>x.id===id);
  if(!m) return;
  document.getElementById('calMatchDetail').innerHTML = `
    <div class="match-row" style="border-color:var(--red)">
      <div class="match-row-top">
        <span class="comp-tag">${m.comp}</span>
        <span class="match-date-tag">${m.date}</span>
        <span class="match-time-tag">${m.time}</span>
      </div>
      <div class="match-row-teams">
        <div class="mr-team">
          <div class="mr-badge" style="background:${m.home.bg};color:${m.home.color}">${m.home.emoji}</div>
          <div><div class="mr-name">${m.home.name}</div><div class="mr-city">${m.home.city}</div></div>
        </div>
        <div class="mr-vs"><div class="mr-vs-text">VS</div><div class="mr-venue">${m.venue}</div></div>
        <div class="mr-team r">
          <div class="mr-badge" style="background:${m.away.bg};color:${m.away.color}">${m.away.emoji}</div>
          <div style="text-align:right"><div class="mr-name">${m.away.name}</div><div class="mr-city">${m.away.city}</div></div>
        </div>
      </div>
      <div class="match-row-bottom">
        <div><div class="mr-price-from">À partir de</div><div class="mr-price">${m.minPrice} <span>DH</span></div></div>
        ${getAvailBadge(m.totalAvail)}
        <button class="btn-buy" onclick="window.location='ticketwydad.html'">Acheter →</button>
      </div>
    </div>`;
}

/* ══ TAB SWITCHING ══ */
function switchTab(tab){
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.ptab').forEach(t=>t.classList.remove('active'));
  document.getElementById('tab-'+tab).classList.add('active');
  document.querySelectorAll('.ptab').forEach(t=>{
    if(t.textContent.toLowerCase().includes(
      tab==='stades'?'stades':tab==='matches'?'match':'abonn'
    )) t.classList.add('active');
  });
  const bc = document.getElementById('breadcrumb-cur');
  if(bc) bc.textContent = tab==='stades'?'Stades':tab==='matches'?'Matchs':'Abonnements';
  // init matches list
  if(tab==='matches') renderAllMatches(currentFilter);
  if(tab==='matches' && calView==='cal') renderCal();
}

/* ══ FAQ ══ */
function toggleFaq(el){
  const item = el.parentElement;
  item.classList.toggle('open');
}

/* ══ INIT ══ */
renderAllMatches('all');