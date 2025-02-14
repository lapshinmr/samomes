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
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Samomes',
    title: 'Samomes',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'description',
        name: 'description',
        content: '"Самомес" - это калькулятор самодельных рецептов удобрений для растительного аквариума, '
          + 'удобный способ расчета дозировок внесения удобрений и составления расписание на неделю.',
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
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
  build: {
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      purpose: false,
    },
    manifest: {
      lang: 'en',
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

  // router: {
  //   // trailingSlash: true,
  // },

  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://samomes.com',
    exclude: [
      '/settings',
    ],
  },

  // server: {
  //   host: '0.0.0.0',
  //   port: 3000,
  // },
};
