import Mock from 'mockjs'
import ls from '../utils/localStorage'

// Mock.Random 用来生成各种随机数据
const Random = Mock.Random
const localArticles = ls.getItem('articles')
const localUser = ls.getItem('user')
const localUserName = localUser ? localUser.name : undefined
let nextArticleId = 1

if (Array.isArray(localArticles) && localArticles.length) {
  nextArticleId = parseInt(localArticles[localArticles.length - 1].articleId) + 1
}

// 生成测试文章，参数 num 是生成数量
export const mockArticles = (num = 10) => {
  const forbiddenNames = [localUserName, 'topics']
  let articles = []
  let unames = []

  // 限制生成数量，因为 localStorage 有储存限制
  num = num > 60 ? 60 : num

  // 生成测试文章，不包含点赞用户和评论
  const arr = [...Array(num)].forEach((article, index) => {
    // 随机生成一个常见的英文名
    let uname = Random.first()

    while (unames.indexOf(uname) !== -1 || forbiddenNames.indexOf(uname) !== -1) {
      uname = Random.first()
    }

    unames.push(uname)

    articles.push({
      uid: index + 2,
      articleId: nextArticleId + index,
      // 随机生成 10 - 20 字的中文标题
      title: Random.ctitle(10, 20),
      // 随机生成 3 - 5 个的中文段落
      content: Random.cparagraph(3, 5),
      date: new Date(),
      likeUsers: [],
      comments: [],
      uname
    })
  })

  // 在测试文章中加入点赞用户和评论
  articles.forEach((article, index) => {
    let likeUsers = []
    let comments = []
    let randomArticles = getRandomArticles(articles)

    // 加入点赞用户
    randomArticles.forEach((article, index) => {
      likeUsers.push({
        uid: article.uid,
        uname: article.uname
      })
    })

    randomArticles = getRandomArticles(articles)

    // 加入评论
    randomArticles.forEach((article, index) => {
      comments.push({
        uid: article.uid,
        commentId: index + 1,
        // 随机生成 5 - 10 字的中文文本
        content: Random.csentence(5, 10),
        date: article.date,
        uname: article.uname
      })
    })

    article.likeUsers = likeUsers
    article.comments = comments
  })

  // 返回测试文章
  return articles
}

// 获取指定数量的随机的不重复文章
function getRandomArticles(articles, num = 5) {
  const randomNum = Math.floor(Math.random() * num + 1)
  const randomArticles = [...Array(randomNum)].map(() => articles[Math.floor(Math.random() * articles.length)])
  // Set 类似于数组，但其成员的值都是唯一的，因此可以使用下面的方法去重
  return [...new Set(randomArticles)]
}
