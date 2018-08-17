importScripts('serviceworker-cache-polyfill.js');

const CACHE_NAME = 'vallejo-game-color-checklist';

const cacheList = [
  "./",
  "./manifest.json",
  "./index.html",
  "./build.js",
  "https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons"
]

// Install and precache
self.addEventListener("install", event => {
  console.log('[Service Worker] Install');
  event.waitUntil( precache(cacheList) )
})

// Clean old caches
self.addEventListener("activate", event => {
  console.log('[Service Worker] Removing old caches...')
  event.waitUntil(
    caches.keys()
    .then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
    .then( () => {
      console.log('[Service Worker]: Clients claims')
      return self.clients.claim()
    })
  )
})

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith( cache(event.request) )
  //event.waitUntil( update(event.request) )
})

// Messages
self.addEventListener("message", event => {
  console.log('[Service Worker] Receiving messages...');
})

function precache(list) {
  caches.open(CACHE_NAME)
  .then(cache => {
    console.log('[Service Worker] Caching all: app shell and content')
    return cache.addAll(list).then(() => self.skipWaiting())
  })
}

function cache(request) {
  return caches.match(request).then(response => {
    console.log('[Service Worker] Fetching resource: ' + request.url)
    return response || Promise.reject('no-match')
  }).catch(error => console.error(error))
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
