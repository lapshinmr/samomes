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
};
