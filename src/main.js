import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueSweetalert2 from './plugins/vue-sweetalert2'
import Message from './plugins/message'
import './directives'
import './components'
import './filters'
import { mockArticles } from './mock/data'

// 是否加入测试数据
const addMockData = true
const userArticles = store.getters.getArticlesByUid(1)
const localArticles = userArticles ? userArticles : []

if (addMockData) {
  store.commit('UPDATE_ARTICLES', [...localArticles, ...mockArticles(10)])
} else {
  store.commit('UPDATE_ARTICLES', localArticles)
}

Vue.use(VueSweetalert2)
Vue.use(Message)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
