const ND={TL:[108,168],TS:[336,168],TR:[562,168],MR:[562,344],MS:[336,344],ML:[118,344],BL:[118,520],BS:[336,520],BR:[572,520]},
ED={TL:['TS'],TS:['TL','TR','MS'],TR:['TS','MR'],MR:['TR','MS'],MS:['MR','ML','TS','BS'],ML:['MS','BL'],BL:['ML','BS'],BS:['BL','BR','MS'],BR:['BS']};
const P={x:X(336),z:Z(500),y:0,vy:0,f:Math.PI,stun:0,slow:0,boost:0,sx:0,sz:0},cp={x:P.x,z:P.z};let gen='m',pm,cy=0,hold=0,tgt=-1,dist=null,ay=0,cm=1,curL=null;const CMS=[[3.8,2.4,.12,1.2,1.25,'Dekat'],[6,1.2,.85,.6,.9,'Sederhana'],[5,1.5,1.5,.3,.8,'Tinggi']];
function mkP(){if(pm)sc.remove(pm);pm=player(gen,'uni',curL);sc.add(pm);pm.userData.arms[1].add(...HM)}mkP();
const YC=new T.MeshBasicMaterial({color:'#ffd23f'}),ar=new T.Group(),ac=new T.Mesh(new T.ConeGeometry(.28,.7,4),YC),ab=new T.Mesh(new T.BoxGeometry(.18,.12,.5),YC),tm=new T.Mesh(new T.ConeGeometry(.4,.8,4),YC);
ac.rotation.x=Math.PI/2;ac.position.z=.35;ab.position.z=-.15;ar.add(ac,ab);ar.visible=false;sc.add(ar);tm.rotation.x=Math.PI;tm.visible=false;sc.add(tm);
const ns=[];['murid','murid','murid','murid','murid','murid','murid','murid','murid','pengawas','pengawas','guru','guru','guru'].forEach(r=>{const m=npc(r),k=R(Object.keys(ND).filter(z=>z!='TL'&&z!='BR')),n={m,x:X(ND[k][0])+rnd(-.8,.8),z:Z(ND[k][1])+rnd(-.8,.8),from:k,to:k,tx:0,tz:0,w:rnd(.5,2),sp:rnd(1.4,2.3),f:0,mv:0};n.tx=n.x;n.tz=n.z;sc.add(m);ns.push(n)});
const keys={},jv={x:0,z:0};let jmp=0;
addEventListener('keydown',e=>{if(halt)return;keys[e.code]=1;if(e.code=='Space')e.preventDefault();if(e.code=='KeyE')act()});addEventListener('keyup',e=>keys[e.code]=0);
if(matchMedia('(pointer:coarse)').matches)document.body.classList.add('touch');
const jz=$('jz'),jb=$('jb'),jk=$('jk');let jid=null,bx0,by0;
jz.onpointerdown=e=>{jid=e.pointerId;jz.setPointerCapture(jid);bx0=e.clientX;by0=e.clientY;const r=jz.getBoundingClientRect();jb.style.left=(bx0-r.left-50)+'px';jb.style.top=(by0-r.top-50)+'px';jb.style.display='block';jk.style.transform='none'};
jz.onpointermove=e=>{if(e.pointerId!=jid)return;let dx=e.clientX-bx0,dy=e.clientY-by0;const l=Math.hypot(dx,dy);if(l>50){dx*=50/l;dy*=50/l}jk.style.transform=`translate(${dx}px,${dy}px)`;jv.x=dx/50;jv.z=dy/50};
jz.onpointerup=jz.onpointercancel=()=>{jid=null;jb.style.display='none';jv.x=jv.z=0};
$('bj').onpointerdown=()=>jmp=1;$('bj').onpointerup=$('bj').onpointercancel=()=>jmp=0;$('be').onpointerdown=()=>act();
$('ex').onclick=()=>pause();
let od=null;cv.onpointerdown=e=>{od=e;cv.setPointerCapture(e.pointerId)};cv.onpointermove=e=>{if(od&&e.pointerId==od.pointerId){cy-=(e.clientX-od.clientX)*.007;od=e;hold=1.5}};cv.onpointerup=cv.onpointercancel=()=>od=null;


