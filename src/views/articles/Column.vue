<template>
  <div class="blog-container">
    <div class="blog-pages">
      <router-view/>

      <div class="col-md-3 main-col pull-left">
        <div class="panel panel-default corner-radius">
          <div class="panel-body text-center topic-author-box blog-info">
            <div class="image blog-cover">
              <router-link :to="`/${userName}`">
                <img :src="userAvatar" class="avatar-112 avatar img-thumbnail">
              </router-link>
            </div>
            <div class="blog-name">
              <h4>
                <router-link :to="`/${userName}`">{{ userName }} 的专栏</router-link>
              </h4>
            </div>
            <hr>
            <router-link :to="`/${userName}`">
              <li class="list-group-item"><i class="text-md fa fa-list-ul"></i> 专栏文章（{{ articleNum }}）</li>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Column',
  data() {
    return {
      userName: '', //  对应用户姓名
      userAvatar: '', //  对应用户头像
      articles: [] //  对应用户文章
    }
  },
  computed: {
    ...mapState([
      'user'
    ]),
    articleNum() {
      return this.articles.length
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 确认导航到目标页面时，使用 to.params 设置当前数据
      vm.setDataByParams(to.params)
    })
  },
  watch: {
    '$route'(to) {
      // 在子页面之间相互切换时，使用 to.params 设置当前数据
      this.setDataByParams(to.params)
    }
  },
  methods: {
    setDataByParams(params) {
      const user = params.user
      const articleId = params.articleId
      // 当前文章
      const article = this.$store.getters.getArticleById(articleId)

      // 存在当前文章时，使用当前文章的 uname 获取对应用户文章
      if (article) {
        this.userName = article.uname
        this.userAvatar = article.uavatar
        this.articles = this.$store.getters.getArticlesByUid(null, article.uname)
      } else if (user) {
        // 不存在当前文章时，使用路由的 user 获取对应用户文章
        const articles = this.$store.getters.getArticlesByUid(null, user)

        if (articles.length) {
          this.userName = articles[0].uname
          this.userAvatar = articles[0].uavatar
        } else if (this.user) {
          this.userName = this.user.name
          this.userAvatar = this.user.avatar
        }

        this.articles = articles
      }
    }
  }
}
</script>

<style scoped>
.blog-container { margin-top: 20px;}
</style>
