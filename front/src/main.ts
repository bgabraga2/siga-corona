import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueYouTubeEmbed from 'vue-youtube-embed';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';
import InfiniteLoading from 'vue-infinite-loading';
import vueGtm from './core/vue-gtm.js';
import VueClipboard from 'vue-clipboard2';
import 'whatwg-fetch';

Vue.use(VueClipboard);
Vue.use(vueGtm, {
  id: process.env.VUE_APP_GTM_KEY
});

Vue.use(VueMoment, {
  moment
});
Vue.use(VueYouTubeEmbed);

Vue.use(InfiniteLoading, {
  slots: {
    noMore:
      'Ops, você chegou até o final da página. A cada 15 minutos estaremos atualizando as informações. Fique ligado #SigaCorona'
  }
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