function near(){let b=null,bd=2;DR.forEach(d=>{const k=Math.hypot(P.x-d[7],P.z-d[8]);if(k<bd){bd=k;b=d}});return b}
let drink=0,dcd=0,carry=-1,fly=null;
function wcu(){}
function sip(){if(drink>0)return;if(dcd>0){say('Tak dahaga lagi!');return}drink=1.6;dcd=5;[0,1,2].forEach(i=>tone(420-i*60,i*.22,.18,'sine',.2));say(R(['Ahh, segarnya!','Segar betul!','Alhamdulillah!']));cur.drinks++;save();
if(cur.drinks==8)award('air8','Tabiat Sihat','Anda sudah minum air 8 kali.')}
wcu();let bt=0,bm;const bv=new T.Vector3();function say(t){const b=$('bub');b.textContent=t;b.style.display='block';bt=4;clearTimeout(bm);bm=setTimeout(()=>b.style.display='none',2200)}
function refreshBack(){BP.forEach(m=>m.material.color.set(backOpen()?'#5ccf4a':'#444444'))} /* Round 10b3: the dark lock box on each back door turns green after the vase ritual */
function act(){if(halt)return;const d=near(),m=$('msg');let s='';if(carry>=0){let nb=null,nd=1.3;BN.forEach(b=>{const k=Math.hypot(P.x-b.x,P.z-b.z);if(k<nd){nd=k;nb=b}});if(nb){throwIt(nb);return}}else{const q=SM.find(u=>u.cd<=0&&Math.hypot(P.x-u.x,P.z-u.z)<1.1);if(q){pick(q);return}}if(!d){const v=VS.find(q=>Math.hypot(P.x-q.x,P.z-q.z)<1.5);if(v){if(vaseHit(v.id))refreshBack();return}const bi=DD.findIndex(q=>Math.hypot(P.x-q[0],P.z-q[1])<1.8);if(bi>=0&&backOpen()){window.storyBack(bi);return}}if(!d&&WF.some(q=>Math.hypot(P.x-q[0],P.z-q[1])<1.6)){sip();return}if(d&&d[6]=='Pejabat'){if(CANE_TEST&&!CN.on){caneStart();return}say(R(['Pejabat: Cikgu sedang bertugas.','Pintu Pejabat tertutup. Jangan buat bising!','Cikgu tak panggil kamu. Pergi dulu!']));return}if(d){if(window.storyDoor&&storyDoor(d))return;loading(()=>{halt=false;toast('Bilik '+d[6]+' belum siap lagi. Tunggu ya!',2600)});return}else if(DD.some(q=>Math.hypot(P.x-q[0],P.z-q[1])<1.8))s='Pintu ini dikunci. Gunakan pintu yang bertanda nama bilik.';else{const k=TD.find(q=>Math.hypot(P.x-q[0],P.z-q[1])<1.8);if(k){if(k[3]!=gen){say('Tak boleh masuk sini!');return}s=k[2]+': ditutup buat masa ini.'}}if(!s)return;m.textContent=s;m.style.display='block';clearTimeout(mt);mt=setTimeout(()=>m.style.display='none',2600)}
/* Round 9g test: the cane scene, HAND ONLY. Offence ladder (cur.off = offences so far): 1st = 1 rotan on the hand, 2nd = 2 rotan, 3rd = suspension, run 200 m (the run itself is built in Round 13). Cartoon only: PAP! word, camera shake, no blood. */
const CN={on:0,ph:0,t:0,n:0,total:1,third:0,hit:0,sh:0,tp:{x:0,z:0}};
function caneStart(){if(!TCH||CN.on)return;const o=(cur&&cur.off)||0;

 CN.third=o>=2?1:0;CN.total=Math.min(o+1,3);CN.on=1;CN.ph=0;CN.t=0;CN.n=0;CN.hit=0;CN.sh=0;CN.tp.x=TCH.position.x;CN.tp.z=TCH.position.z;halt=true;carry=-1;CANE.visible=true;
 toast('Cikgu: Kesalahan '+['pertama','kedua','ketiga'][CN.total-1]+'. '+['Satu','Dua','Tiga'][CN.total-1]+' rotan di tapak tangan.'+(CN.third?' Kamu digantung juga!':''),2800)}
