import Vue from 'vue';
import Router from 'vue-router';
import { domain, fromNow } from './filters';
import App from './components/App.vue';
import NewsView from './components/NewsView.vue';

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
    path: '*',
    redirect: '/news/1',
  }],
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});