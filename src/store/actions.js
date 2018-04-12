import router from '../router'

export const post = ({ commit, state }, { article, articleId }) => {
  let articles = state.articles

  if (!Array.isArray(articles)) articles = []

  if (article) {
    const uid = 1
    const { title, content } = article
    const date = new Date()

    if (articleId === undefined) {
      const lastArticle = articles[articles.length - 1]

      if (lastArticle) {
        articleId = parseInt(lastArticle.articleId) + 1
      } else {
        articleId = articles.length + 1
      }

      articles.push({
        uid,
        articleId,
        title,
        content,
        date
      })
    } else {
      for (let article of articles) {
        if (parseInt(article.articleId) === parseInt(articleId)) {
          article.title = title
          article.content = content
          break
        }
      }
    }

    commit('UPDATE_ARTICLES', articles)
    router.push({ name: 'Content', params: { articleId, showMsg: true } })
  } else {
    for (let article of articles) {
      if (parseInt(article.articleId) === parseInt(articleId)) {
        articles.splice(articles.indexOf(article), 1)
        break
      }
    }

    commit('UPDATE_ARTICLES', articles)
    router.push({ name: 'Home', params: { showMsg: true } })
  }
}

export const like = ({ commit, state }, { articleId, isAdd }) => {
  let articles = state.articles
  let likeUsers = []

  if (!Array.isArray(articles)) articles = []

  for (let article of articles) {
    if (parseInt(article.articleId) === parseInt(articleId)) {
      likeUsers = Array.isArray(article.likeUsers) ? article.likeUsers : likeUsers

      if (isAdd) {
        const currentUser = likeUsers.filter(likeUser => parseInt(likeUser.uid) === 1)

        if (!currentUser.length) {
          likeUsers.push({
            uid: 1,
            avatar: state.user.avatar
          })
        }
      } else {
        for (let likeUser of likeUsers) {
          if (parseInt(likeUser.uid) === 1) {
            likeUsers.splice(likeUsers.indexOf(likeUser), 1)
            break
          }
        }
      }

      article.likeUsers = likeUsers
      break
    }
  }

  commit('UPDATE_ARTICLES', articles)
  return likeUsers
}

export const comment = ({ commit, state }, { comment, articleId, commentId }) => {
  let articles = state.articles
  let comments = []

  if (!Array.isArray(articles)) articles = []

  for (let article of articles) {
    if (parseInt(article.articleId) === parseInt(articleId)) {
      comments = Array.isArray(article.comments) ? article.comments : comments

      if (comment) {
        const uid = 1
        const { uname, uavatar, content } = comment
        const date = new Date()

        if (commentId === undefined) {
          const lastComment = comments[comments.length - 1]

          if (lastComment) {
            commentId = parseInt(lastComment.commentId) + 1
          } else {
            commentId = comments.length + 1
          }

          comments.push({
            uid,
            commentId,
            uname,
            uavatar,
            content,
            date
          })
        }
      }

      article.comments = comments
      break
    }
  }

  commit('UPDATE_ARTICLES', articles)
  return comments
}
