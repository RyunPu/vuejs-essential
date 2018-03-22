import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const store = router.app.$options.store
  const auth = store.state.auth
  const articleId = to.params.articleId

  if ((auth && to.path.indexOf('/auth/') !== -1) ||
    (!auth && to.meta.auth) ||
    (articleId && !store.getters.getArticleById(articleId))
  ) {
    next('/')
  } else {
    next()
  }
})

export default router
