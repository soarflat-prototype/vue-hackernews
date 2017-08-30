import Vue from 'vue';
import Router from 'vue-router';
import { domain, fromNow } from './filters';

// プラグインをインストール
Vue.use(Router);

// グローバルフィルタに関数を登録する
Vue.filter('fromNow', fromNow);
Vue.filter('domain', domain);

const router = new Router();