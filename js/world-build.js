const cv=$('cv'),ren=new T.WebGLRenderer({canvas:cv,antialias:true});ren.shadowMap.enabled=true;ren.setPixelRatio(Math.min(devicePixelRatio,2));
const sc=new T.Scene();sc.background=new T.Color('#bfe3f5');const cam=new T.PerspectiveCamera(55,1,.5,150);
sc.add(new T.HemisphereLight(0xffffff,0x9aa7b8,.95));
const dl=new T.DirectionalLight(0xffffff,.55);dl.castShadow=true;dl.shadow.mapSize.set(1024,1024);Object.assign(dl.shadow.camera,{left:-14,right:14,top:14,bottom:-14,near:1,far:50});sc.add(dl,dl.target);
const K=.112,X=x=>(x-340)*K,Z=y=>(y-344)*K,cols=[],WL=[],FDS=[]; /* Round 8a: WL = wall/roof boxes for see-through, FDS = fade sets (built at the end of this file) */
function blk(a,b,c,d,h,col,solid,y0,opa){const x0=X(a),x1=X(c),z0=Z(b),z1=Z(d),m=new T.Mesh(new T.BoxGeometry(x1-x0,h,z1-z0),mat(col));
if(opa){m.material.transparent=true;m.material.opacity=opa;m.material.depthWrite=false;m.renderOrder=2}
m.position.set((x0+x1)/2,(y0||0)+h/2,(z0+z1)/2);m.castShadow=!opa;m.receiveShadow=true;sc.add(m);if(solid)cols.push({x0,x1,z0,z1});if(!opa&&(y0||0)+h>=3.5)WL.push({m,b:[x0,x1,y0||0,(y0||0)+h,z0,z1]});return m}
function flr(a,b,c,d){const x0=X(a),x1=X(c),z0=Z(b),z1=Z(d),cn=document.createElement('canvas');cn.width=cn.height=2;const g=cn.getContext('2d');
g.fillStyle='#c4c7cc';g.fillRect(0,0,2,2);g.fillStyle='#aeb2b8';g.fillRect(0,0,1,1);g.fillRect(1,1,1,1);
const t=new T.CanvasTexture(cn);t.magFilter=T.NearestFilter;t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set((x1-x0)/3,(z1-z0)/3);
const m=new T.Mesh(new T.PlaneGeometry(x1-x0,z1-z0),new T.MeshPhongMaterial({map:t,shininess:0,specular:0}));
m.rotation.x=-Math.PI/2;m.position.set((x0+x1)/2,.01,(z0+z1)/2);m.receiveShadow=true;sc.add(m)}
const gm=new T.Mesh(new T.PlaneGeometry(300,300),mat('#8fc27a'));gm.rotation.x=-Math.PI/2;gm.position.y=-.02;gm.receiveShadow=true;sc.add(gm);
flr(100,150,580,538);flr(158,110,182,150);flr(468,110,492,150);
const WC='#f3ead8',BE='#e2cfa6';
blk(92,142,100,546,4.2,WC,1);blk(580,142,588,546,4.2,WC,1);blk(100,538,580,546,4.2,WC,1);
[[100,158],[182,468],[492,580]].forEach(s=>blk(s[0],142,s[1],150,4.2,WC,1));
[0,310].forEach(o=>{blk(155+o,110,158+o,142,.9,'#fff',1);blk(182+o,110,185+o,142,.9,'#fff',1);blk(153+o,108,187+o,150,.25,'#b5533c',0,4.6,.3);
[[153,118],[185,118],[153,138],[185,138]].forEach(p=>blk(p[0]+o,p[1],p[0]+o+2,p[1]+2,4.6,'#8a8f98',0))});
blk(100,186,318,326,4,BE,1);blk(354,186,544,326,4,BE,1);blk(136,362,318,502,4,BE,1);blk(420,362,580,502,4,BE,1);blk(354,362,420,502,4,'#d8b98a',1); /* Round 9g: Perpustakaan block split, left part (x354-420, nearest the entrance) is the Pejabat */
blk(354,40,580,110,4.4,'#e4786b',1);
(()=>{const x0=X(100),x1=X(318),z0=Z(40),z1=Z(110),cx=(x0+x1)/2,cz=(z0+z1)/2,w=(x1-x0)/2,h=(z1-z0)/2;
const g=new T.Mesh(new T.PlaneGeometry(x1-x0,z1-z0),mat('#78b866'));g.rotation.x=-Math.PI/2;g.position.set(cx,.01,cz);g.receiveShadow=true;sc.add(g);
const fl=(rx,rz,c,y)=>{const m=new T.Mesh(new T.CircleGeometry(1,40),mat(c));m.scale.set(rx,rz,1);m.rotation.x=-Math.PI/2;m.position.set(cx,y,cz);m.receiveShadow=true;sc.add(m)};
fl(w*.9,h*.85,'#ffffff',.03);fl(w*.88,h*.8,'#c4623f',.05);fl(w*.78,h*.5,'#78b866',.07);
blk(100,38,318,40,.9,'#ffffff',0);blk(100,40,102,110,.9,'#ffffff',0);blk(316,40,318,110,.9,'#ffffff',0);
blk(150,106,156,114,3.7,'#ffffff',1);blk(184,106,190,114,3.7,'#ffffff',1);blk(150,106,190,114,.5,'#ffffff',0,3.7);blk(156,109,184,110.5,.12,'#ffffff',0,.8);
cols.push({x0:X(156),x1:X(184),z0:Z(106),z1:Z(111)})})();
function lock(a,c,y0,y1){for(let x=a;x+5.8<=c;x+=6.8)blk(x,y0,x+5.8,y1,2,(x/6.8|0)%2?'#3b6fb6':'#4a86c8',0);cols.push({x0:X(a),x1:X(c),z0:Z(y0),z1:Z(y1)})}
[[104,154],[188,312],[360,464],[496,560]].forEach(s=>lock(s[0],s[1],150,157.1));[[104,312],[360,560]].forEach(s=>lock(s[0],s[1],530.9,538));
const WP=(px,py,nx,nz,o)=>[X(px)+nx*o,Z(py)+nz*o];
function pn(w,h,c,x,y,z,ry){const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({color:c}));m.position.set(x,y,z);m.rotation.y=ry;sc.add(m)}
function win(px,py,nx,nz,yc,w,h){const x=X(px)+nx*.06,z=Z(py)+nz*.06,r=Math.atan2(nx,nz);pn(w+.2,h+.2,'#ffffff',x,yc,z,r);pn(w,h,'#a9d8f0',x+nx*.03,yc,z+nz*.03,r)}
function nb(px,py,nx,nz){const x=X(px)+nx*.06,z=Z(py)+nz*.06,r=Math.atan2(nx,nz);pn(2.16,1.44,'#ffffff',x,1.9,z,r);pn(1.97,1.25,'#c9a46a',x+nx*.02,1.9,z+nz*.02,r);
[['#e24b4b',-.6,.18],['#ffd23f',0,-.12],['#4a86c8',.6,.12]].forEach(n=>pn(.48,.6,n[0],x+nx*.04+nz*n[1],1.9+n[2],z+nz*.04-nx*n[1],r))}
function box3(x,z,w,d,h,c,y0){const m=new T.Mesh(new T.BoxGeometry(w,h,d),mat(c));m.position.set(x,(y0||0)+h/2,z);m.castShadow=true;sc.add(m)}
function solid(x,z,r){cols.push({x0:x-r,x1:x+r,z0:z-r,z1:z+r})}
const WF=[];function filt(px,py,nx,nz){const[x,z]=WP(px,py,nx,nz,.45);box3(x,z,.7,.6,.9,'#8aa0b8');box3(x,z,.5,.45,.45,'#4aa3e0',.9);box3(x,z,.55,.5,.2,'#e9eef5',1.35);solid(x,z,.38);WF.push([x+nx*.8,z+nz*.8])}
function plant(px,py){const x=X(px),z=Z(py),p=new T.Mesh(new T.CylinderGeometry(.28,.2,.45,6),mat('#c0693f')),f=new T.Mesh(new T.IcosahedronGeometry(.42,0),mat('#3f9d54'));p.position.set(x,.225,z);f.position.set(x,.85,z);p.castShadow=f.castShadow=true;sc.add(p,f);solid(x,z,.32)}
const BN=[];function bin(px,py,nx,nz){const[x,z]=WP(px,py,nx,nz,.4),b=new T.Mesh(new T.CylinderGeometry(.27,.22,.65,6),mat('#4d6a58'));b.position.set(x,.33,z);b.castShadow=true;sc.add(b);box3(x,z,.6,.6,.08,'#2f3d35',.65);solid(x,z,.3);BN.push({x:x+nx*.7,z:z+nz*.7,bx:x,bz:z,k:3})}
for(let x=112;x<570;x+=32){if((x>148&&x<192)||(x>458&&x<502))continue;win(x,150,0,1,3.1,1.7,1);if(x<286||x>392)win(x,538,0,-1,3.1,1.7,1)}
[372,404,436,468,500].forEach(y=>win(100,y,1,0,2.4,1.5,1.2));[200,232,264,296,344].forEach(y=>win(580,y,-1,0,2.4,1.5,1.2));[380,416,452,508,544].forEach(x=>win(x,110,0,1,2.6,1.7,1.1));
[[354,205,-1,0],[318,385,1,0],[160,186,0,-1],[400,362,0,-1],[500,326,0,1]].forEach(a=>nb(...a));
[[318,470,1,0],[354,300,-1,0],[300,186,0,-1],[520,186,0,-1],[480,502,0,1],[200,502,0,1]].forEach(a=>filt(...a));
[[575.5,154.5],[104.5,330.5],[575.5,357.5]].forEach(a=>plant(...a)); /* Round 10g: corners, (112,520) removed */
[[200,186,0,-1],[420,326,0,1],[150,362,0,-1],[354,225,-1,0]].forEach(a=>bin(...a));
function band(p,q,w,nx,nz){const h=nz!=0,m=new T.Mesh(new T.PlaneGeometry((q-p)*K,2),mat('#bfa270'));m.position.set(h?X((p+q)/2):X(w)+nx*.02,1,h?Z(w)+nz*.02:Z((p+q)/2));m.rotation.y=Math.atan2(nx,nz);sc.add(m)}
[[100,318,186,0,-1],[354,544,186,0,-1],[100,318,326,0,1],[354,544,326,0,1],[136,318,362,0,-1],[354,420,362,0,-1],[420,580,362,0,-1],[136,318,502,0,1],[354,420,502,0,1],[420,580,502,0,1],[186,326,318,1,0],[362,502,318,1,0],[186,326,354,-1,0],[362,502,354,-1,0],[326,538,100,1,0],[150,326,580,-1,0],[326,362,580,-1,0],[502,538,580,-1,0],[100,158,150,0,1],[182,468,150,0,1],[492,580,150,0,1],[100,580,538,0,-1],[150,186,100,1,0]].forEach(a=>band(...a));
for(let x=128;x<570;x+=32){if((x>148&&x<192)||(x>458&&x<502))continue;pn(.9,1.2,R(CL),X(x),3.1,Z(150)+.03,0);if(x<286||x>392)pn(.9,1.2,R(CL),X(x),3.1,Z(538)-.03,Math.PI)}
function tx(L,bg,fg,w,h,fs,x,y,z,r){const c=document.createElement('canvas');c.width=256;c.height=Math.round(256*h/w);const g=c.getContext('2d');g.fillStyle=bg;g.fillRect(0,0,256,c.height);g.fillStyle=fg;g.font='bold '+fs+'px Fredoka,sans-serif';g.textAlign='center';g.textBaseline='middle';L.forEach((s,i)=>g.fillText(s,128,c.height*(i+.5)/L.length));
const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:new T.CanvasTexture(c)}));m.position.set(x,y,z);m.rotation.y=r;sc.add(m)}
function flag(x,y,z,r){const c=document.createElement('canvas');c.width=256;c.height=128;const g=c.getContext('2d'),s=128/14;for(let i=0;i<14;i++){g.fillStyle=i%2?'#ffffff':'#cc0001';g.fillRect(0,i*s,256,s+1)}
g.fillStyle='#010066';g.fillRect(0,0,128,s*8);g.fillStyle='#ffcc00';g.beginPath();g.arc(48,s*4,22,0,7);g.fill();g.fillStyle='#010066';g.beginPath();g.arc(56,s*4,18,0,7);g.fill();g.fillStyle='#ffcc00';g.beginPath();g.arc(84,s*4,9,0,7);g.fill();
const m=new T.Mesh(new T.PlaneGeometry(2.2,1.1),new T.MeshBasicMaterial({map:new T.CanvasTexture(c)}));m.position.set(x,y,z);m.rotation.y=r;sc.add(m)}
flag(X(292),2.8,Z(538)-.04,Math.PI);tx(['RUKUN NEGARA','Kepercayaan kepada Tuhan','Kesetiaan kepada Raja dan Negara','Keluhuran Perlembagaan','Kedaulatan Undang-undang','Kesopanan dan Kesusilaan'],'#1c2f6b','#ffffff',2,1.5,12,X(380),2.75,Z(538)-.04,Math.PI);
const ez=Z(538)-.06,ex=X(336);pn(2.9,3.1,'#f5f5f5',ex,1.55,ez,Math.PI);[-.68,.68].forEach(o=>{pn(1.25,2.8,'#7a5236',ex+o,1.4,ez-.02,Math.PI);pn(.8,1.1,'#a9d8f0',ex+o,1.95,ez-.04,Math.PI);pn(.08,.4,'#e8c53a',ex+o*.12,1.35,ez-.04,Math.PI)});tx(['PINTU MASUK'],'#1c2f6b','#ffffff',2.4,.6,34,ex,3.55,ez-.04,Math.PI);
function bench(px,py,nx,nz,len,k){const[x,z]=WP(px,py,nx,nz,.35),w=nx?.5:len,d=nx?len:.5,tx_=Math.abs(nz),tz=Math.abs(nx);box3(x,z,w,d,.08,'#a9744a',.42);[-1,1].forEach(s=>box3(x+tx_*s*(len/2-.2),z+tz*s*(len/2-.2),.12,.12,.42,'#5a5f69'));
for(let i=0;i<k;i++){const o=(i-(k-1)/2)*.9,m=npc('murid');m.position.set(x+tx_*o+nx*.05,.04,z+tz*o+nz*.05);m.rotation.y=Math.atan2(nx,nz);m.userData.legs.forEach(l=>l.rotation.x=-Math.PI/2);sc.add(m)}
cols.push({x0:x-(nx?.5:len/2),x1:x+(nx?.5:len/2),z0:z-(nx?len/2:.5),z1:z+(nx?len/2:.5)})}
bench(100,440,1,0,2.2,2);bench(580,250,-1,0,2.2,1);bench(215,362,0,-1,2.2,2);
function rb(px,py,nx,nz,c){const[x,z]=WP(px,py,nx,nz,.4),b=new T.Mesh(new T.CylinderGeometry(.27,.22,.7,6),mat(c));b.position.set(x,.35,z);b.castShadow=true;sc.add(b);box3(x,z,.6,.6,.08,'#222222',.7);solid(x,z,.28);BN.push({x:x+nx*.7,z:z+nz*.7,bx:x,bz:z,k:{'#3b7fd0':0,'#e8923a':1,'#7a5236':2}[c]})}
[['#3b7fd0',466],['#e8923a',474],['#7a5236',482]].forEach(a=>rb(354,a[1],-1,0,a[0]));
[['#3b7fd0',222],['#e8923a',230],['#7a5236',238]].forEach(a=>rb(318,a[1],1,0,a[0])); /* Round 10g: second set on the left wall of the central corridor */
const OB=[],BO=[];
function ob(t,px,py){const x=X(px),z=Z(py),g=new T.Group();
if(t=='banana'){bx(g,.46,.07,.15,'#ffd23f',0,.04,0);const b=bx(g,.16,.07,.14,'#ffd23f',.26,.04,.07);b.rotation.y=.6;bx(g,.08,.08,.1,'#7a5236',-.25,.04,0);g.rotation.y=rnd(0,6)}
else if(t=='litter'){[[0,0,.16,'#f4f4f4'],[.22,.1,.12,'#cfd8e3'],[-.2,.12,.13,'#f4f4f4']].forEach(a=>{const m=new T.Mesh(new T.IcosahedronGeometry(a[2],0),mat(a[3]));m.position.set(a[0],a[2],a[1]);g.add(m)})}
else{const a=bx(g,.5,.75,.05,'#ffd23f',0,.37,-.12),b=bx(g,.5,.75,.05,'#ffd23f',0,.37,.12);a.rotation.x=.3;b.rotation.x=-.3;bx(g,.3,.1,.07,'#c8293a',0,.66,0);solid(x,z,.35)}
g.position.set(x,0,z);sc.add(g);OB.push({t,x,z,m:g,cd:0})}
[['banana',336,370],['banana',400,168],['banana',200,520],['banana',562,260],['banana',460,344],['sign',336,230],['sign',300,344],['sign',500,520]].forEach(a=>ob(...a));
[[135,168],[548,520],[118,420],[562,215],[336,290]].forEach(a=>{const m=new T.Mesh(new T.OctahedronGeometry(.32,0),new T.MeshBasicMaterial({color:'#ffc400'}));m.scale.y=1.4;m.position.set(X(a[0]),.9,Z(a[1]));sc.add(m);BO.push({x:X(a[0]),z:Z(a[1]),m,cd:0})});
function mkItem(ty){const g=new T.Group(),a=(geo,c,x,y,z)=>{const m=new T.Mesh(geo,mat(c));m.position.set(x,y,z);m.castShadow=true;g.add(m);return m};
if(ty==0){a(new T.IcosahedronGeometry(.15,0),'#f4f4f4',0,.15,0);a(new T.IcosahedronGeometry(.09,0),'#cfe3ff',.1,.2,.05)}
else if(ty==1){a(new T.CylinderGeometry(.07,.07,.3,8),'#ffe0b8',0,.15,0);a(new T.CylinderGeometry(.04,.04,.07,8),'#e8730c',0,.33,0)}
else if(ty==2){a(new T.CylinderGeometry(.075,.075,.2,8),'#7a4a24',0,.1,0);a(new T.CylinderGeometry(.035,.035,.14,8),'#7a4a24',0,.27,0);a(new T.CylinderGeometry(.045,.045,.03,8),'#c9a227',0,.36,0)}
else{a(new T.BoxGeometry(.14,.07,.07),'#ff5fa2',0,.05,0);a(new T.ConeGeometry(.05,.08,4),'#ffd23f',.11,.05,0).rotation.z=-Math.PI/2;a(new T.ConeGeometry(.05,.08,4),'#ffd23f',-.11,.05,0).rotation.z=Math.PI/2}
return g}
const NM=['Kertas','Botol plastik','Botol kaca','Bungkus gula-gula'],HM=[0,1,2,3].map(t=>{const g=mkItem(t);g.visible=false;g.scale.setScalar(1.15);g.position.set(0,-.42,.12);return g});
const SM=[[340,400],[230,168],[230,344],[450,520],[118,450],[330,200]].map((a,i)=>{const x=X(a[0]),z=Z(a[1]),k=[0,1,2,3].map(t=>{const g=mkItem(t),l=t==1||t==2;g.scale.setScalar(1.5);g.position.set(x,l?.11:0,z);g.rotation.set(0,rnd(0,6),l?Math.PI/2:0);g.visible=t==i%4;sc.add(g);return g});return{x,z,ty:i%4,cd:0,k}});
[['KERTAS','#3b7fd0',466],['PLASTIK','#e8923a',474],['KACA','#7a5236',482]].forEach(a=>tx([a[0]],a[1],'#ffffff',.8,.3,22,X(354)-.1,1.15,Z(a[2]),-Math.PI/2));
[['KERTAS','#3b7fd0',222],['PLASTIK','#e8923a',230],['KACA','#7a5236',238]].forEach(a=>tx([a[0]],a[1],'#ffffff',.8,.3,22,X(318)+.1,1.15,Z(a[2]),Math.PI/2)); /* Round 10g */
function pick(s){carry=s.ty;s.k.forEach(g=>g.visible=false);s.cd=40;HM.forEach((g,i)=>g.visible=i==carry);say('Dapat '+NM[carry].toLowerCase()+'!');tone(500,0,.08,'sine',.12)}
function throwIt(b){const H=['Kertas masuk tong biru.','Botol plastik masuk tong oren.','Botol kaca masuk tong coklat.','Bungkus gula-gula masuk tong biasa.'];
if(b.k!=carry){say('Salah tong! '+H[carry]);tone(200,0,.3,'sawtooth',.08);return}
SRA.bin();const c=carry;carry=-1;HM.forEach(g=>g.visible=false);const g=mkItem(c);g.scale.setScalar(1.2);sc.add(g);fly={g,t:0,x0:P.x,z0:P.z,x1:b.bx,z1:b.bz};
say(R(['Bagus!','Pandai!','Terima kasih, kawan!']));tone(600,.2,.1,'sine',.15);tone(800,.3,.12,'sine',.15);
cur.s[c]++;save();
if(cur.s[0]+cur.s[1]+cur.s[2]+cur.s[3]==12)award('sampah12','Pelajar Prihatin','Anda sudah membuang 12 sampah dengan betul.')}
const sr=new T.Mesh(new T.CircleGeometry(1.1,24),new T.MeshBasicMaterial({color:'#ffd23f'}));sr.rotation.x=-Math.PI/2;sr.position.set(X(336),.05,Z(520));sc.add(sr);
/* Round 10e: Perpustakaan (index 1) now sits in the big top-left block, Makmal Sains (index 0) in the smaller bottom-right block; indexes and saves unchanged */
const DR=[['MAKMAL SAINS','#6f63c7',452,362,0,-1,'Makmal Sains'],['PERPUSTAKAAN','#6f63c7',248,186,0,-1,'Perpustakaan'],['MATH','#2f9d86',354,256,-1,0,'Math'],['ENGLISH','#2f9d86',318,432,1,0,'English'],['PADANG BALAPAN','#d98f2b',170,110,0,1,'Padang Balapan'],['KANTIN','#c9553f',480,110,0,1,'Kantin'],['PEJABAT','#9a3c4d',387,502,0,1,'Pejabat']]; /* index 6 = Pejabat: Round 9g, locked door only, never a class target */
DR.forEach(d=>{const n=d[0],x=X(d[2]),z=Z(d[3]),nx=d[4],nz=d[5],ry=Math.atan2(nx,nz);
const GDC={PERPUSTAKAAN:'#3d3578',PEJABAT:'#5a1f2e',KANTIN:'#7a2e24','MAKMAL SAINS':'#3b5368'}; /* Round 10g: these doors are glass double doors (gdoor in chars.js), the rest stay wooden; Round 10i3: Makmal Sains added, steel-blue frame (same colour as the inside door in js/kelas.js) */
if(GDC[n])gdoor(sc,x,z,ry,2.2,2.3,GDC[n],.05);else if(!n.startsWith('PADANG')){const tx=nz,tz=-nx,pe=(w,h,c,o,y,e)=>pn(w,h,c,x+nx*e+tx*o,y,z+nz*e+tz*o,ry);pe(1.5,2.3,'#d9b184',0,1.15,.06);[-1,1].forEach(s=>pe(.1,2.3,'#7a5236',s*.8,1.15,.08));pe(.14,.14,'#444444',-.55,1.1,.1)} /* Round 10d2: the classroom ENTRANCE door look (tan panel, dark brown side posts, dark handle) */
const cn=document.createElement('canvas');cn.width=256;cn.height=64;const g=cn.getContext('2d');g.fillStyle=d[1];g.fillRect(0,0,256,64);g.fillStyle='#fff';g.font='bold '+(n.length>10?24:34)+'px Fredoka,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(n,128,34);
const sg=new T.Mesh(new T.PlaneGeometry(3.6,.9),new T.MeshBasicMaterial({map:new T.CanvasTexture(cn)}));sg.position.set(x+nx*.06,n.startsWith('PADANG')?3.25:2.8,z+nz*.06);sg.rotation.y=ry;sc.add(sg);
d.push(x+nx*1.2,z+nz*1.2)});
function clock(x,z,r){const g=new T.Group(),mk=(rd,c,zz)=>{const m=new T.Mesh(new T.CircleGeometry(rd,16),new T.MeshBasicMaterial({color:c}));m.position.z=zz;g.add(m)},hd=(w,h,a,b)=>{const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({color:'#222222'}));m.position.set(a,b,b?.04:.05);g.add(m)};mk(.36,'#2b2f36',0);mk(.3,'#ffffff',.02);hd(.04,.2,0,.1);hd(.16,.04,.08,0);g.position.set(x,3.55,z);g.rotation.y=r;sc.add(g)}
DR.slice(0,4).concat([DR[6]]).forEach(d=>clock(X(d[2])+d[4]*.12,Z(d[3])+d[5]*.12,Math.atan2(d[4],d[5])));
/* Round 10b3: the four brown side doors are the BACK DOORS of the classes (BK = [room DR index, DD index]; BKN = outward direction; BP = the red pad that turns green after the ritual). Locked until all vases are found. */
const BP=[],BK=[[0,3],[1,0],[2,1],[3,2]],BKN=[[0,1],[0,-1],[0,-1],[0,1]];
const DD=[[280,326,0,1],[420,186,0,-1],[270,362,0,-1],[530,502,0,1]].map(d=>{const x=X(d[0]),z=Z(d[1]),nx=d[2],nz=d[3],r=Math.atan2(nx,nz);{const tx=nz,tz=-nx,pe=(w,h,c,o,y,e)=>pn(w,h,c,x+nx*e+tx*o,y,z+nz*e+tz*o,r);pe(1.6,2.4,'#8a5a3a',0,1.2,.06);[-1,1].forEach(s=>pe(.12,2.5,'#5a3a22',s*.86,1.25,.08));pe(1.84,.14,'#5a3a22',0,2.45,.08);pe(.5,.9,'#6f4a2c',0,1.2,.09);const pd=new T.Mesh(new T.PlaneGeometry(.22,.3),new T.MeshBasicMaterial({color:'#444444'}));pd.position.set(x+nx*.12+tx*.55,1.1,z+nz*.12+tz*.55);pd.rotation.y=r;sc.add(pd);BP.push(pd)}return[x+nx*1.2,z+nz*1.2]});
/* Round 10b3: 4 of the 6 outside vases (the other two are in the Kantin and the Padang): by the boys toilet, by the girls toilet, and two quiet corners. Silent: no hint, E = key click (vaseHit in core.js). */
const VS=[[120,180,'boys'],[575.5,534.5,'girls'],[349,286,'spine'],[567,357.5,'east']].map(a=>{const x=X(a[0]),z=Z(a[1]);mkVase(sc,x,z);cols.push({x0:x-.4,x1:x+.4,z0:z-.4,z1:z+.4});return{x,z,id:'w_'+a[2]}});
/* Round 9g: Pejabat front. A teacher stands beside the door, a doormat marks the spot in front of it (CNS = the caning spot, used in Round 13) */
const CANE_TEST=true; /* Round 9g test: E at the Pejabat door plays the cane scene. Set to false to switch it off. */
const PJX=X(387),PJZ=Z(502),CNS=[PJX,PJZ+.9];let TCH=null,CANE=null;
(()=>{const mt=new T.Mesh(new T.PlaneGeometry(3.4,1.3),mat('#a33b4b'));mt.rotation.x=-Math.PI/2;mt.position.set(PJX,.025,PJZ+1.25);mt.receiveShadow=true;sc.add(mt);
const mi=new T.Mesh(new T.PlaneGeometry(3.0,.9),mat('#d9a441'));mi.rotation.x=-Math.PI/2;mi.position.set(PJX,.03,PJZ+1.25);sc.add(mi);
const g=npc('guru','m');g.position.set(X(412),0,PJZ+.9);g.rotation.y=0;sc.add(g);solid(X(412),PJZ+.9,.35);TCH=g;
CANE=new T.Mesh(new T.CylinderGeometry(.025,.025,.6,6),mat('#7a4a21'));CANE.position.set(0,-.72,.04); /* along the arm, so it swings down with the arm */CANE.visible=false;g.userData.arms[1].add(CANE)})();
const hit=(x,z,r)=>cols.some(c=>x+r>c.x0&&x-r<c.x1&&z+r>c.z0&&z-r<c.z1);
const GC=.5,GX=-32,GZ=-38,GW=128,GH=128,bk=new Uint8Array(GW*GH),N8=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
for(let j=0;j<GH;j++)for(let i=0;i<GW;i++)bk[j*GW+i]=hit(GX+(i+.5)*GC,GZ+(j+.5)*GC,.3)?1:0;
const cell=(x,z)=>[Math.floor((x-GX)/GC),Math.floor((z-GZ)/GC)];
function flood(){if(tgt<0){dist=null;return}const d=DR[tgt],[ti,tj]=cell(d[7],d[8]);dist=new Int16Array(GW*GH).fill(-1);const q=[ti+tj*GW];dist[q[0]]=0;
for(let h=0;h<q.length;h++){const c=q[h],i=c%GW,j=c/GW|0;for(let k=0;k<4;k++){const a=i+N8[k][0],b=j+N8[k][1];if(a<0||b<0||a>=GW||b>=GH)continue;const n=b*GW+a;if(dist[n]<0&&!bk[n]){dist[n]=dist[c]+1;q.push(n)}}}}
function path(n){const r=[];if(!dist)return r;const[ci,cj]=cell(P.x,P.z);let i=-1,j=-1;for(const[di,dj]of[[0,0]].concat(N8)){const a=ci+di,b=cj+dj;if(a>=0&&b>=0&&a<GW&&b<GH&&dist[b*GW+a]>=0){i=a;j=b;break}}if(i<0)return r;let c=j*GW+i;
while(dist[c]>0&&r.length<n){let best=c,bi=i,bj=j;for(const[di,dj]of N8){const a=i+di,b=j+dj;if(a<0||b<0||a>=GW||b>=GH)continue;const m=b*GW+a;if(dist[m]>=0&&dist[m]<dist[best]){best=m;bi=a;bj=b}}if(best==c)break;c=best;i=bi;j=bj;r.push([GX+(i+.5)*GC,GZ+(j+.5)*GC])}return r}
blk(62,146,92,190,4.2,WC,0);blk(588,498,622,546,4.2,WC,0);
function toilet(px,py,nx,nz,lab,col,girl){const x=X(px),z=Z(py),r=Math.atan2(nx,nz);pn(1.7,2.3,'#5a3d2b',x+nx*.06,1.15,z+nz*.06,r);pn(.12,.3,'#e8c53a',x+nx*.1+nz*.55,1.1,z+nz*.1-nx*.55,r);

const g=new T.Group(),mk=(geo,c,y,zz)=>{const m=new T.Mesh(geo,new T.MeshBasicMaterial({color:c}));m.position.set(0,y,zz);g.add(m);return m};
mk(new T.CircleGeometry(.62,24),col,2.95,0);mk(new T.CircleGeometry(.12,14),'#ffffff',3.15,.02);
if(girl)mk(new T.CircleGeometry(.3,3),'#ffffff',2.82,.02).rotation.z=Math.PI/2;else mk(new T.PlaneGeometry(.24,.4),'#ffffff',2.8,.02);
g.position.set(x+nx*.08,0,z+nz*.08);g.rotation.y=r;sc.add(g);return[x+nx*1.2,z+nz*1.2]}
const TD=[toilet(100,168,1,0,'LELAKI','#2f6fd0',0).concat('Tandas Lelaki','m'),toilet(580,520,-1,0,'PEREMPUAN','#d6568f',1).concat('Tandas Perempuan','f')];
sc.traverse(o=>{if(o.isMesh&&/Plane|Circle/.test(o.geometry.type)&&o.rotation.x!=-Math.PI/2){const m=o.material;m.polygonOffset=true;m.polygonOffsetFactor=-2;m.polygonOffsetUnits=-2}});
/* Round 8a: see-through walls. Every wall or roof piece (WL) fades together with what hangs on it (posters, signs, clocks, stripes, windows)
   while it is between the camera and the player. The test and the fading run in fades() in world.js. */
