const CACHE_NAME = 'imminote-v10';
const ASSETS = [
    './',
    './index.html',
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    // Navigation requests (HTML pages): network-first so updates land immediately.
    // Falls back to cache when offline.
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).then((response) => {
                if (response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                }
                return response;
            }).catch(() => caches.match('./index.html'))
        );
        return;
    }

    // All other assets (fonts, icons): cache-first for speed, offline support.
    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) return cached;
            return fetch(event.request).then((response) => {
                if (
                    response.ok &&
                    (event.request.url.startsWith(self.location.origin) ||
                     event.request.url.includes('fonts.googleapis.com') ||
                     event.request.url.includes('fonts.gstatic.com'))
                ) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                }
                return response;
            });
        }).catch(() => {})
    );
});
