<template>
  <div class="container main-container">
    <Message :type="msgType" :msg="msg" :show.sync="msgShow"/>

    <div class="col-md-9 topics-index main-col">
      <div class="panel panel-default">
        <div class="panel-heading">
          <ul class="list-inline topic-filter">
            <li><router-link id="default-filter" to="/topics?filter=default">活跃</router-link></li>
            <li><router-link to="/topics?filter=excellent">精华</router-link></li>
            <li><router-link to="/topics?filter=vote">投票</router-link></li>
            <li><router-link to="/topics?filter=recent">最近</router-link></li>
            <li><router-link to="/topics?filter=noreply">零回复</router-link></li>
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
      msgShow: false,
      msgType: '',
      msg: ''
    }
  },
  computed: {
    avatar() {
      return this.user && this.user.avatar
    },
    ...mapState([
      'auth',
      'user',
      'articles'
    ])
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
    initFilter(filter) {
      if (!filter) {
        filter = 'default'
        this.$nextTick(() => {
          document.querySelector('#default-filter').classList.add('active')
        })
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
