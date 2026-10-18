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
function act(){if(halt)return;const d=near(),m=$('msg');let s='';if(carry>=0){let nb=null,nd=1.3;BN.forEach(b=>{const k=Math.hypot(P.x-b.x,P.z-b.z);if(k<nd){nd=k;nb=b}});if(nb){throwIt(nb);return}}else{const q=SM.find(u=>u.cd<=0&&Math.hypot(P.x-u.x,P.z-u.z)<1.1);if(q){pick(q);return}}if(!d&&WF.some(q=>Math.hypot(P.x-q[0],P.z-q[1])<1.6)){sip();return}if(d){if(window.storyDoor&&storyDoor(d))return;loading(()=>{halt=false;toast('Bilik '+d[6]+' belum siap lagi. Tunggu ya!',2600)});return}else if(DD.some(q=>Math.hypot(P.x-q[0],P.z-q[1])<1.8))s='Pintu ini dikunci. Gunakan pintu yang bertanda nama bilik.';else{const k=TD.find(q=>Math.hypot(P.x-q[0],P.z-q[1])<1.8);if(k){if(k[3]!=gen){say('Tak boleh masuk sini!');return}s=k[2]+': ditutup buat masa ini.'}}if(!s)return;m.textContent=s;m.style.display='block';clearTimeout(mt);mt=setTimeout(()=>m.style.display='none',2600)}
function fit(){ren.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}addEventListener('resize',fit);fit();
const mc=$('mm'),mg=mc.getContext('2d'),mb=document.createElement('canvas');mb.width=mb.height=320;
(()=>{const g=mb.getContext('2d'),sx=p=>(p-92)/496*320,sy=p=>(p-40)/506*320,rc=(r,c)=>{g.fillStyle=c;g.fillRect(sx(r[0]),sy(r[1]),sx(r[2])-sx(r[0]),sy(r[3])-sy(r[1]))};
g.fillStyle='#8fc27a';g.fillRect(0,0,320,320);[[100,150,580,538],[158,110,182,150],[468,110,492,150]].forEach(r=>rc(r,'#b4b8be'));
[[100,186,318,326,'#e2cfa6'],[354,186,544,326,'#e2cfa6'],[136,362,318,502,'#e2cfa6'],[354,362,580,502,'#e2cfa6'],[100,40,318,110,'#78b866'],[354,40,580,110,'#e4786b']].forEach(r=>rc(r,r[4]));
g.fillStyle='#17202b';g.font='bold 22px Fredoka,sans-serif';g.textAlign='center';g.textBaseline='middle';[['SN',209,256],['MT',449,256],['EN',227,432],['PP',467,432],['PB',209,75],['KT',467,75]].forEach(l=>g.fillText(l[0],sx(l[1]),sy(l[2])));
[[110,168,'#2f6fd0',0],[570,520,'#d6568f',1]].forEach(t=>{const a=sx(t[0]),b=sy(t[1]);g.fillStyle=t[2];g.beginPath();g.arc(a,b,12,0,7);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(a,b-5,3.5,0,7);g.fill();if(t[3]){g.beginPath();g.moveTo(a,b-2);g.lineTo(a-6,b+8);g.lineTo(a+6,b+8);g.fill()}else g.fillRect(a-3,b-1,6,9)})})();
function drawMM(){mg.drawImage(mb,0,0);const f=(x,z)=>[((x/K+340)-92)/496*320,((z/K+344)-40)/506*320];
if(dist){const p=path(400);mg.strokeStyle='#ffd23f';mg.lineWidth=5;mg.beginPath();let a=f(P.x,P.z);mg.moveTo(a[0],a[1]);p.forEach(c=>{a=f(c[0],c[1]);mg.lineTo(a[0],a[1])});mg.stroke()}
if(tgt>=0){const a=f(DR[tgt][7],DR[tgt][8]);mg.fillStyle='#e24b4b';mg.beginPath();mg.arc(a[0],a[1],9,0,7);mg.fill()}
const a=f(P.x,P.z),s=Math.sin(P.f),c=Math.cos(P.f);mg.fillStyle='#2f6fd0';mg.strokeStyle='#fff';mg.lineWidth=3;mg.beginPath();mg.moveTo(a[0]+s*14,a[1]+c*14);mg.lineTo(a[0]-s*8+c*8,a[1]-c*8-s*8);mg.lineTo(a[0]-s*8-c*8,a[1]-c*8+s*8);mg.closePath();mg.fill();mg.stroke()}
function pause(){halt=true;$('menu').classList.add('pz');$('menu').style.display='flex';document.body.classList.add('mn');view('vp')}
$('pS').onclick=()=>{$('menu').style.display='none';halt=false;document.body.classList.remove('mn')};$('pH').onclick=()=>{frm='vp';view('vh')};$('pT').onclick=()=>{frm='vp';applySet();view('vt')};$('pQ').onclick=()=>nav('index');
/* Round 6: Android back button opens Pause (and closes it again) instead of leaving the game.
   The history entry is added on the first touch/key press, because Chrome skips entries added without interaction. */
