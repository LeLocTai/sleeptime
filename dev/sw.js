 var cacheName = 'pwasleeptime';
 var urlsToCache = [
     '',
     'index.html',
     'styles.min.css',
     'scripts.min.js'
 ];

 self.addEventListener('install', function(event) {
     // Perform install steps
     event.waitUntil(
         caches.open(cacheName)
         .then(function(cache) {
             console.log('Opened cache');
             return cache.addAll(urlsToCache);
         })
     );
 });
 self.addEventListener('activate', function(e) {
     console.log('[ServiceWorker] Activate');
     e.waitUntil(
         caches.keys().then(function(keyList) {
             return Promise.all(keyList.map(function(key) {
                 if (key !== cacheName) {
                     console.log('[ServiceWorker] Removing old cache', key);
                     return caches.delete(key);
                 }
             }));
         })
     );
     return self.clients.claim();
 });
 self.addEventListener('fetch', function(e) {
     console.log('[ServiceWorker] Fetch', e.request.url);
     e.respondWith(
         caches.match(e.request).then(function(response) {
             return response || fetch(e.request);
         })
     );
 });
