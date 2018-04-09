import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  const app = router.app
  const store = app.$options.store
  const auth = store.state.auth

  if (
    (auth && to.path.indexOf('/auth/') !== -1) ||
    (!auth && to.meta.auth)
  ) {
    next('/')
  } else {
    next()
  }

  app.$message.hide()
})

export default router