(function(){if(SR_IFR)return;let on=0;const E=['pointerdown','keydown','touchend'],arm=()=>{if(on)return;on=1;backKeep();E.forEach(e=>removeEventListener(e,arm,true))};E.forEach(e=>addEventListener(e,arm,true));
addEventListener('popstate',()=>{if(!on||!SR_TRAP)return;backKeep();const ld=$('ld'),rm=document.getElementById('room');if((ld&&ld.style.display!='none')||(rm&&rm.style.display=='flex'))return;
const m=$('menu');if(m.style.display=='flex'){const vp=$('vp');if(vp&&!vp.hidden)$('pS').click();else view('vp')}else pause()})})();
window.gfxHook=()=>{ren.shadowMap.enabled=!SET.lo;dl.castShadow=!SET.lo;ren.setPixelRatio(SET.lo?1:Math.min(devicePixelRatio,2));fit();sc.traverse(o=>{if(o.material)o.material.needsUpdate=true})};
let last=0;function loop(ts){requestAnimationFrame(loop);const dt=Math.min((ts-last)/1000||0,.05),t=ts/1000;last=ts;
if(halt){keys.KeyW=keys.KeyA=keys.KeyS=keys.KeyD=keys.ArrowUp=keys.ArrowDown=keys.ArrowLeft=keys.ArrowRight=keys.Space=0;jv.x=jv.z=0;jmp=0}
let ix=(keys.KeyD||keys.ArrowRight?1:0)-(keys.KeyA||keys.ArrowLeft?1:0)+jv.x,iz=(keys.KeyS||keys.ArrowDown?1:0)-(keys.KeyW||keys.ArrowUp?1:0)+jv.z;const l=Math.hypot(ix,iz);if(l>1){ix/=l;iz/=l}
P.boost-=dt;P.slow-=dt;drink-=dt;dcd-=dt;const SP=5*(P.boost>0?1.7:1)*(P.slow>0?.5:1),mv=l>.12&&drink<=0&&P.stun<=0;
if(P.stun>0){P.stun-=dt;const k=Math.max(P.stun,0)*3.5,dx=P.sx*k*dt,dz=P.sz*k*dt;if(!hit(P.x+dx,P.z,.35))P.x+=dx;if(!hit(P.x,P.z+dz,.35))P.z+=dz;P.f+=dt*14}
if(mv){const s=Math.sin(cy),c=Math.cos(cy),mx=ix*c+iz*s,mz=-ix*s+iz*c,dx=mx*SP*dt,dz=mz*SP*dt;P.sx=mx;P.sz=mz;if(!hit(P.x+dx,P.z,.35))P.x+=dx;if(!hit(P.x,P.z+dz,.35))P.z+=dz;P.f=la(P.f,Math.atan2(mx,mz),Math.min(1,dt*14));if(SET.cf&&hold<=0&&iz<.3)cy=la(cy,Math.atan2(-mx,-mz),Math.min(1,dt*(iz<-.3?2.2:.9)))}hold-=dt;
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
const CM=CMS[cm],D=CM[0]*(cam.aspect<1?1.15:1);cp.x+=(P.x-cp.x)*Math.min(1,dt*10);cp.z+=(P.z-cp.z)*Math.min(1,dt*10);const sx=Math.sin(cy),sz=Math.cos(cy);const cd=D;
cam.position.set(cp.x+sx*cd,CM[1]+cd*CM[2],cp.z+sz*cd);cam.lookAt(cp.x-sx*CM[3],CM[4],cp.z-sz*CM[3]);dl.position.set(cp.x+6,14,cp.z+8);dl.target.position.set(cp.x,0,cp.z);
const pa=path(8);if(pa.length){const q=pa[pa.length-1];ay=la(ay,Math.atan2(q[0]-P.x,q[1]-P.z),Math.min(1,dt*10));ar.visible=true;ar.rotation.y=ay;ar.position.set(P.x,2.3+Math.sin(t*5)*.08,P.z)}else ar.visible=false;
if(tgt>=0){const g=DR[tgt];tm.visible=true;tm.position.set(g[7],2.9+Math.abs(Math.sin(t*3))*.3,g[8])}else tm.visible=false;
bt-=dt;if(bt<=0)TD.forEach(q=>{if(q[3]!=gen&&Math.hypot(P.x-q[0],P.z-q[1])<1.5)say('Tak boleh masuk sini!')});const bb=$('bub');if(bb.style.display=='block'){bv.set(P.x,P.y+2.3,P.z).project(cam);bb.style.left=(bv.x*.5+.5)*cv.clientWidth+'px';bb.style.top=(-bv.y*.5+.5)*cv.clientHeight+'px'}
const d=near(),h=$('hint');const wn=WF.some(q=>Math.hypot(P.x-q[0],P.z-q[1])<1.6),sn=carry<0&&SM.some(u=>u.cd<=0&&Math.hypot(P.x-u.x,P.z-u.z)<1.1),bn=carry>=0&&BN.some(b=>Math.hypot(P.x-b.x,P.z-b.z)<1.3),pe=document.body.classList.contains('touch')?'Tekan E':'E';if(d){h.textContent=pe+' · Masuk '+d[6];h.style.display='block'}else if(bn){h.textContent=pe+' · Buang sampah';h.style.display='block'}else if(sn){h.textContent=pe+' · Ambil sampah';h.style.display='block'}else if(wn){h.textContent=pe+' · Minum air';h.style.display='block'}else h.style.display='none';
if(window.storyTick)storyTick(dt,t);drawMM();
ren.render(sc,cam)}requestAnimationFrame(loop);
function boot(){const k=LS.get('sk_cur',null);if(!k||!PF[k]){nav('index');return}cur=PF[k];gen=cur.gen||'m';curL=cur.L||null;mkP();applySet();loading(()=>{document.body.classList.remove('mn');if(window.storyBoot)storyBoot();else halt=false})}
boot();
