import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueYouTubeEmbed from 'vue-youtube-embed';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';
import InfiniteLoading from 'vue-infinite-loading';

Vue.use(VueMoment, {
  moment
});
Vue.use(VueYouTubeEmbed);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