(()=>{const E=.3,wm=new Set(WL.map(w=>w.m)),sets=WL.map(w=>({boxes:[w.b],meshes:[w.m],side:[null],op:1,tg:1}));
 sc.children.slice().forEach(c=>{if(wm.has(c)||c.isLight||c===cam)return;const p=c.position;
  if(c.isMesh&&(c.rotation.x==-Math.PI/2||/Octahedron/.test(c.geometry.type)))return; /* floors, ground and gems stay solid */
  const k=WL.findIndex(w=>p.x>=w.b[0]-E&&p.x<=w.b[1]+E&&p.z>=w.b[4]-E&&p.z<=w.b[5]+E&&p.y>=w.b[2]-.05&&p.y<=w.b[3]+.05);if(k<0)return;
  const w=WL[k].b,ox=Math.max(w[0]-p.x,p.x-w[1]),oz=Math.max(w[4]-p.z,p.z-w[5]),ax=ox>=oz?'x':'z',sg=ax=='x'?Math.sign(p.x-(w[0]+w[1])/2)||1:Math.sign(p.z-(w[4]+w[5])/2)||1,mid=ax=='x'?(w[0]+w[1])/2:(w[4]+w[5])/2;const off=ax=='x'?(sg>0?p.x-w[1]:w[0]-p.x):(sg>0?p.z-w[5]:w[4]-p.z),q=Math.min(400,Math.round(Math.max(0,off)*100)); /* q = how far the decor sits off the wall face, in cm: its layer */
  c.traverse(o=>{if(o.isMesh){sets[k].meshes.push(o);sets[k].side.push({ax,sg,mid,q})}})});
 /* Round 8b2: o and sd are kept so fades() can draw back to front: what is behind the wall first, then the wall, then what is in front of it */
 sets.forEach(f=>{f.m=f.meshes.map((o,j)=>{const mt=Array.isArray(o.material)?o.material[0]:o.material,cl=mt.clone();o.material=cl;return{mt:cl,b:cl.opacity,tr:cl.transparent,dw:cl.depthWrite,o,sd:f.side[j]}});delete f.meshes;delete f.side;FDS.push(f)})})();
