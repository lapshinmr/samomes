// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-04-29',

  devtools: { enabled: false },

  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      titleTemplate: '%s - Samomes',
      title: 'Samomes',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'robots', content: 'noindex, nofollow' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-touch-fullscreen', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'Samomes' },
        {
          name: 'description',
          content: 'Самомес — это калькулятор рецептов удобрений для растительного аквариума, удобный способ расчета дозировок удобрений и составления расписания на неделю.',
        },
        { property: 'og:title', content: 'Samomes' },
        { property: 'og:site_name', content: 'Samomes' },
        {
          property: 'og:description',
          content: 'Самомес — это калькулятор рецептов удобрений для растительного аквариума, удобный способ расчета дозировок удобрений и составления расписания на неделю.',
        },
        { property: 'og:image', content: '/og_image.png' },
        { property: 'og:type', content: 'website' },
        { name: 'theme-color', content: '#1976d2' },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  css: ['~/assets/variables.sass'],

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxtjs/i18n',
    'vuetify-nuxt-module',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    [
      'yandex-metrika-module-nuxt3',
      {
        id: '101470252',
        webvisor: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
      },
    ],
  ],

  imports: {
    dirs: [
      'utils/**',
    ],
  },

  typescript: {
    strict: false,
    typeCheck: true,
  },

  vuetify: {
    moduleOptions: {
    },
    vuetifyOptions: {
      /* vuetify options */
    },
  },

  i18n: {
    defaultLocale: 'ru',
    detectBrowserLanguage: false,
    strategy: 'prefix_except_default',
    locales: [
      { code: 'ru', name: 'Ru', iso: 'ru-RU', file: 'ru.js' },
      { code: 'en', name: 'En', iso: 'en-US', file: 'en.js' },
    ],
  },

  piniaPluginPersistedstate: {
    storage: 'localStorage',
    debug: true,
  },
});
