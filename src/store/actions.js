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
          article = { ...article, ...{ title, content } }
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

// 参数 articleId 是文章 ID；isAdd 为 true 时点赞，为 false 时取消赞
export const like = ({ commit, state }, { articleId, isAdd }) => {
  // 仓库的文章
  let articles = state.articles
  // 点赞用户列表
  let likeUsers = []
  // 用户 ID，默认为 1
  const uid = 1

  if (!Array.isArray(articles)) articles = []

  for (let article of articles) {
    // 找到对应文章时
    if (parseInt(article.articleId) === parseInt(articleId)) {
      // 更新点赞用户列表
      likeUsers = Array.isArray(article.likeUsers) ? article.likeUsers : likeUsers

      if (isAdd) {
        // 是否已赞
        const isAdded = likeUsers.some(likeUser => parseInt(likeUser.uid) === uid)

        if (!isAdded) {
          // 在点赞用户列表中加入当前用户
          likeUsers.push({ uid })
        }
      } else {
        for (let likeUser of likeUsers) {
          // 找到对应点赞用户时
          if (parseInt(likeUser.uid) === uid) {
            // 删除点赞用户
            likeUsers.splice(likeUsers.indexOf(likeUser), 1)
            break
          }
        }
      }

      // 更新文章的点赞用户列表
      article.likeUsers = likeUsers
      break
    }
  }

  // 提交 UPDATE_ARTICLES 以更新所有文章
  commit('UPDATE_ARTICLES', articles)
  // 返回点赞用户列表
  return likeUsers
}
