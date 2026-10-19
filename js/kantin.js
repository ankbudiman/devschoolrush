/* Kantin room (Round 7). A red room with 5 stalls, all open at once. Each stall opens one mini game (js/kantin-games.js).
   Rule: every stall must be finished before the exit door works. Mod Kelas: the result is saved as the Kantin grade and carried
   back to world.html. Mod Jalan-jalan: casual revision, nothing is graded or saved. The player can only get here from world.html
   (sk_go token), so a killed or reloaded app goes back to the start screen and the day restarts. */
const OKGO=!!SS.get('sk_go');SS.del('sk_go');
const STORY=LS.get('sk_mode','roam')=='story';
const ren=new T.WebGLRenderer({canvas:$('cv'),antialias:true}),cv=$('cv');ren.shadowMap.enabled=true;ren.setPixelRatio(Math.min(devicePixelRatio,2));
const sc=new T.Scene();sc.background=new T.Color('#bfe3f5');const cam=new T.PerspectiveCamera(55,1,.5,150);
sc.add(new T.HemisphereLight(0xffffff,0x9aa7b8,.95));
const dl=new T.DirectionalLight(0xffffff,.55);dl.castShadow=true;dl.shadow.mapSize.set(1024,1024);Object.assign(dl.shadow.camera,{left:-14,right:14,top:14,bottom:-14,near:1,far:50});sc.add(dl,dl.target);
/* ---- room ---- */
const RX=19.5,RZ0=-15,RZ1=11,WH=3.4,WALL='#d9604a',cols=[],MZ=(RZ0+RZ1)/2;
const hit=(x,z,r)=>cols.some(c=>x+r>c.x0&&x-r<c.x1&&z+r>c.z0&&z-r<c.z1);
const gm=new T.Mesh(new T.PlaneGeometry(300,300),mat('#8fc27a'));gm.rotation.x=-Math.PI/2;gm.position.y=-.02;gm.receiveShadow=true;sc.add(gm);
(()=>{const w=2*RX,d=RZ1-RZ0,c=document.createElement('canvas');c.width=c.height=2;const g=c.getContext('2d');g.fillStyle='#c4c7cc';g.fillRect(0,0,2,2);g.fillStyle='#aeb2b8';g.fillRect(0,0,1,1);g.fillRect(1,1,1,1);
 const t=new T.CanvasTexture(c);t.magFilter=T.NearestFilter;t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(w/3,d/3);
 const m=new T.Mesh(new T.PlaneGeometry(w,d),new T.MeshPhongMaterial({map:t,shininess:0,specular:0}));m.rotation.x=-Math.PI/2;m.position.set(0,.01,MZ);m.receiveShadow=true;sc.add(m)})();
bx(sc,2*RX+2,WH,1,WALL,0,WH/2,RZ0-.5);cols.push({x0:-RX-1,x1:RX+1,z0:RZ0-1,z1:RZ0});
[-1,1].forEach(s=>{bx(sc,1,WH,RZ1-RZ0+2,WALL,s*(RX+.5),WH/2,MZ);cols.push({x0:s>0?RX:-RX-1,x1:s>0?RX+1:-RX,z0:RZ0-1,z1:RZ1+1.2});
 bx(sc,.12,.9,RZ1-RZ0,'#b84a38',s*(RX-.06),.45,MZ)});
bx(sc,2*RX,.9,.12,'#b84a38',0,.45,RZ0+.06);
const DW=1.7;[-1,1].forEach(s=>{const a=DW,b=RX+1,w=b-a;bx(sc,w,WH,1,WALL,s*(a+w/2),WH/2,RZ1+.5);cols.push({x0:s>0?a:-b,x1:s>0?b:-a,z0:RZ1,z1:RZ1+1.2})});
bx(sc,2*DW,WH-2.5,1,WALL,0,2.5+(WH-2.5)/2,RZ1+.5);
function pn(w,h,c,x,y,z,ry){const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({color:c}));m.position.set(x,y,z);m.rotation.y=ry;sc.add(m);return m}
function sign(L,bg,fg,w,h,fs,x,y,z,r){const c=document.createElement('canvas');c.width=256;c.height=Math.round(256*h/w);const g=c.getContext('2d');g.fillStyle=bg;g.fillRect(0,0,256,c.height);g.fillStyle=fg;g.font='bold '+fs+'px Fredoka,sans-serif';g.textAlign='center';g.textBaseline='middle';L.forEach((s,i)=>g.fillText(s,128,c.height*(i+.5)/L.length));
 const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:new T.CanvasTexture(c)}));m.position.set(x,y,z);m.rotation.y=r;sc.add(m);return m}
