const path = require('path');

module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.resolve.alias.set('api-client$', path.resolve(__dirname, `src/api/server`));
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/styles/_default_files.scss";`
      }
    }
  },
  transpileDependencies: ['vuex-module-decorators', 'miragejs', 'vuex-persist'],
  lintOnSave: false
};
