<template>
  <div>
    <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>

    <div class="col-md-9 topics-index main-col">
      <div class="panel panel-default">
        <div class="panel-heading">
          <!-- <ul class="list-inline topic-filter">
            <li><a href="/topics?filter=default" class="active">活跃</a></li>
            <li><a href="/topics?filter=excellent">精华</a></li>
            <li><a href="/topics?filter=vote">投票</a></li>
            <li><a href="/topics?filter=recent">最近</a></li>
            <li><a href="/topics?filter=noreply">零回复</a></li>
          </ul> -->
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
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false, // 是否显示消息，默认不显示
      articles: [], // 文章列表
      filter: 'default', // 默认过滤方式
      filters: [ // 过滤方式列表
        { filter: 'default', name: '活跃', title: '最后回复排序'},
        { filter: 'excellent', name: '精华', title: '只看加精的话题'},
        { filter: 'vote', name: '投票', title: '点赞数排序'},
        { filter: 'recent', name: '最近', title: '发布时间排序'},
        { filter: 'noreply', name: '零回复', title: '无人问津的话题'}
      ],
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

      vm.showDataByFilter(to.query.filter)
    })
  },
  computed: {
    ...mapState([
      'auth',
      'user'
    ])
  },
  watch: {
    auth(value) {
      if (!value) {
        this.showMsg('操作成功')
      }
    },
    '$route'(to) {
      this.showDataByFilter(to.query.filter)
    }
  },
  methods: {
    showMsg(msg, type = 'success') {
      this.msg = msg
      this.msgType = type
      this.msgShow = true
    },
    showDataByFilter(filter = 'default') {
      this.filter = filter
      this.articles = this.$store.getters.getArticlesByFilter(filter)
    }
  }
}
</script>

<style scoped>

</style>
