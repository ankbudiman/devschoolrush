const T=THREE,R=a=>a[Math.floor(Math.random()*a.length)],rnd=(a,b)=>a+Math.random()*(b-a),$=i=>document.getElementById(i);
const SK=['#b87a50','#8d5a3b','#a8693f','#c68a5a','#6e4328','#d9a57a','#f0c9a0'],HC=['#14161d','#14161d','#2a1d16','#3b2a1e','#5a3a22'],CL=['#e24b4b','#e8a33d','#3da36b','#4a86c8','#8a5bd0','#d6568f','#2e9aa8','#e7d24a'],S={mask:false};
let mt=0,halt=true,au=null;
const LS={get(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const NP=()=>({drinks:0,s:[0,0,0,0],slip:0,gem:0,badges:{}});
let cur=NP();
let PF=LS.get('sk_profiles',{}),rc=null,frm='vm';{const k=LS.get('sk_cur',null);if(k&&PF[k])cur=PF[k]}
const SET=Object.assign({snd:1,vol:.8,ts:1,lh:0,cf:1,lo:0,mus:1,mvol:.6},LS.get('sk_set',{}));
function save(){LS.set('sk_profiles',PF)}
const BD=[['air8','Tabiat Sihat','Minum air 8 kali'],['sampah12','Pelajar Prihatin','Buang 12 sampah dengan betul'],['slip5','Kaki Licin','Terpijak kulit pisang 5 kali'],['gem5','Laju Kilat','Ambil 5 gem laju']],
TIPS=['Jangan pijak kulit pisang! Licin tau.','Tong biru untuk kertas, tong oren untuk plastik.','Minum air, badan segar!','Wuuu, kejar loceng!','Lompat! Sampah pun boleh dielak.','Botol kaca masuk tong coklat.','Prefect tengah perhati... senyum sikit.','Hati-hati kat selekoh tu!','Cikgu dah masuk kelas... cepat sikit!','Pengawas tengah ronda, buat-buat rajin.','Loceng berbunyi, kaki jangan malas!','Jangan lewat, nanti kena kejar dengan pengawas.'];
function toast(t,ms){const m=$('msg');m.textContent=t;m.style.display='block';clearTimeout(mt);mt=setTimeout(()=>m.style.display='none',ms||2600)}
function award(id,t,d){if(cur.badges[id])return;cur.badges[id]=Date.now();save();toast('Lencana baharu: '+t+'! '+d,3800);[0,1,2].forEach(i=>tone(600+i*150,i*.12,.15,'triangle',.12))}
function loading(fn){halt=true;$('tip').textContent=R(TIPS);$('ld').style.display='flex';setTimeout(()=>{$('ld').style.display='none';fn()},1100)}
const curKey=()=>LS.get('sk_cur',null);
function actx(){au=au||new (window.AudioContext||window.webkitAudioContext)();if(au.state=='suspended')au.resume();return au}
['pointerdown','touchend','keydown'].forEach(e=>addEventListener(e,()=>{try{actx()}catch(x){}},{passive:true}));
function bellSound(secs){if(!SET.snd)return;try{const a=actx(),v=SET.snd*SET.vol;if(v<=0)return;const d=secs||2.2,t0=a.currentTime+.03,m=a.createGain(),tr=a.createGain(),lf=a.createOscillator(),lg=a.createGain();
m.gain.setValueAtTime(.0001,t0);m.gain.exponentialRampToValueAtTime(.5*v,t0+.02);m.gain.setValueAtTime(.5*v,t0+d*.6);m.gain.exponentialRampToValueAtTime(.0001,t0+d);
tr.gain.value=.55;lf.frequency.value=17;lg.gain.value=.45;lf.connect(lg);lg.connect(tr.gain);tr.connect(m);m.connect(a.destination);lf.start(t0);lf.stop(t0+d+.05);
[[1050,1,'triangle'],[2440,.55,'sine'],[3880,.3,'sine'],[5360,.16,'sine']].forEach(p=>{const o=a.createOscillator(),g=a.createGain();o.type=p[2];o.frequency.value=p[0];g.gain.value=p[1];o.connect(g);g.connect(tr);o.start(t0);o.stop(t0+d+.05)})}catch(e){}}
if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
function tone(f,t0,d,ty,v){try{au=actx();const o=au.createOscillator(),g=au.createGain(),t=au.currentTime+t0;o.type=ty||'sine';o.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(Math.max(.0001,(v||.15)*SET.snd*SET.vol),t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(au.destination);o.start(t);o.stop(t+d)}catch(e){}}
const la=(a,b,k)=>a+(((b-a+Math.PI*3)%(Math.PI*2))-Math.PI)*k;
/* Round 6: back-button helpers (index.html and world.html). Not used inside the chat preview iframe */
const SR_IFR=!!(window.parent&&window.parent!==window);
let SR_TRAP=0;function backKeep(){try{history.pushState({sr:1},'');SR_TRAP=1}catch(e){}}
function nav(to){const p=window.parent;if(p&&p!==window&&p.__sr){p.__sr(to);return}
 /* replace, not push, so the history never keeps stale game pages; if a back-trap entry was added, step back over it first */
 const go=()=>location.replace(to+'.html');if(SR_TRAP){SR_TRAP=0;addEventListener('popstate',go,{once:true});history.back();setTimeout(go,400)}else go()}
