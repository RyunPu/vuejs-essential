import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage'
import router from '../router'
import * as moreActions from './actions'

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
      articles = articles.filter(article => parseInt(id) === parseInt(article.articleId))
      return articles.length ? articles : null
    } else {
      return null
    }
  },
  getArticlesByUid: (state) => (uid, user) => {
    let articles = state.articles

    if (Array.isArray(articles)) {
      if (user) {
        if (state.user && state.user.name === user) {
          uid = 1
        } else {
          for (const [index, article] of articles.entries()) {
            if (article.uname === user) {
              uid = article.uid
              break
            }
          }
        }
      }

      articles = articles.filter(article => parseInt(uid) === parseInt(article.uid))
      return articles.length ? articles : null
    } else {
      return null
    }
  },
  getArticlesByFilter: (state, getters) => (filter) => {
    let articles = state.articles
    let filteredArticles = null

    if (Array.isArray(articles)) {
      filteredArticles = articles.map(article => ({ ...article }))

      switch(filter) {
        case 'excellent':
          filteredArticles = getters.getArticlesByUid(1)
          break
        case 'vote':
          filteredArticles.sort((a, b) => {
            const aVotes = Array.isArray(a.votes) ? a.votes : []
            const bVotes = Array.isArray(b.votes) ? b.votes : []

            return bVotes.length - aVotes.length
          })

          break
        case 'recent':
          filteredArticles.reverse()
          break
        case 'noreply':
          filteredArticles.sort((a, b) => {
            const aComments = Array.isArray(a.comments) ? a.comments : []
            const bComments = Array.isArray(b.comments) ? b.comments : []

            return aComments.length - bComments.length
          })

          break
        default:
          filteredArticles.sort((a, b) => {
            const aComments = Array.isArray(a.comments) ? a.comments : []
            const bComments = Array.isArray(b.comments) ? b.comments : []
            const aCommentsLength = aComments.length
            const bCommentsLength = bComments.length

            if (aCommentsLength > 0) {
              if (bCommentsLength > 0) {
                return new Date(bComments[bCommentsLength - 1].date) - new Date(aComments[aCommentsLength - 1].date)
              } else {
                return -1
              }
            } else {
              return 1
            }
          })

          break
      }
    }

    return filteredArticles
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
  ...moreActions
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