function capText(txt,big){const e=document.createElement('div');e.textContent=txt;bv.set(P.x,P.y+1.5,P.z).project(cam);e.style.cssText='position:fixed;z-index:9;pointer-events:none;font:900 '+(big?'3.4em':'2.2em')+' Fredoka,sans-serif;color:#ffd23f;-webkit-text-stroke:3px #7a1f1f;paint-order:stroke fill;text-shadow:0 4px 0 #7a1f1f;white-space:nowrap;left:'+((bv.x*.5+.5)*cv.clientWidth)+'px;top:'+((-bv.y*.5+.5)*cv.clientHeight)+'px;transform:translate(-50%,-50%) rotate('+Math.round(Math.random()*24-12)+'deg) scale(.4);transition:transform .12s ease-out,opacity .4s;opacity:1';document.body.appendChild(e);requestAnimationFrame(()=>e.style.transform=e.style.transform.replace('scale(.4)','scale(1.1)'));setTimeout(()=>e.style.opacity=0,500);setTimeout(()=>e.remove(),950)}
function stepTo(o,x,z,s){const dx=x-o.x,dz=z-o.z,d=Math.hypot(dx,dz);if(d<.04){o.x=x;o.z=z;return 0}const m=Math.min(d,s);o.x+=dx/d*m;o.z+=dz/d*m;return 1}
function caneTick(dt,t){if(CN.sh>0)CN.sh=Math.max(0,CN.sh-dt);if(!CN.on)return;halt=true;CN.t+=dt;
 const pu=pm.userData,tu=TCH.userData,k=Math.min(1,dt*10),tw=Math.min(1,dt*14),HX=X(412),HZ=PJZ+.9,ax=CNS[0]+.85,az=CNS[1],bx=CNS[0]-.85;
 cy=la(cy,0,Math.min(1,dt*4)); /* camera looks along the hall: you (left) and the teacher (right) face each other, side on */
 const aim=(a,v,r)=>a.rotation.x+=(v-a.rotation.x)*r;
 if(CN.ph==0){const px=P.x,pz=P.z,mp=stepTo(P,bx,az,dt*3.6),mt=stepTo(CN.tp,ax,az,dt*3);
  if(mp)P.f=la(P.f,Math.atan2(bx-px,az-pz),Math.min(1,dt*14));else P.f=la(P.f,Math.PI/2,Math.min(1,dt*10));
  TCH.rotation.y=mt?la(TCH.rotation.y,Math.atan2(ax-TCH.position.x,az-TCH.position.z),tw):la(TCH.rotation.y,-Math.PI/2,tw);
  TCH.position.set(CN.tp.x,0,CN.tp.z);pm.position.set(P.x,P.y,P.z);pm.rotation.y=P.f;anim(pm,t,mp&&P.y<=0);anim(TCH,t,mt);
  if((!mp&&!mt)||CN.t>3){P.x=bx;P.z=az;CN.tp.x=ax;CN.tp.z=az;CN.ph=1;CN.t=0}return}
 TCH.position.set(CN.tp.x,0,CN.tp.z);pm.position.set(P.x,P.y,P.z);pm.rotation.y=P.f=la(P.f,Math.PI/2,k);TCH.rotation.y=la(TCH.rotation.y,-Math.PI/2,tw);
 if(CN.ph==1){aim(pu.arms[1],-1.5,k);aim(tu.arms[1],-2.7,k);if(CN.t>.8){CN.ph=2;CN.t=0;CN.n=0;CN.hit=0}return}
 if(CN.ph==2){const sub=CN.t-CN.n*.9;
  if(sub<.14)aim(tu.arms[1],-1.2,Math.min(1,dt*30));else aim(tu.arms[1],-2.7,Math.min(1,dt*6));
  if(CN.hit&&sub<.5)aim(pu.arms[1],-2.5,Math.min(1,dt*20));else aim(pu.arms[1],-1.5,Math.min(1,dt*8)); /* hand snatched up after the hit */
  if(sub>=.08&&!CN.hit){CN.hit=1;CN.sh=.3;capText('PAP!',1);tone(190,0,.1,'square',.3);tone(95,.03,.14,'sawtooth',.25);if(P.y<=0)P.vy=2.2;say(['Aduh!','Adoi!','Aaaa!'][CN.n]);if(CN.n==CN.total-1)setTimeout(()=>{if(CN.on)capText('💫',0)},250)}
  if(sub>=.9){CN.n++;CN.hit=0;if(CN.n>=CN.total){CN.ph=3;CN.t=0;CANE.visible=false}}return}
 if(CN.ph==3){aim(pu.arms[1],0,k);aim(tu.arms[1],0,k);const mt=stepTo(CN.tp,HX,HZ,dt*2.5);TCH.rotation.y=mt?la(TCH.rotation.y,Math.atan2(HX-CN.tp.x,HZ-CN.tp.z),tw):la(TCH.rotation.y,0,tw);TCH.position.set(CN.tp.x,0,CN.tp.z);anim(TCH,t,mt);
  if(!mt&&CN.t>1.2){CN.on=0;halt=false;TCH.rotation.y=0;pu.arms.forEach(a=>a.rotation.x=0);tu.arms[1].rotation.x=0;P.slow=15;if(CN.third){cur.off=0;save();toast('Digantung! Lari 200 m di Padang. (Ujian: larian siap di Round 13. Kiraan kesalahan dimulakan semula.)',5600)}else{cur.off=(cur.off||0)+1;save();toast('Kesalahan ke-'+cur.off+' dicatat.'+(cur.off>=2?' Satu lagi kesalahan = rotan 3 kali dan digantung.':''),3000)}}}}
