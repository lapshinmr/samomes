// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-06-26',

  devtools: { enabled: false },

  // devServer: {
  //   host: '0.0.0.0',
  //   port: 3000,
  // },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
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
          name: 'description',
          content: 'Самомес — это калькулятор рецептов удобрений для растительного аквариума, удобный ' +
            'способ расчета дозировок удобрений и составления расписания на неделю.',
        },
        { property: 'og:title', content: 'Samomes' },
        { property: 'og:site_name', content: 'Samomes' },
        {
          property: 'og:description',
          content: 'Самомес — это калькулятор рецептов удобрений для растительного аквариума, удобный ' +
            'способ расчета дозировок удобрений и составления расписания на неделю.',
        },
        { property: 'og:image', content: '/og_image.png' },
        { property: 'og:type', content: 'website' },
        { name: 'theme-color', content: '#4caf50' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'apple-touch-icon', href: '/pwa-192x192.png' },
        {
          rel: 'apple-touch-startup-image',
          href: '/ios/apple-splash-2048-2732.png',
          media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        },
        {
          rel: 'apple-touch-startup-image',
          href: '/ios/apple-splash-1668-2388.png',
          media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        },
        {
          rel: 'apple-touch-startup-image',
          href: '/ios/apple-splash-1668-2224.png',
          media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        },
        {
          rel: 'apple-touch-startup-image',
          href: '/ios/apple-splash-1620-2160.png',
          media: '(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        },
        {
          rel: 'apple-touch-startup-image',
          href: '/ios/apple-splash-1536-2048.png',
          media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        },
        {
          rel: 'apple-touch-startup-image',
          href: '/ios/apple-splash-1284-2778.png',
          media: '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        },
        {
          rel: 'apple-touch-startup-image',
          href: '/ios/apple-splash-1242-2688.png',
          media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        },
        {
          rel: 'apple-touch-startup-image',
          href: '/ios/apple-splash-1242-2208.png',
          media: '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        },
        {
          rel: 'apple-touch-startup-image',
          href: '/ios/apple-splash-1170-2532.png',
          media: '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        },
        {
          rel: 'apple-touch-startup-image',
          href: '/ios/apple-splash-1125-2436.png',
          media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        },
        {
          rel: 'apple-touch-startup-image',
          href: '/ios/apple-splash-828-1792.png',
          media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        },
        {
          rel: 'apple-touch-startup-image',
          href: '/ios/apple-splash-750-1334.png',
          media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        },
        {
          rel: 'apple-touch-startup-image',
          href: '/ios/apple-splash-640-1136.png',
          media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        },
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
    'yandex-metrika-module-nuxt3',
    '@vite-pwa/nuxt',
    '@nuxtjs/sitemap',
    'nuxt-booster',
  ],

  pwa: {
    injectRegister: 'auto',
    registerType: 'prompt',

    client: {
      installPrompt: true,
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,jpeg,webp,JPG,ico,mp4,woff,woff2}'],
      cleanupOutdatedCaches: true,
      maximumFileSizeToCacheInBytes: 20000000,
      // skipWaiting: true,
      // clientsClaim: true,
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
      theme_color: '#4caf50',
      icons: [
        {
          src: 'pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: 'maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },

    // devOptions: {
    //   enabled: true,
    //   navigateFallback: undefined,
    //   suppressWarnings: true,
    //   type: 'module',
    // },
  },

  yandexMetrika: {
    id: '61348777',
    webvisor: true,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
  },

  scripts: {
    registry: {
      googleAnalytics: {
        id: 'G-FH5PQ388QW',
      },
    },
  },

  imports: {
    dirs: [
      'utils/**',
    ],
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  typescript: {
    strict: false,
    typeCheck: true,
  },

  vuetify: {
    moduleOptions: {},
    vuetifyOptions: {
      theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            colors: {
              primary: '#4caf50',
            },
          },
        },
      },
    },
  },

  i18n: {
    defaultLocale: 'ru',
    strategy: 'prefix_and_default',
    locales: [
      { code: 'ru', name: 'Ru', iso: 'ru-RU', file: 'ru.ts' },
      { code: 'en', name: 'En', iso: 'en-US', file: 'en.ts' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'en'
    },
  },

  piniaPluginPersistedstate: {
    storage: 'localStorage',
    debug: true,
  },

  eslint: {
    checker: true,
  },

  image: {
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      xs: 0,     // < 600px (Extra small)
      sm: 600,   // 600px - 960px (Small)
      md: 960,   // 960px - 1280px (Medium)
      lg: 1280,  // 1280px - 1920px (Large)
      xl: 1920,  // 1920px - 2560px (Extra large)
      xxl: 2560,
    },
  },

  site: {
    url: 'https://samomes.com',
    name: 'Samomes',
    exclude: [
      '/settings/',
    ],
  },

  booster: {

    detection: {
      performance: true,
      browserSupport: true,
    },

    performanceMetrics: {
      device: {
        hardwareConcurrency: { min: 2, max: 48 },
        deviceMemory: { min: 2 },
      },
      timing: {
        fcp: 800,
        dcl: 1200,
      },
    },

    // fonts: [{
    //   family: 'Font A',
    //   locals: ['Font A'],
    //   fallback: ['Arial', 'sans-serif'],
    //   variances: [
    //     {
    //       style: 'normal',
    //       weight: 400,
    //       sources: [
    //         { src: '@/assets/fonts/font-a-regular.woff', type:'woff' },
    //         { src: '@/assets/fonts/font-a-regular.woff2', type:'woff2' },
    //       ],
    //     }, {
    //       style: 'italic',
    //       weight: 400,
    //       sources: [
    //         { src: '@/assets/fonts/font-a-regularItalic.woff', type:'woff' },
    //         { src: '@/assets/fonts/font-a-regularItalic.woff2', type:'woff2' },
    //       ],
    //     }, {
    //       style: 'normal',
    //       weight: 700,
    //       sources: [
    //         { src: '@/assets/fonts/font-a-700.woff', type:'woff' },
    //         { src: '@/assets/fonts/font-a-700.woff2', type:'woff2' },
    //       ],
    //     },
    //   ],
    // }],

    targetFormats: ['webp', 'avif', 'jpg|jpeg|png|gif'],

    // componentAutoImport: false,
    // componentPrefix: undefined,

    /**
     * IntersectionObserver rootMargin for Compoennts and Assets
     */
    lazyOffset: {
      component: '0%',
      asset: '0%',
    },

  // image: {
  //   screens: {
  //     default: 320,
  //     xxs: 480,
  //     xs: 576,
  //     sm: 768,
  //     md: 996,
  //     lg: 1200,
  //     xl: 1367,
  //     xxl: 1600,
  //     '4k': 1921,
  //   },
  //
  //   // domains: ['img.youtube.com', 'i.vimeocdn.com'],
  //   //
  //   // alias: {
  //   //   youtube: 'https://img.youtube.com',
  //   //   vimeo: 'https://i.vimeocdn.com',
  //   // }
  // },
  },
});
