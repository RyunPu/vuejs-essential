import Mock from 'mockjs'
import ls from '../utils/localStorage'

const Random = Mock.Random
const localArticles = ls.getItem('articles')
const localUser = ls.getItem('user')
const userName = localUser ? localUser.name : null
let lastArticleId = 1

if (Array.isArray(localArticles)) {
  lastArticleId = localArticles[localArticles.length - 1].articleId + 1
}

export const mockArticles = (num = 20) => {
  let articles = []
  let unames = []

  const arr = [...Array(num)].map((article, index) => {
    let uname = Random.first()

    while (unames.indexOf(uname) !== -1 || uname === userName) {
      uname = Random.first()
    }

    unames.push(uname)

    articles.push({
      articleId: lastArticleId + index,
      uid: index + 2,
      uname: uname,
      title: Random.ctitle(10, 20),
      content: Random.cparagraph(5, 10),
      avatar: `https://api.adorable.io/avatars/200/${uname}.png`,
      date: new Date(),
      votes: [],
      comments: []
    })
  })

  articles.map((article, index) => {
    let votes = []
    let comments = []
    let randomArticles = getRandomArticles(articles)

    randomArticles.map((article, index) => {
      votes.push({
        uid: article.uid,
        avatar: article.avatar
      })
    })

    randomArticles = getRandomArticles(articles)

    randomArticles.map((article, index) => {
      comments.push({
        commentId: index + 1,
        uid: article.uid,
        uname: article.uname,
        content: Random.csentence(5, 10),
        uavatar: article.avatar,
        date: article.date
      })
    })

    article.votes = votes
    article.comments = comments
  })

  return articles
}

function getRandomArticles(articles, num = 5) {
  const randomNum = Math.floor(Math.random() * num + 1)
  return [...Array(randomNum)].map(() => articles[Math.floor(Math.random() * articles.length)])
}