function fit(){ren.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}addEventListener('resize',fit);fit();
const mc=$('mm'),mg=mc.getContext('2d'),mb=document.createElement('canvas');mb.width=mb.height=320;
(()=>{const g=mb.getContext('2d'),sx=p=>(p-92)/496*320,sy=p=>(p-40)/506*320,rc=(r,c)=>{g.fillStyle=c;g.fillRect(sx(r[0]),sy(r[1]),sx(r[2])-sx(r[0]),sy(r[3])-sy(r[1]))};
g.fillStyle='#8fc27a';g.fillRect(0,0,320,320);[[100,150,580,538],[158,110,182,150],[468,110,492,150]].forEach(r=>rc(r,'#b4b8be'));
[[100,186,318,326,'#e2cfa6'],[354,186,544,326,'#e2cfa6'],[136,362,318,502,'#e2cfa6'],[420,362,580,502,'#e2cfa6'],[354,362,420,502,'#d8b98a'],[100,40,318,110,'#78b866'],[354,40,580,110,'#e4786b']].forEach(r=>rc(r,r[4]));
g.fillStyle='#17202b';g.font='bold 22px Fredoka,sans-serif';g.textAlign='center';g.textBaseline='middle';[['SN',209,256],['MT',449,256],['EN',227,432],['PP',500,432],['PEJ',387,432],['PB',209,75],['KT',467,75]].forEach(l=>g.fillText(l[0],sx(l[1]),sy(l[2])));
[[110,168,'#2f6fd0',0],[570,520,'#d6568f',1]].forEach(t=>{const a=sx(t[0]),b=sy(t[1]);g.fillStyle=t[2];g.beginPath();g.arc(a,b,12,0,7);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(a,b-5,3.5,0,7);g.fill();if(t[3]){g.beginPath();g.moveTo(a,b-2);g.lineTo(a-6,b+8);g.lineTo(a+6,b+8);g.fill()}else g.fillRect(a-3,b-1,6,9)})})();
function drawMM(){mg.drawImage(mb,0,0);const f=(x,z)=>[((x/K+340)-92)/496*320,((z/K+344)-40)/506*320];
if(dist){const p=path(400);mg.strokeStyle='#ffd23f';mg.lineWidth=5;mg.beginPath();let a=f(P.x,P.z);mg.moveTo(a[0],a[1]);p.forEach(c=>{a=f(c[0],c[1]);mg.lineTo(a[0],a[1])});mg.stroke()}
if(tgt>=0){const a=f(DR[tgt][7],DR[tgt][8]);mg.fillStyle='#e24b4b';mg.beginPath();mg.arc(a[0],a[1],9,0,7);mg.fill()}
const a=f(P.x,P.z),s=Math.sin(P.f),c=Math.cos(P.f);mg.fillStyle='#2f6fd0';mg.strokeStyle='#fff';mg.lineWidth=3;mg.beginPath();mg.moveTo(a[0]+s*14,a[1]+c*14);mg.lineTo(a[0]-s*8+c*8,a[1]-c*8-s*8);mg.lineTo(a[0]-s*8-c*8,a[1]-c*8+s*8);mg.closePath();mg.fill();mg.stroke()}
function pause(){if(window.savePos)savePos();halt=true;$('menu').classList.add('pz');$('menu').style.display='flex';document.body.classList.add('mn');view('vp')}
$('pS').onclick=()=>{$('menu').style.display='none';halt=false;document.body.classList.remove('mn')};$('pH').onclick=()=>{frm='vp';view('vh')};$('pT').onclick=()=>{frm='vp';applySet();view('vt')};$('pQ').onclick=()=>nav('index');
/* Round 6: Android back button opens Pause (and closes it again) instead of leaving the game.
   The history entry is added on the first touch/key press, because Chrome skips entries added without interaction. */
