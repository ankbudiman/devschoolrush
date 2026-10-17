/* Minimal service worker: only here so browsers treat the game as an installable app.
   It does NOT cache anything, so updates you push to GitHub Pages show up straight away. */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',()=>{});
