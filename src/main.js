import Vue from 'vue'
import App from './App'
import router from './router'
import './directives'
import './components'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