(function(){if(SR_IFR)return;let on=0;const E=['pointerdown','keydown','touchend'],arm=()=>{if(on)return;on=1;backKeep();E.forEach(e=>removeEventListener(e,arm,true))};E.forEach(e=>addEventListener(e,arm,true));
addEventListener('popstate',()=>{if(!on||!SR_TRAP)return;backKeep();const ld=$('ld'),rm=document.getElementById('room');if((ld&&ld.style.display!='none')||(rm&&rm.style.display=='flex'))return;
const m=$('menu');if(m.style.display=='flex'){const vp=$('vp');if(vp&&!vp.hidden)$('pS').click();else view('vp')}else pause()})})();
window.gfxHook=()=>{ren.shadowMap.enabled=!SET.lo;dl.castShadow=!SET.lo;ren.setPixelRatio(SET.lo?1:Math.min(devicePixelRatio,2));fit();sc.traverse(o=>{if(o.material)o.material.needsUpdate=true})};
/* Round 8a: see-through walls. A wall (with its posters and signs) fades to 25% only while it is between the camera and the player */
const FADE=.25;
function segBox(C,Q,b){let t0=0,t1=1;const d=[Q.x-C.x,Q.y-C.y,Q.z-C.z],o=[C.x,C.y,C.z];
 for(let i=0;i<3;i++){const lo=b[i*2]-.12,hi=b[i*2+1]+.12;if(Math.abs(d[i])<1e-6){if(o[i]<lo||o[i]>hi)return false}else{let a=(lo-o[i])/d[i],c=(hi-o[i])/d[i];if(a>c){const k=a;a=c;c=k}t0=Math.max(t0,a);t1=Math.min(t1,c);if(t0>t1)return false}}return true}
function fades(dt){const Q={x:P.x,y:P.y+1.1,z:P.z},C=cam.position;FDS.forEach(f=>{f.tg=f.boxes.some(b=>segBox(C,Q,b))?FADE:1;
 if(f.op!==f.tg){const k=SET.lo?1:Math.min(1,dt*10);f.op=Math.abs(f.tg-f.op)<.01?f.tg:f.op+(f.tg-f.op)*k;const fd=f.op<.995;
  f.m.forEach(m=>{const mt=m.mt;mt.opacity=m.b*f.op;const tr=m.tr||fd;if(mt.transparent!==tr){mt.transparent=tr;mt.needsUpdate=true}mt.depthWrite=fd?false:m.dw})}
 /* Round 8b2: while a wall is see-through, draw back to front by hand every frame, layer by layer. The wall is 1000. Decor on the camera side is
    1001 + its layer q (cm off the wall face), so the stripe (2) goes first, then door, window frame, poster (6) and what is stacked on them (9, 10).
    Decor on the far side is 999 - q, the layer farthest from the camera first. Back to normal (0) once solid. Without this the stripe could be
    painted over the door, and posters and windows lost their layers, until the wall turned solid again */
 const on=f.op<.995;if(on||f.ro){f.m.forEach(m=>{const d=m.sd;m.o.renderOrder=!on?0:!d?1000:((C[d.ax]-d.mid)*d.sg>0?1001+d.q:999-d.q)});f.ro=on}})}
