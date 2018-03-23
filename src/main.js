import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueSweetalert2 from './plugins/vue-sweetalert2'
import Message from './plugins/message'
import './directives'
import './components'
import './filters'

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
