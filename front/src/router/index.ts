import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Post from '../views/Post.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/posts/:id',
    name: 'Single',
    component: Post
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  router.app.$gtm.sendCustomEvent('virtual-page-view', {
    page: to.path
  });
  return next();
});

export default router;
