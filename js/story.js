/* Mod Kelas (Story Mode). Loaded before world.js; only does anything when sk_mode = 'story'.
   Hooks used by world.js: storyBoot() after loading, storyDoor(door) on E at a door, storyTick(dt,t) every frame.
   Tweak the numbers in CFG. Replace enterRoom()'s placeholder with a real room page in a later round. */
(function(){
const MODE=LS.get('sk_mode','roam')=='story'?'story':'roam';
if(MODE=='story'){const l=$('mdl');if(l)l.textContent='SCHOOL RUSH · Mod Kelas'}
const CFG={DAY:6,FIRST:[7,12],BREAK:[9,18],TK:2.2,TBASE:10,TMIN:25,TMAX:75,NEAR:.3,NEARMIN:8,
  ONTIME:100,BONUS:2,LATE:30,CAUGHT:20,PSPD:4,PDELAY:2,CATCH:.85};
const SUBJ=['Sains','Bahasa Melayu','Matematik','English','Pendidikan Jasmani','Pendidikan Kesihatan']; /* index = DR index */
let st='off',order=[],n=0,cls=-1,tleft=0,ttot=0,wait=0,score=0,ok=0,lt=0,navOn=false,ph=null,bd=null,bt=0,wasLate=false;
const shuf=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const fmt=s=>{s=Math.max(0,Math.ceil(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const room=()=>$('room');
function pills(){const a=$('stm'),b=$('scr');a.hidden=b.hidden=false;b.textContent='Skor '+score;a.className='hp';
 if(st=='idle')a.textContent='Tunggu loceng...';
 else if(st=='class'){a.textContent=SUBJ[cls]+' · '+fmt(tleft);if(navOn)a.className='hp near'}
 else if(st=='late'){a.textContent='LEWAT! '+SUBJ[cls];a.className='hp late'}
 else a.hidden=true}
function setNav(on){if(on&&!navOn){navOn=true;tgt=cls;flood()}else if(!on&&navOn){navOn=false;tgt=-1;dist=null}}
function sched(first){st='idle';setNav(false);hidePref();wait=rnd.apply(null,first?CFG.FIRST:CFG.BREAK);pills()}
function ring(){cls=order[n];tgt=cls;flood();const len=path(2000).length*GC;tgt=-1;dist=null;navOn=false;
 ttot=tleft=Math.round(Math.min(CFG.TMAX,Math.max(CFG.TMIN,len/5*CFG.TK+CFG.TBASE)));wasLate=false;st='class';
 bellSound(2.4);toast('Ringg!!! Kelas '+SUBJ[cls]+' di '+DR[cls][6]+'. Cepat!',3800);pills()}
function late(){st='late';wasLate=true;setNav(true);score=Math.max(0,score-CFG.LATE);bellSound(.9);toast('Lewat! Pengawas datang!',3000);say('Alamak, lewat!');spawnPref();pills()}
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
 if(lateNow){lt++;g=caught?'Lewat dan kena hantar pengawas.':'Lewat! Cikgu jeling kamu.'}else{const b=CFG.ONTIME+Math.floor(tleft)*CFG.BONUS;score+=b;ok++;g='Tepat masa! +'+b+' mata.'}
 st='room';setNav(false);hidePref();pills();
 loading(()=>{ /* TODO later round: location.href = room page instead of this placeholder */
  card('Bilik belum siap',[[SUBJ[i]+' · '+DR[i][6]],[g,1],['Cikgu belum sampai lagi. Sabar ya!']],[['Keluar bilik',()=>{closeCard();leave(i)}]])})}
function leave(i){n++;if(n>=CFG.DAY){loading(()=>endDay());return}
 loading(()=>{const d=DR[i];P.x=d[7];P.z=d[8];P.y=0;P.vy=0;P.stun=0;P.slow=0;P.f=Math.atan2(d[4],d[5]);cp.x=P.x;cp.z=P.z;cy=P.f+Math.PI;hold=0;
  document.body.classList.remove('mn');halt=false;sched(false);toast('Rehat sekejap... loceng akan berbunyi lagi.',2800)})}
function endDay(){st='off';$('stm').hidden=true;bellSound(2.6);if(score>(cur.sb||0)){cur.sb=score;save()}
 card('Sekolah tamat!',[['Loceng balik berbunyi!'],['Skor: '+score,1],['Tepat masa: '+ok+' · Lewat: '+lt],['Skor terbaik: '+(cur.sb||0)]],[['Main lagi',()=>location.reload()],['Halaman utama',()=>nav('index')]])}
/* ---- hooks ---- */
window.storyBoot=function(){if(MODE!='story'){halt=false;return}
 order=shuf([0,1,2,3,4,5]).slice(0,CFG.DAY);n=0;score=ok=lt=0;st='off';$('scr').hidden=false;$('scr').textContent='Skor 0';
 card('Hari sekolah bermula!',[['Loceng akan berbunyi bila-bila masa.'],['Cari kelas yang betul sebelum masa tamat.'],['Lewat? Pengawas akan kejar kamu!']],[['Jom!',()=>{closeCard();document.body.classList.remove('mn');halt=false;sched(true)}]])};
window.storyDoor=function(d){if(MODE!='story')return false;const i=DR.indexOf(d);
 if(st=='class'||st=='late'){if(i==cls)enterRoom(i,false);else say('Bukan kelas ini! Cari '+SUBJ[cls]+'.');return true}
 say('Loceng belum berbunyi lagi.');return true};
window.storyTick=function(dt,t){if(MODE!='story'||halt)return;
 if(st=='idle'){wait-=dt;if(wait<=0)ring();pills()}
 else if(st=='class'){tleft-=dt;if(tleft<=Math.max(CFG.NEARMIN,ttot*CFG.NEAR))setNav(true);if(tleft<=0)late();else pills()}
 else if(st=='late'){chase(dt,t)}};
if(MODE=='story'){const r=document.createElement('div');r.id='room';document.body.appendChild(r)}
})();
