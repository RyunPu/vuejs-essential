import Vue from 'vue'
import App from './App'
import router from './router'
import './directives'
import './components'
import store from './store'
import VueSweetalert2 from './plugins/vue-sweetalert2'
import Message from './plugins/message'
import './filters'
import { mockArticles } from './mock/data'

Vue.use(VueSweetalert2)
Vue.use(Message)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// 是否加入测试数据
const isAddMockData = true
const userArticles = store.getters.getArticlesByUid(1)

if (isAddMockData) {
  store.commit('UPDATE_ARTICLES', [...userArticles, ...mockArticles(10)])
} else {
  store.commit('UPDATE_ARTICLES', userArticles)
}
