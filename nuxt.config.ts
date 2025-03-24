// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  css: ['~/assets/variables.sass', '~/assets/global.sass'],

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
  ],

  imports: {
    dirs: [
      'utils/**',
    ],
  },

  typescript: {
    strict: false,
    // typeCheck: true,
  },

  vuetify: {
    moduleOptions: {
    },
    vuetifyOptions: {
      /* vuetify options */
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
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