sign(['PINTU KELUAR'],'#1c2f6b','#ffffff',2.6,.6,30,0,3.05,RZ1-.03,Math.PI);
sign(['KANTIN SEKOLAH'],'#fff3d6','#b84a38',5,.9,30,0,2.5,RZ0+.14,0);
(()=>{const ex=pn(2*DW-.2,2.5,'#f5f5f5',0,1.25,RZ1+.1,Math.PI);ex.position.y=1.25;[-1,1].forEach(s=>pn(.1,2.5,'#7a5236',s*(DW-.05),1.25,RZ1-.02,Math.PI))})();
function plant(x,z){const p=new T.Mesh(new T.CylinderGeometry(.28,.2,.45,6),mat('#c0693f')),f=new T.Mesh(new T.IcosahedronGeometry(.42,0),mat('#3f9d54'));p.position.set(x,.225,z);f.position.set(x,.85,z);p.castShadow=f.castShadow=true;sc.add(p,f);cols.push({x0:x-.32,x1:x+.32,z0:z-.32,z1:z+.32})}
plant(-18.3,9.8);plant(18.3,9.8);
/* tables with benches and a few students sitting */
function table(x,z,sit){bx(sc,4.6,.1,1.8,'#c8a26a',x,.9,z);[-1,1].forEach(a=>[-1,1].forEach(b=>bx(sc,.12,.85,.12,'#5a5f69',x+a*2,.42,z+b*.7)));
 [-1,1].forEach(s=>{bx(sc,4.6,.08,.5,'#a9744a',x,.46,z+s*1.5);[-1,1].forEach(a=>bx(sc,.12,.42,.12,'#5a5f69',x+a*2,.21,z+s*1.5))});
 cols.push({x0:x-2.4,x1:x+2.4,z0:z-2.1,z1:z+2.1});
 (sit||[]).forEach(a=>{const m=npc('murid');m.position.set(x+a[0],.04,z+a[1]*1.5);m.rotation.y=a[1]>0?Math.PI:0;m.userData.legs.forEach(l=>l.rotation.x=-Math.PI/2);sc.add(m)})}
table(-6.5,.5,[[-1,1],[1,1]]);table(6.5,.5,[[0,-1]]);
/* ---- stalls ---- */
const RES=[null,null,null,null,null],ST=[],SG=[],MK=[],SP=.78,POS=[[-17.7,-1.5,Math.PI/2],[-17.7,-9.5,Math.PI/2],[0,-13.2,0],[17.7,-9.5,-Math.PI/2],[17.7,-1.5,-Math.PI/2]];
function msh(p,geo,c,x,y,z){const m=new T.Mesh(geo,mat(c));m.position.set(x,y,z);m.castShadow=true;p.add(m);return m}
function food(g,i,col){
 if(i==0){[['#f4c542',2.2,.5],['#5ccf4a',1.5,.5],['#b266ff',.8,.5]].forEach((a,k)=>bx(g,a[1],a[2],.9,a[0],0,1.8+.25+k*.5,0))}
 else if(i==1){msh(g,new T.CylinderGeometry(.7,.7,.08,14),'#ffffff',0,1.58,0);[['#f4c542',-.3,.1],['#ff8c6b',.3,.1],['#7ed957',-.25,-.3],['#ff6b81',.3,-.25]].forEach(a=>bx(g,.3,.2,.3,a[0],a[1],1.72,a[2]))}
 else if(i==2){msh(g,new T.CylinderGeometry(.9,.6,.4,10),'#c0693f',0,1.7,0);[['#e24b4b',-.3,0],['#ffd23f',.25,.15],['#ff9a3c',.05,-.3]].forEach(a=>msh(g,new T.IcosahedronGeometry(.28,0),a[0],a[1],2,a[2]))}
 else if(i==3){[[-1.8,'#4aa3ff'],[-.6,'#ff6b81'],[.6,'#f4c542'],[1.8,'#7ed957']].forEach(a=>{msh(g,new T.CylinderGeometry(.25,.2,.6,8),a[1],1.8,0).position.x=a[0];bx(g,.05,.5,.05,'#ffffff',a[0]+.1,2.3,0)})}
 else{[[-1.6,'#7ed957'],[-.7,'#4aa3ff']].forEach(a=>msh(g,new T.CylinderGeometry(.2,.22,.7,8),a[1],1.85,0).position.x=a[0]);bx(g,.8,.14,.6,'#ffffff',1,1.6,0);bx(g,.8,.14,.6,'#ffffff',1,1.74,0)}}
