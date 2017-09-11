import Firebase from 'firebase/app';
import Database from 'firebase/database';
import { EventEmitter } from 'events';
import Promise from 'bluebird';

const config = {
  databaseURL: 'https://hacker-news.firebaseio.com'
};
Firebase.initializeApp(config);
const version = '/v0';
// ref()でデータベース内のルート、または子の場所を参照できる。
// 今回は/v0を参照するので、https://hacker-news.firebaseio.com/v0/になる
const api = Firebase.database().ref(version);
const itemsCache = Object.create(null);
const store = new EventEmitter();
const storiesPerPage = store.storiesPerPage = 30;

let topStoryIds = [];

/**
 * 100個のtopstoriesをリアルタイム購読する
 * topstoriesのidをローカルにキャッシュする
 */
api.child('topstories').on('value', snapshot => {
  topStoryIds = snapshot.val();
  store.emit('topstories-updated')
});

/**gst
 * 指定したidのitemデータをフェッチする
 *
 * @param {Number} id
 * @returns {Promise}
 */
store.fetchItem = id => {
  return new Promise((resolve, reject) => {
    if (itemsCache[id]) {
      resolve(itemsCache[id])
    } else {
      api.child('item/' + id).once('value', snapshot => {
        const story = itemsCache[id] = snapshot.val();
        resolve(story);
      }, reject);
    }
  })
};

/**
 * アイテムリストをフェッチする
 *
 * @param {Array<number>} ids
 * @returns {Promise}
 */
store.fetchItems = ids => {
  if (!ids || !ids.length) {
    return Promise.resolve([])
  } else {
    return Promise.all(ids.map(id => store.fetchItem(id)));
  }
};

/**
 * 指定したページのアイテムリストをフェッチする
 *
 * @param page
 * @returns {Promise}
 */
store.fetchItemsByPage = page => {
  const start = (page - 1) * storiesPerPage;
  const end = page * storiesPerPage;
  const ids = topStoryIds.slice(start, end);

  return store.fetchItems(ids);
};

/**
 * 指定したidのユーザーを取得する
 *
 * @param id
 * @returns {Promise<any> | Promise}
 */
store.fetchUser = id => {
  return new Promise((resolve, reject) => {
    api.child('user/' + id).once('value', snapshot => {
      resolve(snapshot.val());
    }, reject);
  });
};
