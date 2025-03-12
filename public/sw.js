// Service Worker for Novora Solutions PWA

const CACHE_VERSION = '1';
const CACHE_NAME = `novora-cache-v${CACHE_VERSION}-${new Date().toISOString().slice(0, 10)}`;

// Assets to cache on install
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  '/images/Novora-Logo.png',
  '/favicon.ico',
  '/favicon-192x192.png',
  '/favicon-512x512.png'
];

// Install event - cache assets
self.addEventListener('install', event => {
  // Force waiting Service Worker to become active
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            // Delete any cache that starts with 'novora-cache-' but isn't the current one
            return cacheName.startsWith('novora-cache-') && cacheName !== CACHE_NAME;
          })
          .map(cacheName => {
            console.log('Deleting outdated cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => {
      // Ensure the service worker takes control of all clients
      return self.clients.claim();
    })
  );
});

// Helper function to determine if a request is for an image
const isImageRequest = (request) => {
  return request.destination === 'image' || 
         request.url.match(/\.(jpe?g|png|gif|svg|webp)$/i);
};

// Helper function to determine if a request is for a font
const isFontRequest = (request) => {
  return request.destination === 'font' || 
         request.url.match(/\.(woff2?|ttf|otf|eot)$/i);
};

// Helper function to determine if a request is for a static asset
const isStaticAssetRequest = (request) => {
  return request.destination === 'script' || 
         request.destination === 'style' || 
         request.url.match(/\.(js|css)$/i);
};

// Helper function to determine if a request is for HTML
const isHTMLRequest = (request) => {
  return request.destination === 'document' || 
         request.mode === 'navigate' ||
         (request.headers.get('accept') && 
          request.headers.get('accept').includes('text/html'));
};

// Fetch event - serve from cache or network with different strategies
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Apply different caching strategies based on request type
  if (isImageRequest(event.request) || isFontRequest(event.request)) {
    // Cache-first strategy for images and fonts (they rarely change)
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(event.request).then(response => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          
          return response;
        }).catch(() => {
          // Return a fallback image if available
          if (isImageRequest(event.request)) {
            return caches.match('/images/fallback-image.png');
          }
        });
      })
    );
  } else if (isStaticAssetRequest(event.request)) {
    // Stale-while-revalidate for static assets (JS/CSS)
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(cachedResponse => {
          const fetchPromise = fetch(event.request)
            .then(networkResponse => {
              // Update the cache
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            })
            .catch(error => {
              console.error('Failed to fetch:', error);
            });
          
          // Return the cached response immediately if we have one
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (isHTMLRequest(event.request)) {
    // Network-first strategy for HTML (to ensure latest content)
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache the latest version
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // If no cached version, try the offline page
              return caches.match('/offline.html');
            });
        })
    );
  } else {
    // Default: network-first with cache fallback for other requests
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  }
});

// Handle push notifications
self.addEventListener('push', event => {
  const title = 'Novora Solutions';
  const options = {
    body: event.data.text() || 'New notification from Novora Solutions',
    icon: '/favicon-192x192.png',
    badge: '/favicon-192x192.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('https://novorasolutions.com/')
  );
});

// Handle sync events for background syncing
self.addEventListener('sync', event => {
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncMessages());
  }
});

// Function to sync messages from IndexedDB when online
async function syncMessages() {
  // This would typically sync data from IndexedDB to your server
  // For now, just log that sync would happen
  console.log('Background sync would happen here');
}