function mkSeller(i){const f=i%2==0,c=KD.stalls[i].c,o={skin:R(SK),hc:R(HC),h:1.3,w:1.05,mouth:0,es:1,bw:4};
 if(f){o.o={top:'#f6f7fb',bot:'#f6f7fb',long:1,shoe:'#2a2a30',ls:1,ap:c};o.tud=R(['#f6f7fb','#e8d6c0',c])}else{o.o={top:'#f4f6fa',bot:'#222633',shoe:'#1a1a1e',ls:1,ap:c};o.hs='short';o.stache=Math.random()<.5}
 const G=build(o);G.userData.g=f?'f':'m';return G}
function drawSign(i){const s=SG[i],g=s.cv.getContext('2d'),d=KD.stalls[i],r=RES[i];g.fillStyle=d.c;g.fillRect(0,0,512,128);g.fillStyle='#fff';g.font='bold '+((i+1+'. '+d.n).length>16?44:54)+'px Fredoka,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText((i+1)+'. '+d.n,256,r?44:64);
 if(r){g.font='38px sans-serif';g.fillText('⭐'.repeat(r.stars)+'☆'.repeat(3-r.stars)+'  ✔',256,98)}s.tex.needsUpdate=true}
KD.stalls.forEach((d,i)=>{const p=POS[i],g=new T.Group(),col=d.c,th=p[2];
 bx(g,7,1.4,1.8,'#8a5a3a',0,.7,0);bx(g,7.3,.14,2.1,'#e8d6b0',0,1.47,0);bx(g,6.4,.55,.08,col,0,.7,.92);
 [-3.2,3.2].forEach(x=>bx(g,.18,3.4,.18,'#666666',x,1.7,.95));
 for(let k=0;k<7;k++){const m=bx(g,1,.14,2.8,k%2?'#ffffff':col,k-3,3.45,.4);m.rotation.x=.12}
 bx(g,6.6,2.3,.2,'#6b4a30',0,1.6,-1.95);bx(g,6.4,.1,.6,'#a67c52',0,1.75,-1.65);bx(g,6.4,.1,.6,'#a67c52',0,2.5,-1.65);
 food(g,i,col);
 const sl=mkSeller(i);sl.position.set(0,0,-1.2);g.add(sl);
 const cn=document.createElement('canvas');cn.width=512;cn.height=128;const tex=new T.CanvasTexture(cn),sm=new T.Mesh(new T.PlaneGeometry(5.6,1.4),new T.MeshBasicMaterial({map:tex}));sm.position.set(0,4.55,.5);sm.rotation.x=-.25;g.add(sm);SG.push({cv:cn,tex});
 g.scale.setScalar(SP);g.position.set(p[0],0,p[1]);g.rotation.y=th;sc.add(g);
 const nx=Math.sin(th),nz=Math.cos(th),b=th==0?[p[0]-2.9,p[0]+2.9,p[1]-1.7,p[1]+.78]:th>0?[p[0]-1.7,p[0]+.78,p[1]-2.9,p[1]+2.9]:[p[0]-.78,p[0]+1.7,p[1]-2.9,p[1]+2.9];
 cols.push({x0:b[0],x1:b[1],z0:b[2],z1:b[3]});
 const sb=document.createElement('div');sb.className='sb';document.body.appendChild(sb);
 const mk=new T.Mesh(new T.ConeGeometry(.4,.8,4),new T.MeshBasicMaterial({color:'#ffd23f'}));mk.rotation.x=Math.PI;sc.add(mk);MK.push(mk);
 ST.push({x:p[0],z:p[1],wx:p[0]+nx*1.9,wz:p[1]+nz*1.9,sb,line:null,col});drawSign(i)});
