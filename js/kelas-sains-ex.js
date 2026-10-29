/* Round 10k: Sains, station Stesen Eksperimen = Penyiasatan Saintifik (Sukar). Screen code; data + logic are in js/kelas-sains-ex-data.js, diagrams in js/kelas-sains-ex-art.js.
   Same API as QZ / SP / SUS / SAP / SAM: open(opt), close(), back(), isOpen(). Root id #sainsex, every class starts with xe (global names SAE*, SAEL, SAEC, SAED). Tap only (no drag).
   Calls opt.onDone({sc,raw,g}) when the results screen shows (the Sains door rule and class grade live in js/kelas.js). */
const SAE=(()=>{
const CSS=`#sainsex{position:fixed;left:0;right:0;top:0;height:100%;z-index:60;display:none;flex-direction:column;gap:clamp(6px,1.5vmin,12px);box-sizing:border-box;padding:max(10px,env(safe-area-inset-top)) max(14px,env(safe-area-inset-right)) max(10px,env(safe-area-inset-bottom)) max(14px,env(safe-area-inset-left));background:#2e4a4f;color:#1c2f6b;font-family:Fredoka,sans-serif;overflow:hidden}
#sainsex *{box-sizing:border-box}#sainsex button{font-family:inherit}#sainsex button:focus-visible{outline:4px solid #ff9f1c;outline-offset:2px}
@media (prefers-reduced-motion:reduce){#sainsex *{animation:none!important;transition:none!important}}
#sainsex .xeh{display:flex;align-items:center;justify-content:space-between;gap:8px;flex:0 0 auto;font-size:clamp(13px,2.8vmin,20px);font-weight:600;color:#fff}
#sainsex .xepl{background:#fff;border:2px solid #9db6dc;color:#1c2f6b;border-radius:999px;padding:.25em .9em;font-size:1em;font-weight:600;cursor:pointer;width:max-content;flex:0 0 auto}
#sainsex .xex{flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:clamp(6px,1.5vmin,12px);background:#f7f8f4;border:clamp(5px,1.2vmin,10px) solid #2b2b2b;border-radius:14px;padding:clamp(8px,2vmin,18px);overflow:auto}
#sainsex .xex>*{flex-shrink:0}#sainsex .xet{font-size:clamp(17px,4vmin,30px);font-weight:700;color:#2a49a8}#sainsex .xep{font-size:clamp(12px,2.8vmin,20px);font-weight:600}
#sainsex .xel{font-size:clamp(11px,2.3vmin,15px);font-weight:700;opacity:.75;letter-spacing:.04em}
#sainsex .xew{display:flex;flex-direction:column;gap:clamp(6px,1.5vmin,12px);align-items:stretch}
#sainsex .xed{position:relative;width:min(100%,520px);align-self:center;aspect-ratio:300/190;flex:0 0 auto}#sainsex .xed .xes{position:absolute;inset:0}
#sainsex .xem{position:absolute;width:9%;min-width:24px;aspect-ratio:1/1;transform:translate(-50%,-50%);border-radius:50%;border:3px solid #2a49a8;background:#fff;color:#2a49a8;font-size:clamp(12px,2.8vmin,18px);font-weight:800;line-height:1;padding:0;cursor:pointer;display:flex;align-items:center;justify-content:center}
#sainsex .xem.on{background:#e4edff}#sainsex .xem.act{background:#ffd23f;border-color:#b58a00;color:#3a2a00}#sainsex .xem.ok{border-color:#2f9e5b;background:#e1f8e8;color:#14501f}#sainsex .xem.bad{border-color:#d1473f;background:#ffe7e4;color:#9a2b24}#sainsex .xem:disabled{cursor:default}
#sainsex .xes2{display:flex;flex-direction:column;gap:clamp(5px,1.2vmin,10px);min-width:0}
#sainsex .xer .xei{width:clamp(26px,5.4vmin,36px);height:clamp(26px,5.4vmin,36px)}#sainsex .xer{display:flex;align-items:center;gap:8px;width:100%;margin:0;padding:.2em .5em;border:2px solid #9db6dc;border-radius:10px;background:#fff;color:#1c2f6b;text-align:left;font-size:clamp(12px,2.6vmin,17px);font-weight:700;cursor:pointer;min-height:clamp(34px,6.4vmin,46px)}
#sainsex .xer.act{border-color:#b58a00;background:#fff6c9;box-shadow:0 0 0 3px #ffd23f}#sainsex .xer.ok{border-color:#2f9e5b;background:#e1f8e8}#sainsex .xer.bad{border-color:#d1473f;background:#ffe7e4}#sainsex .xer:disabled{cursor:default;color:#1c2f6b}
#sainsex .xen{flex:0 0 1.6em;height:1.6em;display:flex;align-items:center;justify-content:center;border-radius:50%;background:#2a49a8;color:#fff;font-size:.9em;font-weight:800}
#sainsex .xeb{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:1px}#sainsex .xec{font-size:.78em;opacity:.7;font-weight:700}#sainsex .xev{overflow-wrap:break-word}#sainsex .xev.em{opacity:.45;font-weight:600}#sainsex .xev.wr{text-decoration:line-through;opacity:.7}#sainsex .xea{color:#14501f;font-size:.9em}
#sainsex .xeq{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(5px,1.2vmin,9px);padding:8px;border-radius:10px;background:rgba(125,167,217,.14);border:2px solid rgba(125,167,217,.45)}
#sainsex .xei{display:block;flex:0 0 auto;width:clamp(28px,6.4vmin,40px);height:clamp(28px,6.4vmin,40px);pointer-events:none}#sainsex .xei svg{display:block;width:100%;height:100%}
#sainsex .xek{display:flex;align-items:center;justify-content:flex-start;gap:6px;text-align:left;margin:0;padding:.25em .4em;border:2px solid #9db6dc;border-radius:8px;background:#fff;color:#1c2f6b;font-size:clamp(11px,2.4vmin,16px);font-weight:700;line-height:1.15;box-shadow:1px 3px 0 rgba(28,47,107,.28);cursor:pointer;min-height:clamp(40px,7.2vmin,52px);overflow-wrap:break-word}#sainsex .xek.on{border-color:#2a49a8;background:#e4edff;box-shadow:0 0 0 3px #7da7d9}
#sainsex .xeo{display:flex;flex-direction:column;gap:clamp(6px,1.4vmin,10px)}#sainsex .xeo button{display:flex;align-items:center;gap:10px;width:100%;margin:0;padding:.5em .8em;border:2px solid #9db6dc;border-radius:12px;background:#fff;color:#1c2f6b;text-align:left;font-size:clamp(13px,3vmin,21px);font-weight:700;cursor:pointer;min-height:clamp(44px,8vmin,60px)}
#sainsex .xeo button i{font-style:normal;flex:0 0 1.7em;height:1.7em;display:flex;align-items:center;justify-content:center;border-radius:50%;background:#2a49a8;color:#fff;font-size:.9em}#sainsex .xeo button.on{border-color:#2a49a8;background:#e4edff;box-shadow:0 0 0 3px #7da7d9}#sainsex .xeo button.ok{border-color:#2f9e5b;background:#e1f8e8}#sainsex .xeo button.bad{border-color:#d1473f;background:#ffe7e4}#sainsex .xeo button:disabled{cursor:default;color:#1c2f6b}
#sainsex .xeqp{font-size:clamp(15px,3.6vmin,26px);font-weight:700}
#sainsex .xef{flex:0 0 auto;min-height:clamp(40px,8vmin,60px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;font-size:clamp(12px,2.8vmin,19px);font-weight:600;background:#fff;border:2px solid #b9d3ee;border-radius:12px;padding:.35em .8em;text-align:center}#sainsex .xef.ok{background:#e1f8e8;border-color:#2f9e5b}#sainsex .xef.no{background:#fff0dc;border-color:#e2893a}#sainsex .xef b{font-size:1.1em}
#sainsex .xeu{flex:0 0 auto;display:flex;gap:10px;justify-content:center;align-items:stretch;flex-wrap:wrap}
#sainsex .xebt{border:0;border-radius:999px;padding:.5em 1.2em;font-size:clamp(14px,3vmin,22px);font-weight:800;cursor:pointer;background:#ffd23f;color:#3a2a00;box-shadow:0 .14em 0 #b58a00;min-height:clamp(44px,9vmin,60px);width:max-content}#sainsex .xebt.sc{background:#fff;color:#1c2f6b;box-shadow:0 .14em 0 #9db6dc;border:2px solid #9db6dc}#sainsex .xebt.go{background:#3fd27a;color:#05361a;box-shadow:0 .14em 0 #1d8a4c}
#sainsex .xeci{flex:1 1 auto;min-height:0;overflow:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(6px,1.6vmin,12px);text-align:center;background:#f7f8f4;border:clamp(5px,1.2vmin,10px) solid #2b2b2b;border-radius:14px;padding:clamp(10px,2.4vmin,22px)}
#sainsex .xeci h2{margin:0;font-size:clamp(20px,5vmin,34px);color:#2a49a8}#sainsex .xebig{font-size:clamp(16px,3.8vmin,28px);font-weight:700}#sainsex .xesm{font-size:clamp(12px,2.7vmin,18px);font-weight:600;max-width:36em}
#sainsex .xegc{font-size:clamp(38px,11vmin,80px);font-weight:800;color:#2f9e5b;line-height:1}#sainsex .xegc.f{color:#d1473f}#sainsex .xewb{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
#sainsex .xerv{width:min(100%,520px);background:#fff;border:2px solid #b9d3ee;border-radius:12px;padding:.3em .7em;text-align:left}
#sainsex .xerr{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:.3em 0;border-bottom:1px solid #d6e4f5;font-size:clamp(12px,2.7vmin,18px)}#sainsex .xerr:last-child{border:0}#sainsex .xerr i{font-style:normal;font-weight:800;flex:0 0 auto;padding:.1em .6em;border-radius:99px;font-size:.9em;color:#fff;background:#2f9e5b}#sainsex .xerr i.no{background:#d1473f}
#sainsex .xecf{position:absolute;inset:0;z-index:5;background:rgba(20,30,70,.6);display:flex;align-items:center;justify-content:center;padding:20px}#sainsex .xecf>div{background:#fff;color:#1c2f6b;border:3px solid #7da7d9;border-radius:18px;padding:1.2em 1.4em;width:min(92vw,420px);text-align:center;font-size:clamp(14px,3vmin,22px);font-weight:600}#sainsex .xecf p{margin:0 0 .8em}
@media (min-width:700px) and (min-height:541px){#sainsex .xeq{grid-template-columns:repeat(4,minmax(0,1fr))}}
@media (orientation:landscape) and (max-height:540px){#sainsex{gap:5px;padding-top:max(6px,env(safe-area-inset-top));padding-bottom:max(6px,env(safe-area-inset-bottom))}#sainsex .xep{font-size:clamp(10px,3vh,14px)}#sainsex .xel{display:none}#sainsex .xet{font-size:clamp(14px,4vh,20px)}#sainsex .xex{gap:4px;padding:6px 10px}#sainsex .xew{flex-direction:row;align-items:flex-start}#sainsex .xed{flex:0 0 44%;width:44%;align-self:flex-start}#sainsex .xes2{flex:1 1 auto}#sainsex .xer{min-height:30px}#sainsex .xek{min-height:30px}#sainsex .xei{width:24px;height:24px}#sainsex .xer .xei{width:22px;height:22px}#sainsex .xef{min-height:30px;padding:.2em .6em}#sainsex .xeo button{min-height:36px;padding:.25em .7em}}`;
let root,S=null,opt={},scr='',el=null,keyOn=false,dlg=false;
const D=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
const FINAL={'A+':'Cemerlang! Anda mahir menjalankan penyiasatan saintifik.','A':'Sangat baik! Teruskan usaha.','B+':'Bagus! Anda semakin mahir.','B':'Usaha yang baik. Teruskan berlatih.','C':'Tahniah, anda lulus!'},FAILTXT='Jangan putus asa. Cuba lagi untuk menambah markah.';
const LET=['A','B','C'];
function bestTxt(){const r=cur&&cur.quiz&&cur.quiz[SAEC.key]&&cur.quiz[SAEC.key][SAEC.level];return r&&r.g?'Terbaik: '+r.best+'/'+QCFG.max+' · '+r.g:'Belum dimainkan'}
function build(){if(root)return;const st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);root=document.createElement('div');root.id='sainsex';document.body.appendChild(root)}
/* ---- screens ---- */
function intro(){scr='intro';el=null;S=null;root.innerHTML='';const h=D('div','xeh'),b=D('button','xepl','Kembali');b.onclick=close;h.append(b,D('span',null,'Stesen Eksperimen'));
 const c=D('div','xeci');c.append(D('h2',null,'Penyiasatan Saintifik'),D('div','xebig','Tahap: Sukar'),D('div','xesm','Ada 3 eksperimen: cahaya dan pokok, suhu dan ais, litar elektrik. Setiap eksperimen ada 2 bahagian. Bahagian 1: lengkapkan susunan eksperimen pada rajah. Pilih sekeping kad, kemudian pilih petak bernombor. Bahagian 2: pilih jawapan bagi 3 soalan. Setiap eksperimen 10 markah, jumlah 30 markah.'),D('div','xesm',bestTxt()));
 const w=D('div','xewb'),a=D('button','xebt go','Mula'),k=D('button','xebt sc','Tutup');a.onclick=start;k.onclick=close;w.append(a,k);c.append(w);root.append(h,c);a.focus()}
function start(){S=SAEL.newSession();cycle()}
function cycle(){scr='q';dlg=false;const x=SAEL.cur(S);root.innerHTML='';
 const h=D('div','xeh'),b=D('button','xepl','Kembali');b.onclick=ask;const hs=D('span');h.append(b,hs);
 const bd=D('div','xex'),ti=D('div','xet'),lb=D('div','xel'),pr=D('div','xep'),ct=D('div'),fb=D('div','xef');bd.append(ti,lb,pr,ct,fb);
 const ft=D('div','xeu'),cl=D('button','xebt sc','Kosongkan'),go=D('button','xebt go');cl.onclick=doClear;go.onclick=doGo;ft.append(cl,go);root.append(h,bd,ft);
 el={hs,ti,lb,pr,ct,fb,cl,go};paint();msg('',initMsg(x))}
function initMsg(x){if(x.ph==0)return'Pilih kad, kemudian pilih petak bernombor. Pilih petak yang terisi untuk memulangkan kad.';return'Pilih satu jawapan, kemudian pilih Semak Jawapan.'}
function paint(){const x=SAEL.cur(S),d=x.d;
 el.hs.textContent='Stesen Eksperimen · '+d.n+' ('+(S.i+1)+'/'+S.qs.length+') · Markah '+S.marks+'/'+SAEC.max;el.ti.textContent='Eksperimen '+d.n+': '+d.t;
 el.lb.textContent=x.ph==0?'BAHAGIAN 1/2 · LENGKAPKAN SUSUNAN':'BAHAGIAN 2/2 · SOALAN '+x.ph+'/'+SAEC.qn;el.ct.innerHTML='';
 if(x.ph==0){el.pr.textContent=d.aim;const w=D('div','xew'),dg=D('div','xed'),sv=D('div','xes');sv.setAttribute('role','img');sv.setAttribute('aria-label',typeof SAEALT!='undefined'?SAEALT[d.id]||'':'');sv.innerHTML=typeof saeArt=='function'?saeArt(d.id):'';dg.append(sv);
  const side=D('div','xes2');
  d.slots.forEach((s,k)=>{const id=x.slots[k],okk=x.chk&&id===s.a,cls=x.chk?(okk?'ok':'bad'):(x.pend===k?'act':id?'on':'');
   const m=D('button','xem'+(cls?' '+cls:''),x.chk?(okk?'✔':'✘'):String(k+1));m.type='button';m.style.left=s.x+'%';m.style.top=s.y+'%';m.setAttribute('aria-label','Petak '+(k+1)+': '+s.cap);m.disabled=x.chk;m.onclick=()=>tapSpot(k);dg.append(m);
   const r=D('button','xer'+(x.chk?(okk?' ok':' bad'):x.pend===k?' act':''));r.type='button';r.disabled=x.chk;r.onclick=()=>tapSpot(k);
   const bd=D('span','xeb');bd.append(D('span','xec',s.cap));
   if(x.chk&&!okk){bd.append(D('span','xev wr',id?SAEL.label(x,id):'kosong'),D('span','xea','Betul: '+SAEL.label(x,s.a)))}else bd.append(D('span','xev'+(id?'':' em'),id?SAEL.label(x,id):'pilih kad'));
   const ic=D('span','xei'),shown=x.chk?s.a:id;ic.setAttribute('aria-hidden','true');ic.innerHTML=shown&&typeof saeIcon=='function'?saeIcon(shown):'';r.append(D('span','xen',x.chk?(okk?'✔':'✘'):String(k+1)));if(shown)r.append(ic);r.append(bd);side.append(r)});
  if(!x.chk){const tr=D('div','xeq');SAEL.pool(x).forEach(id=>{const b=D('button','xek'+(x.sel===id?' on':'')),ic=D('span','xei');ic.setAttribute('aria-hidden','true');ic.innerHTML=typeof saeIcon=='function'?saeIcon(id):'';b.append(ic,D('span',null,SAEL.label(x,id)));b.type='button';b.onclick=()=>tapCard(id);tr.append(b)});side.append(tr)}
  w.append(dg,side);el.ct.append(w)}
 else{const q=SAEL.q(x);el.pr.textContent='';const o=D('div','xeo');el.ct.append(D('div','xeqp',q.p),o);
  x.qo[x.ph-1].forEach((id,k)=>{const c=q.c.find(c=>c[0]===id),b=D('button',x.chk?(id===q.a?'ok':x.pick===id?'bad':''):x.pick===id?'on':'');b.type='button';b.disabled=x.chk;b.append(D('i',null,LET[k]),D('span',null,c[1]));b.onclick=()=>tapChoice(id);o.append(b)})}
 el.cl.style.display=x.ph==0&&!x.chk?'':'none';
 el.go.textContent=!x.chk?'Semak Jawapan':(x.ph==SAEC.qn?(S.i<S.qs.length-1?'Eksperimen Seterusnya':'Lihat Keputusan'):'Seterusnya')}
function msg(k,t,b){el.fb.className='xef'+(k?' '+k:'');el.fb.textContent='';if(b)el.fb.append(D('b',null,b));el.fb.append(D('span',null,t))}
/* ---- input ---- */
function tapCard(id){if(scr!='q'||dlg)return;if(SAEL.selCard(SAEL.cur(S),id)){paint();msg('','Sekarang pilih petak bernombor untuk meletakkan kad.')}}
function tapSpot(k){if(scr!='q'||dlg)return;const r=SAEL.tapSpot(SAEL.cur(S),k);if(r){paint();msg('',r=='back'?'Kad dipulangkan.':r=='pend'?'Sekarang pilih kad untuk petak ini.':initMsg(SAEL.cur(S)))}}
function tapChoice(id){if(scr!='q'||dlg)return;if(SAEL.choose(SAEL.cur(S),id)){paint();msg('','Pilih Semak Jawapan apabila sudah pasti.')}}
function doClear(){if(scr!='q'||dlg)return;if(SAEL.clear(SAEL.cur(S))){paint();msg('','Semua kad dipulangkan.')}}
function doGo(){if(scr!='q'||dlg)return;const x=SAEL.cur(S);
 if(!x.chk){if(x.ph==0){const r=SAEL.checkSetup(S);if(r.r=='incomplete'){msg('no','Letakkan kad pada kesemua 5 petak dahulu.');return}if(r.r!='ok')return;paint();msg(x.sm==SAEC.slots?'ok':'no','Susunan ditunjukkan dengan betul pada rajah.','Susunan: '+x.sm+'/'+SAEC.slots);return}
  const r=SAEL.checkQ(S);if(r.r=='incomplete'){msg('no','Pilih satu jawapan dahulu.');return}if(r.r!='ok')return;paint();const q=SAEL.q(x);msg(r.ok?'ok':'no',q.e,'Soalan '+x.ph+': '+r.marks+'/'+q.m+(x.ph==SAEC.qn?' · Eksperimen ini: '+x.marks+'/'+SAEC.per:''));return}
 const n=SAEL.next(S);if(n=='step'){paint();msg('',initMsg(SAEL.cur(S)))}else if(n=='cycle')cycle();else if(n=='end')result()}
function result(){scr='res';el=null;const raw=S.marks,sc=SAEL.scale(raw),g=quizGrade(sc),r=recQuiz(SAEC.key,SAEC.level,sc);root.innerHTML='';
 const h=D('div','xeh');h.append(D('span',null,'Stesen Eksperimen'));const c=D('div','xeci');
 c.append(D('h2',null,'Penyiasatan Saintifik · Sukar'),D('div','xegc'+(g.pass?'':' f'),g.g),D('div','xebig','Markah: '+raw+'/'+SAEC.max),D('div','xesm',(g.pass?'LULUS · ':'GAGAL · ')+(FINAL[g.g]||FAILTXT)),D('div','xesm','Rekod terbaik: '+r.best+'/'+QCFG.max+' · '+r.g));
 const rv=D('div','xerv');S.qs.forEach(x=>{const row=D('div','xerr');row.append(D('span',null,'Eksperimen '+x.d.n+': '+x.marks+'/'+SAEC.per),D('i',x.marks==SAEC.per?'':'no',x.marks==SAEC.per?'Betul':'Ada salah'));rv.append(row)});c.append(rv);
 const w=D('div','xewb'),a=D('button','xebt','Main Lagi'),k=D('button','xebt sc','Tutup');a.onclick=start;k.onclick=close;w.append(a,k);c.append(w);root.append(h,c);a.focus();
 if(opt.onDone)opt.onDone({sc,raw,g:g.g})}
function ask(){if(scr!='q'||dlg)return;dlg=true;const c=D('div','xecf'),b=D('div'),r=D('div','xewb'),k=D('button','xebt','Teruskan Main'),o=D('button','xebt sc','Keluar');b.append(D('p',null,'Keluar dari kuiz ini? Markah pusingan ini tidak akan disimpan.'));
 k.onclick=()=>{c.remove();dlg=false};o.onclick=()=>{dlg=false;intro()};r.append(k,o);b.append(r);c.append(b);root.append(c);k.focus()}
function keys(e){if(!root||root.style.display!='flex')return;const k=e.key;
 if(k=='Escape'){e.preventDefault();e.stopPropagation();back();return}
 if(scr=='q'&&!dlg){const isB=e.target&&e.target.tagName=='BUTTON';if(k=='Enter'&&!isB){e.preventDefault();e.stopPropagation();doGo()}}}
function onVV(){if(!root||root.style.display!='flex')return;const v=window.visualViewport;root.style.height=v?Math.round(v.height)+'px':'100%';root.style.top=v?Math.round(v.offsetTop)+'px':'0'}
function open(o){build();opt=o||{};S=null;root.style.display='flex';if(!keyOn){addEventListener('keydown',keys,true);addEventListener('resize',onVV);if(window.visualViewport)window.visualViewport.addEventListener('resize',onVV);keyOn=true}onVV();intro()}
function close(){if(!root)return;root.style.display='none';root.innerHTML='';if(keyOn){removeEventListener('keydown',keys,true);removeEventListener('resize',onVV);if(window.visualViewport)window.visualViewport.removeEventListener('resize',onVV);keyOn=false}scr='';el=null;S=null;const f=opt.onClose;if(f)f()}
function back(){if(!root||root.style.display!='flex')return;if(dlg){const k=root.querySelector('.xecf button');if(k)k.click();return}if(scr=='q')ask();else close()}
return{open,close,back,isOpen:()=>!!root&&root.style.display=='flex'};
})();
