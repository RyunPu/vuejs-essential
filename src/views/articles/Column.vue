<template>
  <div class="container main-container blog-container">
    <div class="blog-pages">
      <router-view></router-view>
      <div class="col-md-3 main-col pull-left">
        <div class="panel panel-default corner-radius">
          <div class="panel-body text-center topic-author-box blog-info">
            <div class="image blog-cover">
              <router-link :to="`/${userName}`">
                <img v-if="articles && articles.length" :src="articles[0].avatar || columnPic" class="avatar-112 avatar img-thumbnail">
                <img v-else-if="columnPic" :src="columnPic" class="avatar-112 avatar img-thumbnail">
                <i v-else class="fa fa-user-circle avatar-100 avatar img-thumbnail"></i>
              </router-link>
            </div>
            <div class="blog-name">
              <h4 v-if="userName">
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
      articles: [],
      userName: ''
    }
  },
  computed: {
    columnPic() {
      return this.user && (this.user.columnPic || this.user.avatar)
    },
    articleNum() {
      return this.articles ? this.articles.length : 0
    },
    ...mapState([
      'user'
    ])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const user = to.params.user
      const articleId = to.params.articleId
      const post = vm.$store.getters.getArticleById(articleId)

      if (post) {
        vm.articles = vm.$store.getters.getArticlesByUid(post[0].uid)
        vm.userName = post[0].uname || vm.user.name
      } else if (user) {
        vm.getData(user)
      }

      window.scrollTo(0, 0)
    })
  },
  watch: {
    '$route'(to) {
      this.getData(to.params.user)
    }
  },
  methods: {
    getData(user) {
      if (user) {
        this.articles = this.$store.getters.getArticlesByUid(null, user)
        this.userName = user
      }
    }
  }
}
</script>

<style scoped>
.avatar-100 { font-size: 100px;}
</style>
