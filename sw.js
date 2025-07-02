// Service Worker for Flexbox Generator PWA
const CACHE_NAME = 'flexbox-generator-v1.0.0';

// Handle unhandled promise rejections
self.addEventListener('unhandledrejection', event => {
  console.error('Service Worker: Unhandled Promise Rejection', event.reason);
  event.preventDefault(); // Prevent the default behavior
});
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json'
];

// Install Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker: Install Event');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: All Files Cached');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Install Failed', error);
        // Continue installation even if caching fails
        return self.skipWaiting();
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker: Activate Event');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activated');
      return self.clients.claim();
    })
  );
});

// Fetch Event - Network First, then Cache
self.addEventListener('fetch', event => {
  console.log('Service Worker: Fetch Event for', event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip Chrome extension requests
  if (event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  // Handle external CDNs separately to avoid CORS issues
  if (event.request.url.startsWith('https://') && 
      !event.request.url.startsWith(self.location.origin)) {
    
    // Allow Tailwind CDN but don't cache it to avoid CORS issues
    if (event.request.url.includes('tailwindcss.com')) {
      event.respondWith(
        fetch(event.request)
          .catch(() => {
            // If Tailwind CDN fails, return empty JavaScript to prevent errors
            return new Response('console.warn("Tailwind CDN failed to load");', { 
              headers: { 'Content-Type': 'text/javascript' },
              status: 200, 
              statusText: 'OK' 
            });
          })
      );
      return;
    }
    
    // Allow FontAwesome CDN but don't cache it to avoid CORS issues
    if (event.request.url.includes('cdnjs.cloudflare.com') ||
        event.request.url.includes('fontawesome')) {
      event.respondWith(
        fetch(event.request)
          .catch(() => {
            // If CDN fails, return empty response to prevent errors
            return new Response('/* FontAwesome CDN failed to load */', { 
              headers: { 'Content-Type': 'text/css' },
              status: 200, 
              statusText: 'OK' 
            });
          })
      );
      return;
    }
    
    // Skip other cross-origin requests
    return;
  }

  event.respondWith(
    // Try network first
    fetch(event.request)
      .then(response => {
        // Check if response is valid
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response for caching
        const responseToCache = response.clone();

        // Add to cache
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });

        return response;
      })
      .catch(() => {
        // If network fails, try cache
        return caches.match(event.request)
          .then(response => {
            if (response) {
              console.log('Service Worker: Serving from Cache', event.request.url);
              return response;
            }
            
            // If cache also fails, return offline page or error
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
            
            return new Response('Offline content not available', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Background Sync for offline actions
self.addEventListener('sync', event => {
  console.log('Service Worker: Background Sync', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync operations
      syncData()
    );
  }
});

async function syncData() {
  try {
    // Sync any offline data when connection is restored
    console.log('Service Worker: Syncing offline data');
    
    // Check if there are any saved configurations to sync
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'SYNC_COMPLETE',
        message: 'Background sync completed'
      });
    });
  } catch (error) {
    console.error('Service Worker: Sync failed', error);
  }
}

// Push notifications (if needed in the future)
self.addEventListener('push', event => {
  console.log('Service Worker: Push Event');
  
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/icon-96x96.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      },
      actions: [
        {
          action: 'explore',
          title: 'Open Flexbox Generator',
          icon: '/icon-192x192.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/icon-192x192.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification click
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notification Click');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Handle message from main thread
self.addEventListener('message', event => {
  console.log('Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_CONFIG') {
    // Cache user configuration
    caches.open(CACHE_NAME).then(cache => {
      const configResponse = new Response(JSON.stringify(event.data.config), {
        headers: { 'Content-Type': 'application/json' }
      });
      cache.put('/config-backup', configResponse);
    });
  }
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', event => {
  console.log('Service Worker: Periodic Sync', event.tag);
  
  if (event.tag === 'config-backup') {
    event.waitUntil(
      // Backup user configurations periodically
      backupConfigurations()
    );
  }
});

async function backupConfigurations() {
  try {
    console.log('Service Worker: Backing up configurations');
    
    // Notify clients to backup their current state
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'BACKUP_REQUEST',
        message: 'Please backup current configuration'
      });
    });
  } catch (error) {
    console.error('Service Worker: Backup failed', error);
  }
}

// Handle Share Target API (if manifest includes share_target)
self.addEventListener('share', event => {
  console.log('Service Worker: Share Event', event);
  
  event.waitUntil(
    // Handle shared content
    handleSharedContent(event)
  );
});

async function handleSharedContent(event) {
  try {
    // Process shared content and redirect to app
    const url = new URL('/', self.location.origin);
    url.searchParams.set('shared', 'true');
    
    if (event.data && event.data.text) {
      url.searchParams.set('text', event.data.text);
    }
    
    const clients = await self.clients.matchAll();
    if (clients.length > 0) {
      clients[0].focus();
      clients[0].postMessage({
        type: 'SHARED_CONTENT',
        data: event.data
      });
    } else {
      await self.clients.openWindow(url.toString());
    }
  } catch (error) {
    console.error('Service Worker: Share handling failed', error);
  }
}

// Error handling
self.addEventListener('error', event => {
  console.error('Service Worker: Error', event.error);
});

self.addEventListener('unhandledrejection', event => {
  console.error('Service Worker: Unhandled Promise Rejection', event.reason);
});

console.log('Service Worker: Loaded and Ready'); 