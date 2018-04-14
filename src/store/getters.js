export const getArticlesByUid = (state) => (uid) => {
  let articles = state.articles

  if (Array.isArray(articles)) {
    articles = articles.filter(article => parseInt(uid) === parseInt(article.uid))
  } else {
    articles = []
  }

  return articles
}
