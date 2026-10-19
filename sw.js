/* Service worker (Round 6b, Round 7 adds the Kantin files): network-first with a saved copy as backup.
   - Online: always fetches fresh files, so GitHub Pages updates show straight away; each good response is saved.
   - Offline or slow (4 s): uses the saved copy, so the installed app still opens. Includes Three.js and the font.
   Change CACHE to force old copies to be dropped. */
const CACHE='sr-r7',PRE=['index.html','world.html','kantin.html','css/style.css','css/intro.css','js/core.js','js/chars.js','js/ui.js','js/menu.js','js/intro.js','js/world-build.js','js/story.js','js/world.js','js/kantin.js','js/kantin-games.js','js/kantin-data.js','manifest.webmanifest','assets/brand/school-rush-logo.webp','assets/brand/lah-logo.jpg','https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>Promise.all(PRE.map(u=>fetch(u,u.startsWith('http')?{mode:'no-cors'}:{}).then(r=>c.put(u,r)).catch(()=>{})))))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!=CACHE).map(n=>caches.delete(n)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET'||!/^https?:/.test(r.url))return;
 const net=fetch(r).then(res=>{if(res&&(res.ok||res.type=='opaque')){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp)).catch(()=>{})}return res});
 const slow=new Promise((_,no)=>setTimeout(no,4000));
 e.respondWith(Promise.race([net,slow]).catch(()=>caches.match(r).then(m=>m||(r.mode=='navigate'?caches.match('index.html'):null)||net)))});
