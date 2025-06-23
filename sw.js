const options = {"workboxURL":"https://cdn.jsdelivr.net/npm/workbox-cdn@5.1.4/workbox/workbox-sw.js","importScripts":[],"config":{"debug":false},"cacheOptions":{"cacheId":"samomes-prod","directoryIndex":"/","revision":"opJ0HPsbOxIN"},"clientsClaim":true,"skipWaiting":true,"cleanupOutdatedCaches":true,"offlineAnalytics":false,"preCaching":[{"revision":"opJ0HPsbOxIN","url":"/"},{"revision":"opJ0HPsbOxIN","url":"/"},{"revision":"opJ0HPsbOxIN","url":"https://kit.fontawesome.com/b163e0af3d.js"},{"revision":"opJ0HPsbOxIN","url":"https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css"},{"revision":"opJ0HPsbOxIN","url":"https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap"}],"runtimeCaching":[{"urlPattern":"/","handler":"StaleWhileRevalidate","options":{"cacheName":"pages-cache","cacheableResponse":{"statuses":[0,200]},"expiration":{"maxEntries":50,"maxAgeSeconds":2592000}},"method":"GET","strategyPlugins":[]},{"urlPattern":"/.*/","handler":"StaleWhileRevalidate","options":{"cacheName":"pages-cache","cacheableResponse":{"statuses":[0,200]},"expiration":{"maxEntries":100,"maxAgeSeconds":2592000}},"method":"GET","strategyPlugins":[]},{"urlPattern":"/_nuxt/.*\\.js","handler":"StaleWhileRevalidate","options":{"cacheName":"nuxt-js","cacheableResponse":{"statuses":[0,200]},"expiration":{"maxEntries":1000,"maxAgeSeconds":2592000}},"method":"GET","strategyPlugins":[]},{"urlPattern":"https://kit.fontawesome.com/.*","handler":"CacheFirst","options":{"cacheName":"fontawesome-cache","cacheableResponse":{"statuses":[0,200]},"expiration":{"maxEntries":30,"maxAgeSeconds":2592000}},"method":"GET","strategyPlugins":[]},{"urlPattern":"https://ka-f.fontawesome.com/.*","handler":"CacheFirst","options":{"cacheName":"fontawesome-cdn-cache","cacheableResponse":{"statuses":[0,200]},"expiration":{"maxEntries":30,"maxAgeSeconds":2592000}},"method":"GET","strategyPlugins":[]},{"urlPattern":"https://fonts.googleapis.com/.*","handler":"CacheFirst","options":{"cacheName":"google-fonts-stylesheets","cacheableResponse":{"statuses":[0,200]},"expiration":{"maxEntries":10,"maxAgeSeconds":2592000}},"method":"GET","strategyPlugins":[]},{"urlPattern":"https://fonts.gstatic.com/.*","handler":"CacheFirst","options":{"cacheName":"google-fonts-webfonts","cacheableResponse":{"statuses":[0,200]},"expiration":{"maxEntries":30,"maxAgeSeconds":2592000}},"method":"GET","strategyPlugins":[]},{"urlPattern":"https://cdn.jsdelivr.net/npm/@mdi/font@latest/.*","handler":"CacheFirst","options":{"cacheName":"mdi-icons-assets","cacheableResponse":{"statuses":[0,200]},"expiration":{"maxEntries":100,"maxAgeSeconds":2592000}},"method":"GET","strategyPlugins":[]},{"urlPattern":"https://cdn.jsdelivr.net/npm/@mdi/font@latest/fonts/.*","handler":"CacheFirst","options":{"cacheName":"mdi-icons-fonts","cacheableResponse":{"statuses":[0,200]},"expiration":{"maxEntries":20,"maxAgeSeconds":2592000}},"method":"GET","strategyPlugins":[]},{"urlPattern":"/_nuxt/","handler":"CacheFirst","method":"GET","strategyPlugins":[]},{"urlPattern":"/","handler":"StaleWhileRevalidate","method":"GET","strategyPlugins":[]}],"offlinePage":null,"pagesURLPattern":"/","offlineStrategy":"StaleWhileRevalidate"}

importScripts(...[options.workboxURL, ...options.importScripts])

initWorkbox(workbox, options)
workboxExtensions(workbox, options)
precacheAssets(workbox, options)
cachingExtensions(workbox, options)
runtimeCaching(workbox, options)
offlinePage(workbox, options)
routingExtensions(workbox, options)

function getProp(obj, prop) {
  return prop.split('.').reduce((p, c) => p[c], obj)
}

function initWorkbox(workbox, options) {
  if (options.config) {
    // Set workbox config
    workbox.setConfig(options.config)
  }

  if (options.cacheNames) {
    // Set workbox cache names
    workbox.core.setCacheNameDetails(options.cacheNames)
  }

  if (options.clientsClaim) {
    // Start controlling any existing clients as soon as it activates
    workbox.core.clientsClaim()
  }

  if (options.skipWaiting) {
    workbox.core.skipWaiting()
  }

  if (options.cleanupOutdatedCaches) {
    workbox.precaching.cleanupOutdatedCaches()
  }

  if (options.offlineAnalytics) {
    // Enable offline Google Analytics tracking
    workbox.googleAnalytics.initialize()
  }
}

function precacheAssets(workbox, options) {
  if (options.preCaching.length) {
    workbox.precaching.precacheAndRoute(options.preCaching, options.cacheOptions)
  }
}


function runtimeCaching(workbox, options) {
  const requestInterceptor = {
    requestWillFetch({ request }) {
      if (request.cache === 'only-if-cached' && request.mode === 'no-cors') {
        return new Request(request.url, { ...request, cache: 'default', mode: 'no-cors' })
      }
      return request
    },
    fetchDidFail(ctx) {
      ctx.error.message =
        '[workbox] Network request for ' + ctx.request.url + ' threw an error: ' + ctx.error.message
      console.error(ctx.error, 'Details:', ctx)
    },
    handlerDidError(ctx) {
      ctx.error.message =
        `[workbox] Network handler threw an error: ` + ctx.error.message
      console.error(ctx.error, 'Details:', ctx)
      return null
    }
  }

  for (const entry of options.runtimeCaching) {
    const urlPattern = new RegExp(entry.urlPattern)
    const method = entry.method || 'GET'

    const plugins = (entry.strategyPlugins || [])
      .map(p => new (getProp(workbox, p.use))(...p.config))

    plugins.unshift(requestInterceptor)

    const strategyOptions = { ...entry.strategyOptions, plugins }

    const strategy = new workbox.strategies[entry.handler](strategyOptions)

    workbox.routing.registerRoute(urlPattern, strategy, method)
  }
}

function offlinePage(workbox, options) {
  if (options.offlinePage) {
    // Register router handler for offlinePage
    workbox.routing.registerRoute(new RegExp(options.pagesURLPattern), ({ request, event }) => {
      const strategy = new workbox.strategies[options.offlineStrategy]
      return strategy
        .handle({ request, event })
        .catch(() => caches.match(options.offlinePage))
    })
  }
}

function workboxExtensions(workbox, options) {
  
}

function cachingExtensions(workbox, options) {
  
}

function routingExtensions(workbox, options) {
  
}
