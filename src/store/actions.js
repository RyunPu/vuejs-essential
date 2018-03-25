import router from '../router'

export const vote = ({ commit, state }, { articleId, like }) => {
  let articles = state.articles

  if (!Array.isArray(articles)) articles = []

  for (const [index, article] of articles.entries()) {
    if (parseInt(article.articleId) === parseInt(articleId)) {
      let newArticle = articles[index]
      let votes = Array.isArray(newArticle.votes) ? newArticle.votes : []

      if (like) {
        const currentVote = votes.filter(vote => parseInt(vote.uid) === 1)

        if (!currentVote.length) {
          votes.push({
            uid: 1,
            avatar: state.user.avatar
          })
        }
      } else {
        for (const [index, vote] of votes.entries()) {
          if (parseInt(vote.uid) === 1) {
            votes.splice(index, 1)
            break
          }
        }
      }

      newArticle.votes = votes
      break
    }
  }

  commit('UPDATE_ARTICLES', articles)
}

export const post = ({ commit, state }, { article, articleId }) => {
  let articles = state.articles

  if (!Array.isArray(articles)) articles = []

  if (article) {
    const uid = 1
    const { title, content } = article
    let date = new Date()

    if (!articleId) {
      const lastArticle = articles[articles.length - 1]

      if (lastArticle && lastArticle.articleId) {
        articleId = parseInt(lastArticle.articleId) + 1
      } else {
        articleId = articles.length + 1
      }

      articles.push({
        articleId,
        uid,
        title,
        content,
        date
      })
    } else {
      for (const [index, article] of articles.entries()) {
        if (parseInt(article.articleId) === parseInt(articleId)) {
          date = article.date
          articles[index] = {
            articleId,
            uid,
            title,
            content,
            date
          }

          break
        }
      }
    }

    commit('UPDATE_ARTICLES', articles)
    router.push({ name: 'Content', params: { articleId, showMsg: true } })
  } else {
    for (const [index, article] of articles.entries()) {
      if (parseInt(article.articleId) === parseInt(articleId)) {
        articles.splice(index, 1)
        break
      }
    }

    commit('UPDATE_ARTICLES', articles)
    router.push({ name: 'Home', params: { showMsg: true } })
  }
}
