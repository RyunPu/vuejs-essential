<template>
  <div class="container main-container">
    <Message :type="msgType" :msg="msg" :show.sync="msgShow"/>

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
                  <span class="count_of_votes" title="投票数">{{ article.votes ? article.votes.length : 0 }}</span>
                  <span class="count_seperator">/</span>
                  <span class="count_of_replies" title="回复数">{{ article.comments ? article.comments.length : 0 }}</span>
                  <span class="count_seperator">|</span>
                  <abbr class="timeago">{{ article.date | moment('from') }}</abbr>
                </div>
              </router-link>
              <router-link v-if="article.avatar || avatar" :to="`/${article.uname ? article.uname : user.name}`" tag="div" class="avatar pull-left">
                <img :src="article.avatar || avatar" class="media-object img-thumbnail avatar avatar-middle">
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

    <Sidebar/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import Sidebar from '@/components/layouts/Sidebar'

export default {
  name: 'Home',
  components: {
    Pagination,
    Sidebar
  },
  data() {
    return {
      msgShow: false,
      msgType: '',
      msg: '',
      articles: null,
      filter: 'default',
      filters: [
        { filter: 'default', name: '活跃', title: '最后回复排序'},
        { filter: 'excellent', name: '精华', title: '只看加精的话题'},
        { filter: 'vote', name: '投票', title: '点赞数排序'},
        { filter: 'recent', name: '最近', title: '发布时间排序'},
        { filter: 'noreply', name: '零回复', title: '无人问津的话题'}
      ],
      total: 0,
      pageSize: 10
    }
  },
  computed: {
    avatar() {
      return this.user && this.user.avatar
    },
    ...mapState([
      'auth',
      'user'
    ]),
    currentPage() {
      return parseInt(this.$route.query.page) || 1
    }
  },
  beforeRouteEnter(to, from, next) {
    const name = from.name
    const logout = to.params.logout

    next(vm => {
      if (vm.$store.state.auth) {
        switch (name) {
          case 'Register':
            vm.showMsg('注册成功！')
            break
          case 'Login':
            vm.showMsg('登录成功！')
            break
        }
      } else if (logout) {
        vm.showMsg('操作成功！')
      }

      vm.initFilter(to.query.filter)
    })
  },
  watch: {
    auth() {
      this.showMsg('操作成功！')
    },
    '$route'(to) {
      this.initFilter(to.query.filter)
    }
  },
  methods: {
    changePage(page) {
      this.$router.push({ query: { ...this.$route.query, page } })
    },
    initFilter(filter) {
      if (!filter) {
        filter = 'default'
      }

      this.filter = filter

      const page = this.$route.query.page || 1
      const pageSize = this.pageSize || 10
      const totalArticles = this.$store.getters.getArticlesByFilter(filter)

      if (Array.isArray(totalArticles)) {
        this.articles = totalArticles.slice(pageSize * (page - 1), pageSize * page)
        this.total = totalArticles.length
      }
    },
    showMsg(msg, type = 'success') {
      this.msgType = type
      this.msg = msg
      this.msgShow = true
    }
  }
}
</script>

<style scoped>
.fa-user-circle { font-size: 30px; vertical-align: middle;}
.topic-filter .router-link-exact-active { border-bottom: 2px solid #fbbd08;}
</style>