/* exit door marker (shows when every stall is finished) */
const EX={x:0,z:RZ1-1.1},em=new T.Mesh(new T.ConeGeometry(.4,.8,4),new T.MeshBasicMaterial({color:'#5ccf4a'}));em.rotation.x=Math.PI;em.visible=false;sc.add(em);
/* ---- player ---- */
const P={x:0,z:9,y:0,vy:0,f:Math.PI},cp={x:P.x,z:P.z};let gen='m',pm,cy=0,hold=0,curL=null,recorded=false,grade=null;
function mkP(){if(pm)sc.remove(pm);pm=player(gen,'uni',curL);sc.add(pm)}mkP();
const doneN=()=>RES.filter(Boolean).length;
/* ---- input (same controls as world.html) ---- */
const keys={},jv={x:0,z:0};let jmp=0;
addEventListener('keydown',e=>{if(halt)return;keys[e.code]=1;if(e.code=='Space')e.preventDefault();if(e.code=='KeyE')act()});addEventListener('keyup',e=>keys[e.code]=0);
if(matchMedia('(pointer:coarse)').matches)document.body.classList.add('touch');
const jz=$('jz'),jb=$('jb'),jk=$('jk');let jid=null,bx0,by0;
jz.onpointerdown=e=>{jid=e.pointerId;jz.setPointerCapture(jid);bx0=e.clientX;by0=e.clientY;const r=jz.getBoundingClientRect();jb.style.left=(bx0-r.left-50)+'px';jb.style.top=(by0-r.top-50)+'px';jb.style.display='block';jk.style.transform='none'};
jz.onpointermove=e=>{if(e.pointerId!=jid)return;let dx=e.clientX-bx0,dy=e.clientY-by0;const l=Math.hypot(dx,dy);if(l>50){dx*=50/l;dy*=50/l}jk.style.transform=`translate(${dx}px,${dy}px)`;jv.x=dx/50;jv.z=dy/50};
jz.onpointerup=jz.onpointercancel=()=>{jid=null;jb.style.display='none';jv.x=jv.z=0};
$('bj').onpointerdown=()=>jmp=1;$('bj').onpointerup=$('bj').onpointercancel=()=>jmp=0;$('be').onpointerdown=()=>act();$('ex').onclick=()=>pause();
let od=null;cv.onpointerdown=e=>{od=e;cv.setPointerCapture(e.pointerId)};cv.onpointermove=e=>{if(od&&e.pointerId==od.pointerId){cy-=(e.clientX-od.clientX)*.007;od=e;hold=1.5}};cv.onpointerup=cv.onpointercancel=()=>od=null;
function fit(){ren.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}addEventListener('resize',fit);fit();
let bt=0,bm;const bv=new T.Vector3();function say(t){const b=$('bub');b.textContent=t;b.style.display='block';bt=4;clearTimeout(bm);bm=setTimeout(()=>b.style.display='none',2200)}
function nearSt(){let b=-1,bd=2.3;ST.forEach((s,i)=>{const k=Math.hypot(P.x-s.wx,P.z-s.wz);if(k<bd){bd=k;b=i}});return b}
const nearDoor=()=>Math.hypot(P.x-EX.x,P.z-EX.z)<2.3;
/* ---- stalls, games and the way out ---- */
function shut(){KG.close();document.body.classList.remove('mn');halt=false}
function talk(i){const d=KD.stalls[i],r=RES[i];if(r){say('Gerai ini sudah selesai ✔');return}
 halt=true;document.body.classList.add('mn');
 KG.show('<h3>'+d.n+'</h3><p><b>'+d.v+'</b>: Hai! '+d.t+'</p><p class="kh">Siap dalam '+d.lim+' saat tanpa kesilapan untuk bintang penuh ⭐</p><div class="rw"><button onclick="KN.go('+i+')">Mula ▶</button><button class="kx" onclick="KN.shut()">Nanti dulu</button></div>')}
