/* Mod Kelas (Story Mode). Loaded before world.js; only does anything when sk_mode = 'story'.
   Hooks used by world.js: storyBoot() after loading, storyDoor(door) on E at a door, storyTick(dt,t) every frame.
   The analog clock is the timer: 1 real second = 1/4 clock minute (CFG.RATE).
   Tweak the numbers in CFG. The Kantin is a real room page (kantin.html, Round 7); the other rooms still use the placeholder card in enterRoom(). */
(function(){
const MODE=LS.get('sk_mode','roam')=='story'?'story':'roam';
if(MODE=='story'){const l=$('mdl');if(l)l.textContent='SCHOOL RUSH · Mod Kelas'}
const CFG={DAY:6,
  BELL:[450,510,570,600,660,720],  /* class bells: 7:30 8:30 9:30(Rehat, Kantin) 10:00 11:00 12:00 (clock minutes) */
  BALIK:780,ENDWALK:6,             /* balik bell 1:00 pm; real seconds of free walking after class 6 before it rings */
  RATE:.25,SEC:30,                 /* 1 real second = 1/4 clock-minute; 30 real seconds to reach class */
  FIRST:[6,10],BREAK:[6,12],       /* real seconds of free time before a bell */
  NEAR:.3,NEARMIN:8,ONTIME:100,BONUS:2,LATE:30,CAUGHT:20,PSPD:4,PDELAY:2,CATCH:.85};
const LAB=['Sains','Bahasa Melayu','Matematik','English','Pendidikan Jasmani','Waktu Rehat']; /* index = DR index; 5 = Kantin */
let st='off',order=[],n=0,cls=-1,tleft=0,ttot=0,score=0,ok=0,lt=0,navOn=false,ph=null,bd=null,bt=0,clk=0,ringT=0,ew=0,bd2=0,gr={}; /* gr = today's grades by class index, filled when a real room is finished (Round 7: Kantin) */
const shuf=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const fmt=s=>{s=Math.max(0,Math.ceil(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const bellAt=i=>CFG.BELL[i];
const hm=m=>{const h=Math.floor(m/60),mi=Math.floor(m%60);return (h%12||12)+':'+String(mi).padStart(2,'0')+(h<12?' PG':h<15?' TH':' PTG')};
const room=()=>$('room');
/* day plan: Kantin (Waktu Rehat) always slot 3 (9:30); Padang Balapan (PJ) slot 1 or 2 only; others random */
function plan(){const pj=Math.random()<.5?0:1,rest=shuf([0,1,2,3]);let r=0;const o=[];for(let s=0;s<6;s++)o.push(s==2?5:s==pj?4:rest[r++]);return o}
window.storyPlan=plan;
function drawClock(){const c=$('ck');if(!c||c.hidden)return;const g=c.getContext('2d'),W=200,C=100;g.clearRect(0,0,W,W);
 g.beginPath();g.arc(C,C,94,0,7);g.fillStyle='#fffdf5';g.fill();g.lineWidth=8;g.strokeStyle='#1c2f6b';g.stroke();
 if((st=='class'||st=='late')&&ttot>0){const f=st=='late'?0:Math.max(0,tleft/ttot);if(f>0){g.beginPath();g.arc(C,C,82,-Math.PI/2,-Math.PI/2+f*Math.PI*2);g.lineWidth=9;g.strokeStyle=navOn?'#e24b4b':'#ffd23f';g.stroke()}}
 g.strokeStyle='#1c2f6b';g.lineCap='round';for(let i=0;i<12;i++){const a=i*Math.PI/6,l=i%3?6:11;g.lineWidth=i%3?2:3;g.beginPath();g.moveTo(C+Math.sin(a)*(70-l),C-Math.cos(a)*(70-l));g.lineTo(C+Math.sin(a)*70,C-Math.cos(a)*70);g.stroke()}
 g.fillStyle='#1c2f6b';g.font='bold 30px sans-serif';g.textAlign='center';g.textBaseline='middle';[[12,0],[3,90],[6,180],[9,270]].forEach(p=>{const a=p[1]*Math.PI/180;g.fillText(p[0],C+Math.sin(a)*50,C-Math.cos(a)*50)});
 const hand=(ang,len,w,col)=>{g.beginPath();g.moveTo(C,C);g.lineTo(C+Math.sin(ang)*len,C-Math.cos(ang)*len);g.lineWidth=w;g.strokeStyle=col;g.stroke()};
 hand(((clk/60)%12)*Math.PI/6,36,12,'#1c2f6b');hand((clk%60)*Math.PI/30,56,8,'#2f6fd0');g.beginPath();g.arc(C,C,6,0,7);g.fillStyle='#e24b4b';g.fill()}
function pills(){const a=$('stm'),b=$('scr'),bl=$('bl');a.hidden=b.hidden=false;b.textContent=(st=='free'?'Jalan-jalan':hm(clk))+' · Skor '+score;a.className='hp';
 if(st=='idle')a.textContent='Tunggu loceng...';
 else if(st=='class'){a.textContent=LAB[cls]+' · '+fmt(tleft);if(navOn)a.className='hp near'}
 else if(st=='late'){a.textContent='LEWAT! '+LAB[cls];a.className='hp late'}
 else if(st=='endwalk')a.textContent='Hampir waktu balik...';
 else if(st=='balik')a.textContent='Loceng balik!';
 else a.hidden=true;
 bl.className=st=='late'?'late':ringT>0?'ring':st=='class'?'on':''}
function setNav(on){if(on&&!navOn){navOn=true;tgt=cls;flood()}else if(!on&&navOn){navOn=false;tgt=-1;dist=null}}
function sched(first){st='idle';setNav(false);hidePref();clk=bellAt(n)-rnd.apply(null,first?CFG.FIRST:CFG.BREAK)*CFG.RATE;ringT=0;pills()}
function ring(){cls=order[n];clk=bellAt(n);ttot=tleft=CFG.SEC;st='class';ringT=2.6;
 bellSound(2.4);try{navigator.vibrate&&navigator.vibrate([250,120,250])}catch(e){}
 toast(cls==5?'Ringg!!! Waktu Rehat! Jom ke Kantin.':'Ringg!!! Kelas '+LAB[cls]+' di '+DR[cls][6]+'. Cepat!',3800);pills()}
function late(){st='late';setNav(true);score=Math.max(0,score-CFG.LATE);bellSound(.9);toast('Lewat! Pengawas datang!',3000);say('Alamak, lewat!');spawnPref();pills()}
/* ---- prefect chase ---- */
function spawnPref(){if(!ph){const m=npc('pengawas');sc.add(m);ph={m,x:0,z:0,f:0,mv:0,d:0}}
 const ks=Object.keys(ND).filter(k=>k!='TL'&&k!='BR'&&Math.hypot(X(ND[k][0])-P.x,Z(ND[k][1])-P.z)>=12);const k=R(ks.length?ks:['TS','BS']);
 ph.x=X(ND[k][0]);ph.z=Z(ND[k][1]);ph.d=CFG.PDELAY;ph.m.visible=true;bt=0}
function hidePref(){if(ph)ph.m.visible=false}
function bfs(){if(!bd)bd=new Int16Array(GW*GH);bd.fill(-1);let[ci,cj]=cell(P.x,P.z);ci=Math.max(0,Math.min(GW-1,ci));cj=Math.max(0,Math.min(GH-1,cj));let s=ci+cj*GW;
 if(bk[s]){let f=false;for(const[a,b]of N8){const i=ci+a,j=cj+b;if(i>=0&&j>=0&&i<GW&&j<GH&&!bk[i+j*GW]){s=i+j*GW;f=true;break}}if(!f)return}
 bd[s]=0;const q=[s];for(let h=0;h<q.length;h++){const c=q[h],i=c%GW,j=c/GW|0;for(let k=0;k<4;k++){const a=i+N8[k][0],b=j+N8[k][1];if(a<0||b<0||a>=GW||b>=GH)continue;const m=b*GW+a;if(bd[m]<0&&!bk[m]){bd[m]=bd[c]+1;q.push(m)}}}}
function chase(dt,t){if(!ph||!ph.m.visible)return;if(ph.d>0){ph.d-=dt;ph.mv=0;ph.m.position.set(ph.x,0,ph.z);anim(ph.m,t,0);return}
 bt-=dt;if(bt<=0){bt=.3;bfs()}
 let tx=P.x,tz=P.z;const[pi,pj]=cell(ph.x,ph.z),c=pi+pj*GW;
 if(pi>=0&&pj>=0&&pi<GW&&pj<GH&&bd&&bd[c]>0){let best=c,bi=pi,bj=pj;for(const[a,b]of N8){const i=pi+a,j=pj+b;if(i<0||j<0||i>=GW||j>=GH)continue;const m=i+j*GW;if(bd[m]<0||bd[m]>=bd[best])continue;
  if(a&&b&&(bk[(pi+a)+pj*GW]||bk[pi+(pj+b)*GW]))continue;best=m;bi=i;bj=j}
  if(best!=c){tx=GX+(bi+.5)*GC;tz=GZ+(bj+.5)*GC}}
 const dx=tx-ph.x,dz=tz-ph.z,l=Math.hypot(dx,dz);if(l>.01){ph.x+=dx/l*CFG.PSPD*dt;ph.z+=dz/l*CFG.PSPD*dt;ph.f=la(ph.f,Math.atan2(dx,dz),Math.min(1,dt*10));ph.mv=1}
 ph.m.position.set(ph.x,0,ph.z);ph.m.rotation.y=ph.f;anim(ph.m,t,ph.mv);
 if(Math.hypot(ph.x-P.x,ph.z-P.z)<CFG.CATCH){say('Kena tangkap! Jom ke kelas!');toast('Pengawas hantar kamu ke kelas.',2800);score=Math.max(0,score-CFG.CAUGHT);enterRoom(cls,true)}}
/* ---- rooms (placeholder for now) ---- */
function card(h,lines,btns){const r=room();r.innerHTML='';const a=document.createElement('h2');a.textContent=h;r.appendChild(a);
 lines.forEach(l=>{const p=document.createElement('p');p.textContent=l[0];if(l[1])p.className='rs2';r.appendChild(p)});
 const k=document.createElement('div');k.className='rk';btns.forEach(b=>{const e=document.createElement('button');e.textContent=b[0];e.onclick=b[1];k.appendChild(e)});r.appendChild(k);
 r.style.display='flex';document.body.classList.add('mn');halt=true}
function closeCard(){room().style.display='none'}
function enterRoom(i,caught){const lateNow=caught||st=='late';let g;
 if(lateNow){lt++;g=caught?'Lewat dan kena hantar pengawas.':'Lewat! Cikgu jeling kamu.'}else{const b=CFG.ONTIME+Math.floor(tleft)*CFG.BONUS;score+=b;ok++;g=(i==5?'Sempat rehat! +':'Tepat masa! +')+b+' mata.';}
 st='room';ringT=0;setNav(false);hidePref();pills();
 if(i==5){SS.set('sk_day',{order,n,score,ok,lt,gr,g});SS.set('sk_go',1);loading(()=>nav('kantin'));return} /* Round 7: Kantin is a real room page; the day is kept for this session only */
 loading(()=>{ /* TODO later rounds: Padang Balapan and the classrooms go to their own pages like the Kantin */
  card(i==5?'Kantin belum siap':'Bilik belum siap',[[i==5?'Waktu Rehat · Kantin':LAB[i]+' · '+DR[i][6]],[g,1],[i==5?'Mini game kantin akan datang. Sabar ya!':'Cikgu belum sampai lagi. Sabar ya!']],[['Keluar',()=>{closeCard();leave(i)}]])})}
function place(i){const d=DR[i];P.x=d[7];P.z=d[8];P.y=0;P.vy=0;P.stun=0;P.slow=0;P.f=Math.atan2(d[4],d[5]);cp.x=P.x;cp.z=P.z;cy=P.f+Math.PI;hold=0}
function after(i,msg){place(i);document.body.classList.remove('mn');halt=false;if(n>=CFG.DAY)endWalk();else{sched(false);toast(msg||'Masa berlalu... loceng akan berbunyi lagi.',2800)}}
function leave(i){n++;loading(()=>after(i))}
/* after class 6: a few seconds of free walking, then the balik bell (long, no timer, no prefect), then the end card */
function endWalk(){st='endwalk';ew=CFG.ENDWALK;clk=CFG.BALIK-ew*CFG.RATE;setNav(false);hidePref();ringT=0;pills();toast('Kelas dah habis. Jalan-jalan sekejap...',3000)}
function ringBalik(){st='balik';bd2=4.6;clk=CFG.BALIK;ringT=4.6;bellSound(5);try{navigator.vibrate&&navigator.vibrate([400,150,400,150,400])}catch(e){}toast('Ringg!!! Loceng balik! Tak perlu berlari, jalan perlahan ya.',4200);pills()}
function endDay(){st='done';clk=CFG.BALIK;$('stm').hidden=true;$('bl').className='';ringT=0;drawClock();if(score>(cur.sb||0)){cur.sb=score;save()}
 card('Sekolah tamat!',[['Jam 1:00 tengah hari. Loceng balik dah berbunyi!'],['Skor: '+score,1],['Tepat masa: '+ok+' · Lewat: '+lt],['Skor terbaik: '+(cur.sb||0)]],[['Main lagi',()=>location.reload()],['Sambung jalan-jalan',freeRoam],['Halaman utama',()=>nav('index')]]);
 room().insertBefore(report(),room().querySelector('.rk'))}
/* Round 7: Kad Laporan on the end card. Classes with no real room yet show a dash */
function report(){const f=document.createElement('div'),w=document.createElement('div'),o=document.createElement('p');let sum=0,c=0;w.className='rc';
 order.forEach(k=>{const x=gr[k],d=document.createElement('div'),g=x?x.g:'—';d.className='gr1';d.innerHTML='<span></span><b></b>';d.children[0].textContent=LAB[k];d.children[1].textContent=g;d.children[1].className=gcls(g);if(x){sum+=x.s;c++}w.appendChild(d)});
 o.className='rs2';o.textContent='Kad Laporan'+(c?' · Gred hari ini: '+gradeOf(sum/c):'');f.appendChild(o);f.appendChild(w);return f}
/* free roaming after Sekolah tamat: still Mod Kelas, but no bells, timer, clock or prefect. Score and best score stay as saved */
function freeRoam(){closeCard();document.body.classList.remove('mn');st='free';ringT=0;setNav(false);hidePref();$('ck').hidden=true;$('bl').hidden=true;$('stm').hidden=true;halt=false;pills();toast('Sekolah dah tamat. Jalan-jalan sepuasnya!',3200)}
/* ---- hooks ---- */
window.storyBoot=function(){const day=SS.get('sk_day'),ret=SS.get('sk_ret');SS.del('sk_ret');
 if(MODE!='story'){if(ret&&ret.roam)place(5);halt=false;return} /* Mod Jalan-jalan: back from the Kantin, stand at its door */
 if(day&&ret&&!ret.roam&&Array.isArray(day.order)){ /* back from the Kantin: carry on the same day */
  SS.del('sk_day');order=day.order;n=day.n+1;score=day.score;ok=day.ok;lt=day.lt;gr=day.gr||{};if(ret.grade)gr[5]={g:ret.grade,s:ret.score};st='off';
  $('scr').hidden=false;$('ck').hidden=false;$('bl').hidden=false;$('stm').hidden=true;
  after(5,(day.g?day.g+' ':'')+(ret.grade?'Gred Kantin: '+ret.grade+'. ':'')+'Masa berlalu... loceng akan berbunyi lagi.');return}
 SS.del('sk_day');
 order=plan();n=0;score=ok=lt=0;st='off';$('scr').hidden=false;$('ck').hidden=false;$('bl').hidden=false;clk=bellAt(0)-2;pills();$('stm').hidden=true;drawClock();
 card('Hari sekolah bermula!',[['Lihat jam dan loceng. Loceng berbunyi dahulu.'],['Sampai ke kelas dalam 30 saat.'],['Pukul 9:30 ialah Waktu Rehat di Kantin.'],['Lewat? Pengawas akan kejar kamu!']],[['Jom!',()=>{closeCard();document.body.classList.remove('mn');halt=false;sched(true)}]])};
window.storyDoor=function(d){const i=DR.indexOf(d);
 if(MODE!='story'){if(i==5){SS.set('sk_go',1);loading(()=>nav('kantin'));return true}return false} /* Mod Jalan-jalan: only the Kantin is a real room so far */
 if(st=='class'||st=='late'){if(i==cls)enterRoom(i,false);else say(cls==5?'Bukan sini! Pergi ke Kantin.':'Bukan kelas ini! Cari '+LAB[cls]+'.');return true}
 if(st=='free'){say('Sekolah dah tamat. Bilik dikunci.');return true}
 if(st=='endwalk'||st=='balik'||st=='done'){say('Kelas dah habis. Jom balik!');return true}
 say('Loceng belum berbunyi lagi.');return true};
window.storyTick=function(dt,t){if(MODE!='story'||halt)return;
 if(ringT>0){ringT-=dt;if(ringT<=0)ringT=0}
 if(st=='idle'){clk+=dt*CFG.RATE;if(clk>=bellAt(n))ring();else pills()}
 else if(st=='class'){tleft-=dt;clk=bellAt(n)+(ttot-Math.max(0,tleft))*CFG.RATE;if(tleft<=Math.max(CFG.NEARMIN,ttot*CFG.NEAR))setNav(true);if(tleft<=0)late();else pills()}
 else if(st=='late'){clk+=dt*CFG.RATE;chase(dt,t);pills()}
 else if(st=='endwalk'){ew-=dt;clk=CFG.BALIK-Math.max(0,ew)*CFG.RATE;if(ew<=0)ringBalik();else pills()}
 else if(st=='balik'){bd2-=dt;if(bd2<=0)endDay();else pills()}
 drawClock()};
if(MODE=='story'){const r=document.createElement('div');r.id='room';document.body.appendChild(r)}
})();
