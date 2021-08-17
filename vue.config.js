module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  transpileDependencies: [
    'vuetify',
  ],
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/styles/_variables.sass"',
      },
    },
  },
  pwa: {
    workboxOptions: {
      exclude: [/CNAME/, /\.map$/],
    },
    manifestOptions: {
      name: 'Samomes',
      short_name: 'Samomes',
      start_url: '/?standalone=true',
      scope: '/',
    },
  },
};