function onRes(i,res){if(!res||res.exit){shut();return}RES[i]=res;drawSign(i);MK[i].visible=false;const n=doneN();$('scr').textContent='Gerai '+n+'/5';
 if(n==5){em.visible=true;summary()}else{shut();toast('Gerai '+KD.stalls[i].n+' siap! '+n+'/5',2400)}}
function summary(){const rs=RES,avg=rs.reduce((a,r)=>a+r.score,0)/5;let g=null;halt=true;document.body.classList.add('mn');
 if(STORY){g=gradeOf(avg);if(!recorded){recorded=true;recRoom('kantin',avg,rs.map(r=>r.score));grade={g,s:Math.round(avg)}}}
 const rows=KD.stalls.map((d,i)=>'<div class="gr1"><span>'+(i+1)+'. '+d.n+'</span><b>'+'⭐'.repeat(rs[i].stars)+'</b></div>').join('');
 KG.show('<h2>Semua gerai selesai!</h2><div class="grg">'+rows+'</div>'+(STORY?'<p>Gred Kantin: <b class="'+gcls(g)+'" style="font-size:1.6em">'+g+'</b> · '+Math.round(avg)+'/100</p>':'<p class="kh">Gred hanya dikira dalam Mod Kelas.</p>')+'<div class="rw"><button onclick="KN.leave()">Keluar kantin ▶</button><button class="kx" onclick="KN.shut()">Kekal di sini</button></div>')}
function leave(){SS.set('sk_ret',STORY&&grade?{grade:grade.g,score:grade.s}:{roam:1});KG.close();loading(()=>nav('world'))}
window.KN={go(i){KG.start(i,cur.level,r=>onRes(i,r))},shut,leave};
function act(){if(halt)return;const i=nearSt();if(i>=0){talk(i);return}
 if(nearDoor()){if(doneN()==5)summary();else{const m=$('msg');m.textContent='Jumpa semua penjual dahulu! ('+doneN()+'/5 gerai siap)';m.style.display='block';clearTimeout(mt);mt=setTimeout(()=>m.style.display='none',2600);say('Belum boleh keluar!')}}}
