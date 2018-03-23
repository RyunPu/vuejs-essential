import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage'
import router from '../router'

Vue.use(Vuex)

const state = {
  auth: ls.getItem('auth'),
  user: ls.getItem('user'),
  articles: ls.getItem('articles')
}

const getters = {
  getArticleById: (state) => (id) => {
    let articles = state.articles

    if (Array.isArray(articles)) {
      articles = articles.filter(article => parseInt(id) === article.articleId)
      return articles.length ? articles : null
    } else {
      return null
    }
  }
}

const mutations = {
  UPDATE_AUTH(state, auth) {
    state.auth = auth
    ls.setItem('auth', auth)
  },
  UPDATE_USER(state, user) {
    state.user = user
    ls.setItem('user', user)
  },
  UPDATE_ARTICLES(state, articles) {
    state.articles = articles
    ls.setItem('articles', articles)
  }
}

const actions = {
  login({ commit }, user) {
    commit('UPDATE_AUTH', true)
    if (user) commit('UPDATE_USER', user)
    router.push('/')
  },
  logout({ commit }) {
    commit('UPDATE_AUTH', false)
    router.push({ name: 'Home', params: { logout: true } })
  },
  post({ commit, state }, { article, create }) {
    let articles = state.articles

    if (!Array.isArray(articles)) articles = []

    let articleId
    const uid = 1
    const { title, content } = article
    const date = new Date()

    if (create) {
      articleId = articles.length + 1

      articles.push({
        articleId,
        uid,
        title,
        content,
        date
      })
    }

    commit('UPDATE_ARTICLES', articles)
    router.push({ name: 'Content', params: { articleId, showMsg: true } })
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
