import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage'
import router from '../router'
import * as moreActions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  auth: ls.getItem('auth'),
  user: ls.getItem('user'),
  articles: ls.getItem('articles'),
  searchValue: '',
  origin: location.origin
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
  },
  UPDATE_SEARCH_VALUE(state, searchValue) {
    state.searchValue = searchValue
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
  updateUser({ state, commit }, user) {
    const stateUser = state.user

    if (stateUser && typeof stateUser === 'object') {
      user = { ...stateUser, ...user }
    }

    commit('UPDATE_USER', user)
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
