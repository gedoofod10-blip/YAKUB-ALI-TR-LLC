const CACHE_NAME = 'yakub-ali-cache-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/pwa-icon.svg',
  '/images/official-logo.svg',
  '/images/hero.jpg',
  '/images/sanitary.jpg',
  '/images/electrical.jpg',
  '/images/plumbing.jpg',
  '/images/tools.jpg',
  '/images/store.jpg',
  '/images/products/water-heater.jpg',
  '/images/products/water-pump.jpg',
  '/images/products/conduit.jpg',
  '/images/products/floor-drain.jpg'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Pre-caching some assets skipped:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event (Network first for HTML/API, Stale-while-revalidate for assets)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Ignore non-GET or cross-origin external API requests
  if (event.request.method !== 'GET') return;

  // Stale-while-revalidate for local static assets and images
  if (url.origin === location.origin || url.hostname.includes('pexels.com') || url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => {
          return cachedResponse;
        });

        return cachedResponse || fetchPromise;
      })
    );
  }
});
