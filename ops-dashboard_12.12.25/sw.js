// Service Worker for image caching
const CACHE_NAME = 'ops-dashboard-v1';
const IMAGE_CACHE = 'images-v1';

// Images to cache immediately
const PRECACHE_IMAGES = [
  'images/icons.svg',
  'images/1Micon.png',
  'images/plus_Outline_24.svg',
  'images/plus_Filled_24.svg',
  'images/house_Outline_24.svg',
  'images/house_Filled_24.svg',
  'images/star-circle-triangle-ai_Outline_24.svg',
  'images/star-circle-triangle-ai_Filled_24.svg',
  'images/three-concentric-circles_Outline_24.svg',
  'images/three-concentric-circles_Filled_24.svg',
  'images/four-dots-three-lines-connected_Outline_24.svg',
  'images/four-dots-three-lines-connected_Filled_24.svg',
  'images/circle-four-lines_Outline_24.svg',
  'images/circle-four-lines_Filled_24.svg',
  'images/plus-shield_Outline_24.svg',
  'images/plus-shield_Filled_24.svg',
  'images/flame_Outline_24.svg',
  'images/flame_Filled_24.svg',
  'images/chart-line_Outline_24.svg',
  'images/chart-line_Filled_24.svg',
  'images/circle-handle-stardust_Outline_24.svg',
  'images/circle-handle-stardust_Filled_24.svg',
  'images/i-circle_Outline_24.svg',
  'images/i-circle_Filled_24.svg'
];

// Install event - precache images
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(IMAGE_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_IMAGES);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== IMAGE_CACHE && cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Only cache image requests
  if (url.pathname.includes('/images/') || 
      event.request.destination === 'image' ||
      url.pathname.endsWith('.svg') ||
      url.pathname.endsWith('.png')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((response) => {
          // Don't cache if not a valid response
          if (!response || response.status !== 200) {
            return response;
          }
          // Clone the response
          const responseToCache = response.clone();
          caches.open(IMAGE_CACHE).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
    );
  }
});

