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

export const getArticlesByFilter = (state, getters) => (filter) => {
  let articles = getters.computedArticles
  let filteredArticles = []

  if (Array.isArray(articles)) {
    filteredArticles = articles.map(article => ({ ...article }))

    switch(filter) {
      case 'excellent':
        filteredArticles = getters.getArticlesByUid(1)
        break
      case 'vote':
        filteredArticles.sort((a, b) => {
          const alikeUsers = Array.isArray(a.likeUsers) ? a.likeUsers : []
          const blikeUsers = Array.isArray(b.likeUsers) ? b.likeUsers : []

          return blikeUsers.length - alikeUsers.length
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
