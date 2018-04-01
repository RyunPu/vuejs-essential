import Mock from 'mockjs'
import ls from '../utils/localStorage'
import store from '../store'

Mock.mock('/users/active', 'get', () => {
  const localArticles = ls.getItem('articles')
  let articles = Array.isArray(localArticles) ? localArticles : []
  let comments = []

  articles.map((article) => {
    comments = [...comments, ...(Array.isArray(article.comments) ? article.comments : [])]
  })

  comments = comments.reduce((a, c) => {
    a[c.uname] = a[c.uname] || {}
    a[c.uname].num = ++a[c.uname].num || 1
    a[c.uname].avatar = c.uavatar
    return a
  }, {})

  return comments
})

Mock.mock('/articles/hot', 'post', (options) => {
  const localArticles = store.getters.getArticlesByFilter('noreply')
  const articles = Array.isArray(localArticles) ? localArticles.reverse() : []
  const hotArticles = articles.filter((article) => (new Date() - new Date(article.date) < 604800000))
  let num = 10

  if (options.body) {
    try {
      num = JSON.parse(options.body).num
    } catch (e) {}
  }

  return hotArticles.slice(0, num)
})
