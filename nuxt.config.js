/*
Samomes

Copyright (C) 2025 Mikhail Lapshin

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import colors from 'vuetify/es5/util/colors';

export default {
  target: 'static',
  generate: {
    fallback: '404.html',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Samomes',
    title: 'Samomes',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-touch-fullscreen', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: 'Samomes' },
      {
        hid: 'description',
        name: 'description',
        content: 'Самомес — это калькулятор рецептов удобрений для растительного аквариума, '
          + 'удобный способ расчета дозировок удобрений и составления расписания на неделю.',
      },
      {
        hid: 'author',
        name: 'author',
        author: 'Михаил Лапшин',
      },
      {
        name: 'yandex-verification',
        content: 'd58e65f9d4e5df54',
      },
      { hid: 'og:title', name: 'og:title', content: 'Samomes' },
      { hid: 'og:site_name', name: 'og:site_name', content: 'Samomes' },
      {
        hid: 'og:description',
        name: 'og:description',
        content: 'Самомес — это калькулятор рецептов удобрений для растительного аквариума, '
          + 'удобный способ расчета дозировок удобрений и составления расписания на неделю.',
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: '/og_image.png',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // https://stackoverflow.com/questions/70036043/nuxt-pwa-is-not-displaying-splash-screens-on-ios-devices
      { rel: 'apple-touch-startup-image', href: '/ios/apple-splash-2048-2732.png', media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' },
      { rel: 'apple-touch-startup-image', href: '/ios/apple-splash-1668-2388.png', media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' },
      { rel: 'apple-touch-startup-image', href: '/ios/apple-splash-1668-2224.png', media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' },
      { rel: 'apple-touch-startup-image', href: '/ios/apple-splash-1620-2160.png', media: '(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' },
      { rel: 'apple-touch-startup-image', href: '/ios/apple-splash-1536-2048.png', media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' },
      { rel: 'apple-touch-startup-image', href: '/ios/apple-splash-1284-2778.png', media: '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' },
      { rel: 'apple-touch-startup-image', href: '/ios/apple-splash-1242-2688.png', media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' },
      { rel: 'apple-touch-startup-image', href: '/ios/apple-splash-1242-2208.png', media: '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' },
      { rel: 'apple-touch-startup-image', href: '/ios/apple-splash-1170-2532.png', media: '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' },
      { rel: 'apple-touch-startup-image', href: '/ios/apple-splash-1125-2436.png', media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' },
      { rel: 'apple-touch-startup-image', href: '/ios/apple-splash-828-1792.png', media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' },
      { rel: 'apple-touch-startup-image', href: '/ios/apple-splash-750-1334.png', media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' },
      { rel: 'apple-touch-startup-image', href: '/ios/apple-splash-640-1136.png', media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' },
    ],
    script: [
      { src: 'https://kit.fontawesome.com/b163e0af3d.js', crossorigin: true },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/core-components.js',
    '~plugins/filters.js',
    '~plugins/helpers.js',
    '~plugins/error-handler.js',
    { src: '~/plugins/vuex-persist', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/google-fonts',
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/sitemap',
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '61348777',
        webvisor: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
      },
    ],
    [
      '@nuxtjs/i18n',
      {
        langDir: 'locales',
        defaultLocale: 'ru',
        detectBrowserLanguage: false,
        strategy: 'no_prefix',
        locales: [
          { code: 'ru', iso: 'ru-RU', file: 'ru.js' },
          { code: 'en', iso: 'en-US', file: 'en.js' },
        ],
      },
    ],
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      purpose: false,
    },
    manifest: {
      lang: 'en',
      name: 'Samomes',
      short_name: 'Samomes',
      background_color: '#ffffff',
      start_url: '/',
      orientation: 'portrait-primary',
      description: '"Самомес" - это калькулятор самодельных рецептов удобрений для растительного аквариума, '
        + 'удобный способ расчета дозировок внесения удобрений и составления расписание на неделю.',
      display: 'standalone',
    },
    meta: {
      mobileAppIOS: false,
    },
    workbox: {
      offline: true,
      offlineStrategy: 'StaleWhileRevalidate',
      autoRegister: true,
      preCaching: [
        '/',
        // External resources
        'https://kit.fontawesome.com/b163e0af3d.js',
        'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
        'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap',
      ],
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'pages-cache',
            cacheableResponse: {
              statuses: [0, 200],
            },
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
          },
        },
        {
          urlPattern: '/.*/',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'pages-cache',
            cacheableResponse: {
              statuses: [0, 200],
            },
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
          },
        },
        {
          urlPattern: '/_nuxt/.*\\.js',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'nuxt-js',
            cacheableResponse: {
              statuses: [0, 200],
            },
            expiration: {
              maxEntries: 1000,
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
          },
        },
        {
          urlPattern: 'https://kit.fontawesome.com/.*',
          handler: 'CacheFirst',
          options: {
            cacheName: 'fontawesome-cache',
            cacheableResponse: {
              statuses: [0, 200],
            },
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
          },
        },
        {
          urlPattern: 'https://ka-f.fontawesome.com/.*',
          handler: 'CacheFirst',
          options: {
            cacheName: 'fontawesome-cdn-cache',
            cacheableResponse: {
              statuses: [0, 200],
            },
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
          },
        },
        {
          urlPattern: 'https://fonts.googleapis.com/.*',
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-stylesheets',
            cacheableResponse: {
              statuses: [0, 200],
            },
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
          },
        },
        {
          urlPattern: 'https://fonts.gstatic.com/.*',
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-webfonts',
            cacheableResponse: {
              statuses: [0, 200],
            },
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
          },
        },
        {
          urlPattern: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/.*',
          handler: 'CacheFirst',
          options: {
            cacheName: 'mdi-icons-assets',
            cacheableResponse: {
              statuses: [0, 200],
            },
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
          },
        },
        {
          urlPattern: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/fonts/.*',
          handler: 'CacheFirst',
          options: {
            cacheName: 'mdi-icons-fonts',
            cacheableResponse: {
              statuses: [0, 200],
            },
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
          },
        },
      ],
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.sass'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  googleFonts: {
    display: 'swap',
    preconnect: true,
    preload: true,
    prefetch: true,
    download: true,
    overwriting: true,
    families: {
      Roboto: [300, 400, 500, 600, 700],
      Lexend: [300, 400, 500, 600, 700],
    },
  },

  router: {
    trailingSlash: true,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      if (to.hash) {
        return { selector: to.hash };
      }
      return { x: 0, y: 0 };
    },
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://samomes.com',
    exclude: [
      '/settings/',
    ],
  },

  // server: {
  //   host: '0.0.0.0',
  //   port: 3000,
  // },
};
