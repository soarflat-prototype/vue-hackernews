import Vue from 'vue';
import Router from 'vue-router';
import { domain, fromNow } from './filters';
import App from './components/App.vue';
import NewsView from './components/NewsView.vue';
import ItemView from './components/ItemView.vue';
import UserView from './components/UserView.vue';

// プラグインをインストール
Vue.use(Router);

// グローバルフィルタに関数を登録する
Vue.filter('fromNow', fromNow);
Vue.filter('domain', domain);

const router = new Router({
  routes: [{
    path: '/news/:page',
    component: NewsView,
  }, {
    path: '/item/:id',
    component: ItemView,
  }, {
    path: '/user/:id',
    component: UserView,
  }, {
    path: '*',
    redirect: '/news/1',
  }],
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});