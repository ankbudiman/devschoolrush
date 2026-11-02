/* Round 14b: prefect chaser markers in the school world (ring, "!" bubble, minimap triangle, beep gap). Run: node tools/test-prefmark.js */
const fs=require('fs'),path=require('path');let pass=0,fail=0;const ok=(c,m)=>{if(c)pass++;else{fail++;console.log('FAIL',m)}};
const rd=f=>fs.readFileSync(path.join(__dirname,'..',f),'utf8');
const st=rd('js/story.js'),wd=rd('js/world.js'),lg=rd('js/luar-logic.js');
const i=st.indexOf('let pfRing=null'),j=st.indexOf('window.storyMM=');const jend=st.indexOf('\n',j);
ok(i>0&&j>i&&jend>j,'marker block found in js/story.js');
/* run the marker block against stubs */
const els=[];const doc={createElement(){const e={style:{},textContent:'',id:''};els.push(e);return e},body:{appendChild(){}}};
class V3{set(x,y,z){this.x=x;this.y=y;this.z=z;return this}project(){this.x=this._px;this.y=this._py||0;this.z=this._pz;return this}}
const meshes=[];class Mesh{constructor(){this.position={x:0,y:0,z:0,set(x,y,z){this.x=x;this.y=y;this.z=z}};this.rotation={};this.scale={v:0,setScalar(v){this.v=v}};this.visible=false;meshes.push(this)}}
const T={Mesh,RingGeometry:function(){},MeshBasicMaterial:function(){},DoubleSide:2,Vector3:class extends V3{}};
const added=[];const sc={add(m){added.push(m)}},cam={},cv={clientWidth:400,clientHeight:800};
const code=st.slice(i,jend)+';return{pfOn,pfOff,storyMM:null,set(s,p){ST=s;ph=p;},vec(){return pfV}}';
let ST='late',ph={x:3,z:4,m:{visible:true}};const MODE='story';
const win={};const mod=new Function('T','sc','cam','cv','document','MODE','ph0','ST0','window','let st=ST0,ph=ph0;'+code.replace('set(s,p){ST=s;ph=p;}','set(s,p){st=s;ph=p;}'))(T,sc,cam,cv,doc,'story',ph,'late',win);
mod.pfOn(1);const ring=meshes[0],bub=els[0];
ok(meshes.length===1&&added.length===1&&ring.visible&&ring.position.x===3&&ring.position.z===4&&ring.position.y===.06,'ring created once, under the prefect feet');
ok(bub.id==='pfb'&&bub.textContent==='!','bubble has id pfb and shows "!"');
mod.vec()._px=0;mod.vec()._pz=.5;mod.pfOn(1);ok(bub.style.display==='block'&&bub.style.left==='200px'&&bub.style.top==='400px','bubble placed at the projected spot');
mod.vec()._pz=1.2;mod.pfOn(1);ok(bub.style.display==='none','bubble hidden when the prefect is behind the camera');
mod.pfOn(1);ok(meshes.length===1,'no second ring on later frames');
mod.pfOff();ok(!ring.visible&&bub.style.display==='none','pfOff hides ring and bubble');
const log=[];const mg={fillStyle:'',strokeStyle:'',lineWidth:0,beginPath(){log.push('b')},moveTo(){log.push('m')},lineTo(){log.push('l')},closePath(){},fill(){log.push('f')},stroke(){log.push('s')}};
mod.set('late',{x:1,z:1,m:{visible:true}});win.storyMM(mg,(x,z)=>[x*10,z*10]);ok(log.join('')==='bmllfs'&&mg.fillStyle==='#e02424','minimap: red triangle while late and the prefect is visible');
log.length=0;mod.set('idle',{x:1,z:1,m:{visible:true}});win.storyMM(mg,(x,z)=>[0,0]);ok(log.length===0,'minimap: no triangle when not chasing');
mod.set('late',{x:1,z:1,m:{visible:false}});win.storyMM(mg,(x,z)=>[0,0]);ok(log.length===0,'minimap: no triangle when the prefect is hidden');
mod.set('late',null);win.storyMM(mg,(x,z)=>[0,0]);ok(log.length===0,'minimap: no triangle before the prefect exists');
/* beep gap = same numbers as the outside guard */
const LUC=new Function(lg+';return LUC')();const cf=st.match(/PGAP:([\d.]+),PGAPMAX:([\d.]+),PGAPK:([\d.]+)/);
ok(!!cf&&+cf[1]===LUC.CH.gap&&+cf[2]===LUC.CH.gapMax&&+cf[3]===.045,'beep gap constants equal the outside guard (LUC.CH gap/gapMax, .045 per metre)');
ok(/Math\.hypot\(ph\.x-P\.x,ph\.z-P\.z\)\*CFG\.PGAPK/.test(st)&&/tone\(740,0,\.07,'square',\.07\)/.test(st),'prefect beep uses distance and the same tone as the guard');
/* wiring */
ok(/ph\.d-=dt;[^}]*pfOn\(t\);pfBt=0;return/.test(st),'markers also show during the short wait before the prefect runs (no beep yet)');
ok(/function hidePref\(\)\{if\(ph\)ph\.m\.visible=false;pfOff\(\)\}/.test(st),'hidePref also hides the markers (class, caught, end of day)');
ok(/storyTick=function\(dt,t\)\{if\(MODE!='story'\)return;if\(halt\)\{pfOff\(\);return\}/.test(st),'markers hidden while the game is halted');
ok(/if\(window\.storyMM\)storyMM\(mg,f\);[^\n]*\nconst a=f\(P\.x,P\.z\)/.test(wd),'world.js drawMM calls storyMM before the player arrow');
ok((st.match(/\bpfb\b/g)||[]).length>=1&&!/id=.pfb./.test(rd('world.html')),'id pfb is unused elsewhere');
console.log(fail?fail+' FAILED, '+pass+' passed':'all '+pass+' checks passed');process.exit(fail?1:0);
