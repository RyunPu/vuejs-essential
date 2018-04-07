import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/auth/register',
      name: 'Register',
      component: () => import('@/views/auth/Register')
    }
  ]
})
