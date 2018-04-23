<template>
  <div>
    <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>

    <div class="col-md-9 topics-index main-col">
      <div class="panel panel-default">
        <div class="panel-heading">
          <ul class="list-inline topic-filter">
            <li v-for="item in filters">
              <router-link v-title="item.title" :class="{ active: filter === item.filter }" :to="`/topics?filter=${item.filter}`">{{ item.name }}</router-link>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>

        <div class="panel-body remove-padding-horizontal">
          <ul class="list-group row topic-list">
            <li v-for="article in articles" :key="article.articleId" class="list-group-item">
              <router-link :to="`/articles/${article.articleId}/content`" tag="div" class="reply_count_area hidden-xs pull-right">
                <div class="count_set">
                  <span class="count_of_votes" title="投票数">{{ article.likeUsers ? article.likeUsers.length : 0 }}</span>
                  <span class="count_seperator">/</span>
                  <span class="count_of_replies" title="回复数">{{ article.comments ? article.comments.length : 0 }}</span>
                  <span class="count_seperator">|</span>
                  <abbr class="timeago">{{ article.date | moment('from') }}</abbr>
                </div>
              </router-link>
              <router-link :to="`/${article.uname}`" tag="div" class="avatar pull-left">
                <img :src="article.uavatar" class="media-object img-thumbnail avatar avatar-middle">
              </router-link>
              <router-link :to="`/articles/${article.articleId}/content`" tag="div" class="infos">
                <div class="media-heading">
                  {{ article.title }}
                </div>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="panel-footer text-right remove-padding-horizontal pager-footer">
          <Pagination :currentPage="currentPage" :total="total" :pageSize="pageSize" :onPageChange="changePage" />
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      msg: '',
      msgType: '',
      msgShow: false,
      articles: [],
      filter: 'default',
      filters: [
        { filter: 'default', name: '活跃', title: '最后回复排序'},
        { filter: 'excellent', name: '精华', title: '只看加精的话题'},
        { filter: 'vote', name: '投票', title: '点赞数排序'},
        { filter: 'recent', name: '最近', title: '发布时间排序'},
        { filter: 'noreply', name: '零回复', title: '无人问津的话题'}
      ],
      total: 0, // 文章总数
      pageSize: 10, // 每页条数
    }
  },
  beforeRouteEnter(to, from, next) {
    const fromName = from.name
    const logout = to.params.logout

    next(vm => {
      if (vm.$store.state.auth) {
        switch (fromName) {
          case 'Register':
            vm.showMsg('注册成功')
            break
          case 'Login':
            vm.showMsg('登录成功')
            break
        }
      } else if (logout) {
        vm.showMsg('操作成功')
      }

      vm.setDataByFilter(to.query.filter)
    })
  },
  computed: {
    ...mapState([
      'auth',
      'user'
    ]),
    currentPage() {
      return parseInt(this.$route.query.page) || 1
    }
  },
  watch: {
    auth(value) {
      if (!value) {
        this.showMsg('操作成功')
      }
    },
    '$route'(to) {
      this.setDataByFilter(to.query.filter)
    }
  },
  methods: {
    showMsg(msg, type = 'success') {
      this.msg = msg
      this.msgType = type
      this.msgShow = true
    },
    setDataByFilter(filter = 'default') {
      const pageSize = this.pageSize
      const currentPage = this.currentPage
      const allArticles = this.$store.getters.getArticlesByFilter(filter)

      this.filter = filter
      this.total = allArticles.length
      this.articles = allArticles.slice(pageSize * (currentPage - 1), pageSize * currentPage)
    },
    changePage(page) {
      this.$router.push({ query: { ...this.$route.query, page } })
    }
  }
}
</script>

<style scoped>

</style>
