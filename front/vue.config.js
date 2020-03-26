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
  transpileDependencies: ['vue-tweet-embed', 'vue-youtube-embed', 'vue-instagram-embed'],
  lintOnSave: false
};