/* ---- minimap ---- */
const mc=$('mm'),mg=mc.getContext('2d'),mb=document.createElement('canvas');mb.width=mb.height=320;const MS=7.6,mf=(x,z)=>[160+x*MS,160+(z-MZ)*MS];
(()=>{const g=mb.getContext('2d');g.fillStyle='#2b2f38';g.fillRect(0,0,320,320);const a=mf(-RX,RZ0),b=mf(RX,RZ1);g.fillStyle='#c4c7cc';g.fillRect(a[0],a[1],b[0]-a[0],b[1]-a[1]);g.strokeStyle=WALL;g.lineWidth=5;g.strokeRect(a[0],a[1],b[0]-a[0],b[1]-a[1]);
 g.fillStyle='#c4c7cc';const d0=mf(-DW,RZ1),d1=mf(DW,RZ1);g.fillRect(d0[0],d0[1]-4,d1[0]-d0[0],10);
 ST.forEach((s,i)=>{const th=POS[i][2],w=th==0?5.8:3.2,h=th==0?3.2:5.8,p=mf(s.x+(th>0?.45:th<0?-.45:0),s.z+(th==0?-.45:0));g.fillStyle=KD.stalls[i].c;g.fillRect(p[0]-w*MS/2,p[1]-h*MS/2,w*MS,h*MS);g.fillStyle='#fff';g.font='bold 20px Fredoka,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(i+1,p[0],p[1])});
 [[-6.5,.5],[6.5,.5]].forEach(t=>{const p=mf(t[0],t[1]);g.fillStyle='#c8a26a';g.fillRect(p[0]-2.3*MS,p[1]-.9*MS,4.6*MS,1.8*MS)})})();
function drawMM(){mg.drawImage(mb,0,0);ST.forEach((s,i)=>{if(!RES[i])return;const p=mf(s.x+(POS[i][2]>0?.45:POS[i][2]<0?-.45:0),s.z+(POS[i][2]==0?-.45:0));mg.fillStyle='#2e9d4a';mg.beginPath();mg.arc(p[0],p[1],11,0,7);mg.fill();mg.fillStyle='#fff';mg.font='bold 16px sans-serif';mg.textAlign='center';mg.textBaseline='middle';mg.fillText('✓',p[0],p[1]+1)});
 const e=mf(EX.x,RZ1-.2);mg.fillStyle=doneN()==5?'#5ccf4a':'#ffd23f';mg.beginPath();mg.arc(e[0],e[1],8,0,7);mg.fill();
 const a=mf(P.x,P.z),s=Math.sin(P.f),c=Math.cos(P.f);mg.fillStyle='#2f6fd0';mg.strokeStyle='#fff';mg.lineWidth=3;mg.beginPath();mg.moveTo(a[0]+s*14,a[1]+c*14);mg.lineTo(a[0]-s*8+c*8,a[1]-c*8-s*8);mg.lineTo(a[0]-s*8-c*8,a[1]-c*8+s*8);mg.closePath();mg.fill();mg.stroke()}
/* ---- pause, Android back (same behaviour as world.html), graphics ---- */
function pause(){halt=true;$('menu').classList.add('pz');$('menu').style.display='flex';document.body.classList.add('mn');view('vp')}
$('pS').onclick=()=>{$('menu').style.display='none';halt=false;document.body.classList.remove('mn')};$('pH').onclick=()=>{frm='vp';view('vh')};$('pT').onclick=()=>{frm='vp';applySet();view('vt')};$('pQ').onclick=()=>{SS.del('sk_day');SS.del('sk_ret');nav('index')};
(function(){if(SR_IFR)return;let on=0;const E=['pointerdown','keydown','touchend'],arm=()=>{if(on)return;on=1;backKeep();E.forEach(e=>removeEventListener(e,arm,true))};E.forEach(e=>addEventListener(e,arm,true));
addEventListener('popstate',()=>{if(!on||!SR_TRAP)return;backKeep();const ld=$('ld');if(ld&&ld.style.display!='none')return;
if(KG.open()){shut();return} /* back closes a mini game or card first */
const m=$('menu');if(m.style.display=='flex'){const vp=$('vp');if(vp&&!vp.hidden)$('pS').click();else view('vp')}else pause()})})();
window.gfxHook=()=>{ren.shadowMap.enabled=!SET.lo;dl.castShadow=!SET.lo;ren.setPixelRatio(SET.lo?1:Math.min(devicePixelRatio,2));fit();sc.traverse(o=>{if(o.material)o.material.needsUpdate=true})};
/* ---- main loop ---- */
const CM=[6,1.2,.85,.6,.9],HI=KD.hi;let last=0;
function loop(ts){requestAnimationFrame(loop);const dt=Math.min((ts-last)/1000||0,.05),t=ts/1000;last=ts;
 if(halt){keys.KeyW=keys.KeyA=keys.KeyS=keys.KeyD=keys.ArrowUp=keys.ArrowDown=keys.ArrowLeft=keys.ArrowRight=keys.Space=0;jv.x=jv.z=0;jmp=0}
 let ix=(keys.KeyD||keys.ArrowRight?1:0)-(keys.KeyA||keys.ArrowLeft?1:0)+jv.x,iz=(keys.KeyS||keys.ArrowDown?1:0)-(keys.KeyW||keys.ArrowUp?1:0)+jv.z;const l=Math.hypot(ix,iz);if(l>1){ix/=l;iz/=l}
 const mv=l>.12&&!halt;
 if(mv){const s=Math.sin(cy),c=Math.cos(cy),mx=ix*c+iz*s,mz=-ix*s+iz*c,dx=mx*5*dt,dz=mz*5*dt;if(!hit(P.x+dx,P.z,.35))P.x+=dx;if(!hit(P.x,P.z+dz,.35))P.z+=dz;P.f=la(P.f,Math.atan2(mx,mz),Math.min(1,dt*14));if(SET.cf&&hold<=0&&iz<.3)cy=la(cy,Math.atan2(-mx,-mz),Math.min(1,dt*(iz<-.3?2.2:.9)))}hold-=dt;
 if((keys.Space||jmp)&&P.y<=0)P.vy=6.8;P.vy-=22*dt;P.y+=P.vy*dt;if(P.y<=0){P.y=0;P.vy=0}
 pm.position.set(P.x,P.y,P.z);pm.rotation.y=P.f;anim(pm,t,mv&&P.y==0);
 const D=CM[0]*(cam.aspect<1?1.15:1);cp.x+=(P.x-cp.x)*Math.min(1,dt*10);cp.z+=(P.z-cp.z)*Math.min(1,dt*10);const sx=Math.sin(cy),sz=Math.cos(cy);
 /* the camera stays inside the room so walls never hide the player */
 cam.position.set(Math.max(-RX+.8,Math.min(RX-.8,cp.x+sx*D)),CM[1]+D*CM[2],Math.max(RZ0+.8,Math.min(RZ1-.8,cp.z+sz*D)));cam.lookAt(cp.x-sx*CM[3],CM[4],cp.z-sz*CM[3]);dl.position.set(cp.x+6,14,cp.z+8);dl.target.position.set(cp.x,0,cp.z);
 MK.forEach((m,i)=>{if(m.visible)m.position.set(ST[i].x,4.6+Math.abs(Math.sin(t*3))*.3,ST[i].z)});if(em.visible)em.position.set(EX.x,3.7+Math.abs(Math.sin(t*3))*.3,EX.z);
 bt-=dt;const cw=cv.clientWidth,ch=cv.clientHeight,bb=$('bub');if(bb.style.display=='block'){bv.set(P.x,P.y+2.3,P.z).project(cam);bb.style.left=(bv.x*.5+.5)*cw+'px';bb.style.top=(-bv.y*.5+.5)*ch+'px'}
 ST.forEach((s,i)=>{const near=!halt&&Math.hypot(P.x-s.x,P.z-s.z)<6.5;if(near){if(!s.line)s.line=RES[i]?'Terima kasih!':R(HI);bv.set(s.x,3.1,s.z).project(cam);s.sb.textContent=s.line;s.sb.style.left=(bv.x*.5+.5)*cw+'px';s.sb.style.top=(-bv.y*.5+.5)*ch+'px';s.sb.style.display='block'}else{s.line=null;s.sb.style.display='none'}});
 const ns=nearSt(),h=$('hint'),pe=document.body.classList.contains('touch')?'Tekan E':'E';
 if(halt)h.style.display='none';else if(ns>=0){h.textContent=RES[ns]?'Gerai '+(ns+1)+' sudah selesai ✔':pe+' · Cakap dengan '+KD.stalls[ns].v;h.style.display='block'}else if(nearDoor()){h.textContent=pe+(doneN()==5?' · Keluar kantin':' · Pintu keluar ('+doneN()+'/5 gerai)');h.style.display='block'}else h.style.display='none';
 drawMM();ren.render(sc,cam)}requestAnimationFrame(loop);
/* ---- start ---- */
function boot(){const k=LS.get('sk_cur',null);if(!OKGO||!k||!PF[k]){SS.del('sk_day');SS.del('sk_ret');nav('index');return}
 cur=PF[k];gen=cur.gen||'m';curL=cur.L||null;mkP();applySet();$('mdl').textContent='Kantin · '+(STORY?'Mod Kelas':'Mod Jalan-jalan');
 loading(()=>{document.body.classList.remove('mn');halt=false;toast(STORY?'Waktu rehat! Jumpa semua penjual.':'Jom jumpa semua penjual.',2600)})}
boot();
