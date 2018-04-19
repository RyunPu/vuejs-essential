export const getArticlesByUid = (state, getters) => (uid, user) => {
  let articles = getters.computedArticles

  if (Array.isArray(articles)) {
    if (user) {
      if (state.user && state.user.name === user) {
        uid = 1
      } else {
        for (const article of articles) {
          if (article.uname === user) {
            uid = article.uid
            break
          }
        }
      }
    }

    articles = articles.filter(article => parseInt(uid) === parseInt(article.uid))
  } else {
    articles = []
  }

  return articles
}

export const computedArticles = (state) => {
  let articles = state.articles
  let newArticles = []

  const setUserInfo = function(isCurrentUser) {
    const userName = state.user && state.user.name
    const userAvatar = state.user && state.user.avatar
    const avatarUrl = 'https://api.adorable.io/avatars/200/'

    if (isCurrentUser) {
      this.uname = userName
      this.uavatar = userAvatar
    } else {
      this.uavatar = `${avatarUrl}${this.uname}`
    }
  }

  if (Array.isArray(articles)) {
    newArticles = articles.map(article => ({ ...article }))
    newArticles.forEach((article) => {
      const comments = article.comments
      const likeUsers = article.likeUsers

      if (article.uid === 1) {
        setUserInfo.call(article, true)
      } else {
        setUserInfo.call(article)
      }

      if (Array.isArray(comments)) {
        comments.forEach((comment) => {
          if (comment.uid === 1) {
            setUserInfo.call(comment, true)
          } else {
            setUserInfo.call(comment)
          }
        })
      }

      if (Array.isArray(likeUsers)) {
        likeUsers.forEach((likeUser) => {
          if (likeUser.uid === 1) {
            setUserInfo.call(likeUser, true)
          } else {
            setUserInfo.call(likeUser)
          }
        })
      }
    })
  }

  return newArticles
}