let last=0;function loop(ts){requestAnimationFrame(loop);const dt=Math.min((ts-last)/1000||0,.05),t=ts/1000;last=ts;
if(halt){keys.KeyW=keys.KeyA=keys.KeyS=keys.KeyD=keys.ArrowUp=keys.ArrowDown=keys.ArrowLeft=keys.ArrowRight=keys.Space=0;jv.x=jv.z=0;jmp=0}
let ix=(keys.KeyD||keys.ArrowRight?1:0)-(keys.KeyA||keys.ArrowLeft?1:0)+jv.x,iz=(keys.KeyS||keys.ArrowDown?1:0)-(keys.KeyW||keys.ArrowUp?1:0)+jv.z;const l=Math.hypot(ix,iz);if(l>1){ix/=l;iz/=l}
P.boost-=dt;P.slow-=dt;drink-=dt;dcd-=dt;const SP=5*(P.boost>0?1.7:1)*(P.slow>0?.5:1),mv=l>.12&&drink<=0&&P.stun<=0;
if(P.stun>0){P.stun-=dt;const k=Math.max(P.stun,0)*3.5,dx=P.sx*k*dt,dz=P.sz*k*dt;if(!hit(P.x+dx,P.z,.35))P.x+=dx;if(!hit(P.x,P.z+dz,.35))P.z+=dz;P.f+=dt*14}
let cb=false;if(mv){const m=camMap(cy,ix,iz,true,od||hold>0),mx=m[0],mz=m[1],dx=mx*SP*dt,dz=mz*SP*dt,ox=P.x,oz=P.z;P.sx=mx;P.sz=mz;if(!hit(P.x+dx,P.z,.35))P.x+=dx;if(!hit(P.x,P.z+dz,.35))P.z+=dz;P.f=la(P.f,Math.atan2(mx,mz),Math.min(1,dt*14));cb=Math.hypot(P.x-ox,P.z-oz)<CAMC.block*Math.hypot(dx,dz)}else camMap(cy,0,0,false,false);
cy=camStep(cy,dt,mv,cb,P.f,hold);hold-=dt; /* Round 7c: camera does not chase the stick any more, see camStep in core.js */
if((keys.Space||jmp)&&P.y<=0&&P.stun<=0&&drink<=0)P.vy=6.8;P.vy-=22*dt;P.y+=P.vy*dt;if(P.y<=0){P.y=0;P.vy=0}
pm.position.set(P.x,P.y,P.z);pm.rotation.y=P.f;anim(pm,t,mv&&P.y==0);if(drink>0)pm.userData.arms[1].rotation.x=-2.4;else if(carry>=0)pm.userData.arms[1].rotation.x=-.9;
OB.forEach(o=>{if(o.cd>0){o.cd-=dt;if(o.cd<=0)o.m.visible=true;return}if(o.t=='sign')return;if(Math.hypot(P.x-o.x,P.z-o.z)<.5&&P.y<.5){if(o.t=='banana'&&P.stun<=0){P.stun=1.1;say(R(['Aduh!','Alamak!','Wei, licin!']));tone(300,0,.5,'sawtooth',.1);o.cd=8;o.m.visible=false;cur.slip++;save();if(cur.slip==5)award('slip5','Kaki Licin','Anda sudah terpijak kulit pisang 5 kali.')}else if(o.t=='litter'){P.slow=1.4;say('Ish, sampah!');o.cd=6;o.m.visible=false}}});
BO.forEach(b=>{b.m.rotation.y+=dt*2;b.m.position.y=.9+Math.sin(t*3+b.x)*.12;if(b.cd>0){b.cd-=dt;if(b.cd<=0)b.m.visible=true;return}if(Math.hypot(P.x-b.x,P.z-b.z)<.8){P.boost=3;b.cd=12;b.m.visible=false;say(R(['Wuuu, laju!','Pergh, laju!']));cur.gem++;save();if(cur.gem==5)award('gem5','Laju Kilat','Anda sudah ambil 5 gem laju.');[0,1,2].forEach(i=>tone(500+i*200,i*.08,.15,'square',.08))}});
SM.forEach(s=>{if(s.cd>0){s.cd-=dt;if(s.cd<=0){s.ty=(s.ty+1)%4;s.k.forEach((g,i)=>g.visible=i==s.ty)}return}if(P.slow<=0&&P.y<.5&&Math.hypot(P.x-s.x,P.z-s.z)<.45){P.slow=1.2;say('Ish, sampah!')}});
if(fly){fly.t+=dt/.5;const u=Math.min(fly.t,1);fly.g.position.set(fly.x0+(fly.x1-fly.x0)*u,1.3-.6*u+Math.sin(Math.PI*u)*.9,fly.z0+(fly.z1-fly.z0)*u);if(fly.t>=1){sc.remove(fly.g);fly=null}}
$('stt').textContent=P.boost>0?'Laju!':P.slow>0?'Perlahan':'';
ns.forEach(n=>{if(n.hid>0){n.hid-=dt;if(n.hid<=0)n.m.visible=true;return}if(n.w>0){n.w-=dt;n.mv=0}else{const dx=n.tx-n.x,dz=n.tz-n.z,d=Math.hypot(dx,dz);
if(d<.3){const gg=n.m.userData.g;if((n.to=='TL'&&gg=='m')||(n.to=='BR'&&gg=='f')){n.hid=rnd(4,8);n.m.visible=false}const o=ED[n.to].filter(k=>k!=n.from&&!(k=='TL'&&gg!='m')&&!(k=='BR'&&gg!='f')),k=R(o.length?o:ED[n.to]);n.from=n.to;n.to=k;const q=(k=='TL'||k=='BR')?0:.8;n.tx=X(ND[k][0])+rnd(-q,q);n.tz=Z(ND[k][1])+rnd(-q,q);if(Math.random()<.3)n.w=rnd(1,3)}
else{n.x+=dx/d*n.sp*dt;n.z+=dz/d*n.sp*dt;n.f=la(n.f,Math.atan2(dx,dz),Math.min(1,dt*8));n.mv=1}}
n.m.position.set(n.x,0,n.z);n.m.rotation.y=n.f;anim(n.m,t,n.mv)});
caneTick(dt,t);const CM=CMS[cm],D=CM[0]*(cam.aspect<1?1.15:1);cp.x+=(P.x-cp.x)*Math.min(1,dt*10);cp.z+=(P.z-cp.z)*Math.min(1,dt*10);const sx=Math.sin(cy),sz=Math.cos(cy);const cd=D;
cam.position.set(cp.x+sx*cd,CM[1]+cd*CM[2],cp.z+sz*cd);cam.lookAt(cp.x-sx*CM[3],CM[4],cp.z-sz*CM[3]);if(CN.sh>0){cam.position.x+=(Math.random()-.5)*CN.sh*.6;cam.position.y+=(Math.random()-.5)*CN.sh*.5}dl.position.set(cp.x+6,14,cp.z+8);dl.target.position.set(cp.x,0,cp.z);fades(dt);
const pa=path(8);if(pa.length){const q=pa[pa.length-1];ay=la(ay,Math.atan2(q[0]-P.x,q[1]-P.z),Math.min(1,dt*10));ar.visible=true;ar.rotation.y=ay;ar.position.set(P.x,2.3+Math.sin(t*5)*.08,P.z)}else ar.visible=false;
if(tgt>=0){const g=DR[tgt];tm.visible=true;tm.position.set(g[7],2.9+Math.abs(Math.sin(t*3))*.3,g[8])}else tm.visible=false;
bt-=dt;if(bt<=0)TD.forEach(q=>{if(q[3]!=gen&&Math.hypot(P.x-q[0],P.z-q[1])<1.5)say('Tak boleh masuk sini!')});const bb=$('bub');if(bb.style.display=='block'){bv.set(P.x,P.y+2.3,P.z).project(cam);bb.style.left=(bv.x*.5+.5)*cv.clientWidth+'px';bb.style.top=(-bv.y*.5+.5)*cv.clientHeight+'px'}
const d=near(),h=$('hint');const wn=WF.some(q=>Math.hypot(P.x-q[0],P.z-q[1])<1.6),sn=carry<0&&SM.some(u=>u.cd<=0&&Math.hypot(P.x-u.x,P.z-u.z)<1.1),bn=carry>=0&&BN.some(b=>Math.hypot(P.x-b.x,P.z-b.z)<1.3),pe=document.body.classList.contains('touch')?'Tekan E':'E';if(d){h.textContent=pe+(d[6]=='Pejabat'?' · Ketuk pintu Pejabat'+(CANE_TEST?' (ujian: kesalahan '+(((cur&&cur.off)||0)+1)+'/3)':''):' · Masuk '+d[6]);h.style.display='block'}else if(backOpen()&&DD.some(q=>Math.hypot(P.x-q[0],P.z-q[1])<1.8)){h.textContent=pe+' · Pintu belakang';h.style.display='block'}else if(bn){h.textContent=pe+' · Buang sampah';h.style.display='block'}else if(sn){h.textContent=pe+' · Ambil sampah';h.style.display='block'}else if(wn){h.textContent=pe+' · Minum air';h.style.display='block'}else h.style.display='none';
if(window.storyTick)storyTick(dt,t);drawMM();
ren.render(sc,cam)}requestAnimationFrame(loop);
function boot(){const k=LS.get('sk_cur',null);if(!k||!PF[k]){nav('index');return}cur=PF[k];refreshBack();gen=cur.gen||'m';curL=cur.L||null;mkP();applySet();loading(()=>{document.body.classList.remove('mn');if(window.storyBoot)storyBoot();else halt=false})}
boot();
