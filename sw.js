const V="questionari-v10",F=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","maskable-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(F.map(u=>c.add(new Request(u,{cache:"reload"})).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);
if(r.method!=="GET"||u.origin!==location.origin||/ricevi\.html$/.test(u.pathname))return;
const nav=r.mode==="navigate";
e.respondWith(fetch(nav?r.url:r,{cache:"no-store"}).then(x=>x.redirected&&nav?fetch(r):x).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(k=>k.put(r.url,c))}return x}).catch(()=>caches.match(r.url).then(m=>m||caches.match("index.html"))))});
