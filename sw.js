/* Offline support for the Finanzen app.
   The page itself is fetched from the network first, so a new version on GitHub shows up
   the next time you open the app online; without a connection the saved copy is used.
   Icons and the manifest rarely change and come from the cache. */
const CACHE = 'finanzen-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  if (req.mode === 'navigate') {
    // a slow connection must not block the app: after 3 s the saved copy is shown
    const fresh = fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); }
      return res;
    });
    const saved = caches.match('./index.html');
    const timeout = new Promise(resolve => setTimeout(resolve, 3000)).then(() => saved);
    e.respondWith(Promise.race([fresh.catch(() => saved), timeout]).then(res => res || fresh));
    return;
  }

  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  })));
});
