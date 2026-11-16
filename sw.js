// AulaTrader: recursos estáticos offline; no se interceptan datos financieros reales.
const CACHE='aulatrader-academy-v3-20261116';
const ASSETS=['./','./index.html','./favicon.svg','./dante-realista.webp','./dante-help-futurista.webp','./risk.js','./lab-v3.js','./lab-ui-v3.js','./v3-addon.js','./academy-v3.js','./v2.css','./v3.css','./vendor/lightweight-charts.standalone.production.js','./manifest.webmanifest','./app-icon.svg'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('aulatrader-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
  if(req.mode==='navigate'){
    event.respondWith(fetch(req).then(resp=>{
      if(resp.ok){const copy=resp.clone();caches.open(CACHE).then(cache=>cache.put('./index.html',copy)).catch(()=>{});}
      return resp;
    }).catch(()=>caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(resp=>{
    if(resp.ok&&resp.type==='basic'){const copy=resp.clone();caches.open(CACHE).then(cache=>cache.put(req,copy)).catch(()=>{});}
    return resp;
  })));
});
