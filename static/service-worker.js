const CACHE_NAME = 'vallejo-game-color-checklist';

const cacheList = [
  "/",
  "index.html",
  "build.js"
]

// Install and precache
self.addEventListener("install", event => {
  console.log('[Service Worker] Install');
  event.waitUntil( precache(cacheList) )
})

// Clean old caches
self.addEventListener("activate", event => {
  console.log('[Service Worker] Removing old caches...');
  event.waitUntil(
    caches.keys()
    .then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  )
})

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith( cacheNetwork(event.request) )
  event.waitUntil( update(event.request) )
})

function precache(list) {
  caches.open(CACHE_NAME)
  .then(cache => {
    console.log('[Service Worker] Caching all: app shell and content')
    return cache.addAll(list)
  })
}

function cacheNetwork(request) {
  return caches.match(request).then(response => {
    console.log('[Service Worker] Fetching resource: '+request.url)
    return response || fetch(request).then(response => {
      return caches.open(CACHE_NAME).then(cache => {
        console.log('[Service Worker] Caching new resource: '+request.url)
        cache.put(request, response.clone())
        return response
      })
    })
  })
}

function update(request) {
  return caches.open(CACHE_NAME).then(cache => {
    return fetch(request).then(response => {
      console.log('[Service Worker] Updating resource: '+request.url)
      return cache.put(request, response)
    })
  })
}
