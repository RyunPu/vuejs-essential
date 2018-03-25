<template>
  <div class="col-md-9 left-col pull-right">
    <div class="panel article-body content-body">
      <h1 class="text-center">{{ title }}</h1>
      <div class="article-meta text-center">
        <i class="fa fa-clock-o"></i>
        <abbr>{{ date | moment('from', { startOf: 'minute' }) }}</abbr>
      </div>
      <div class="entry-content">
        <div class="content-body entry-content panel-body ">
          <div class="markdown-body" v-html="content"></div>

          <div class="panel-footer operate">
            <div v-if="auth" class="actions">
              <a @click="deleteArticle" class="admin" href="javascript:;"><i class="fa fa-trash-o"></i></a>
              <a @click="editArticle" class="admin" href="javascript:;"><i class="fa fa-pencil-square-o"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="votes-container panel panel-default padding-md">
      <div class="panel-body vote-box text-center">
        <div class="btn-group">
          <a @click="vote" href="javascript:;" class="vote btn btn-primary popover-with-html" :class="voteClass">
            <i class="fa fa-thumbs-up"></i> {{ voteClass ? '已赞' : '点赞' }}
          </a>
        </div>
        <div class="voted-users">
          <div class="user-lists">
            <span v-for="user in votes">
              <img :src="user.avatar" class="img-thumbnail avatar avatar-middle" :class="{ 'animated swing' : user.uid === 1 }">
            </span>
          </div>
          <div v-if="!votes.length" class="vote-hint">成为第一个点赞的人吧 😄</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde'
import hljs from 'highlight.js'
import emoji from 'node-emoji'
import { mapState } from 'vuex'

export default {
  name: 'Content',
  data() {
    return {
      title: '',
      content: '',
      date: '',
      votes: [],
      voteClass: ''
    }
  },
  computed: mapState([
    'auth',
    'user',
    'articles'
  ]),
  created() {
    const articleId = this.$route.params.articleId
    const post = this.$store.getters.getArticleById(articleId)

    if (post) {
      let { title, content, date, votes } = post[0]

      this.title = title
      this.date = date
      content = emoji.emojify(content, name => name)
      this.content = SimpleMDE.prototype.markdown(content)
      this.votes = votes ? votes : []
      this.voteClass = this.votes.length ? 'active' : ''

      this.$nextTick(() => {
        this.$el.querySelectorAll('pre code').forEach((el) => {
          hljs.highlightBlock(el)
        })
      })
    }

    this.articleId = articleId
  },
  methods: {
    vote(e) {
      if (!this.auth) {
        this.$swal({
          text: '需要登录以后才能执行此操作。',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'rgb(140,212,245)',
          cancelButtonColor: 'rgb(193,193,193)',
          confirmButtonText: '前往登录',
        }).then((res) => {
          if (res.value) {
            this.$router.push('/auth/login')
          }
        })
      } else {
        const target = e.currentTarget
        const active = target.classList.contains('active')
        const articleId = this.articleId

        if (active) {
          this.voteClass = ''
          this.$store.dispatch('vote', { articleId })
        } else {
          this.voteClass = 'active animated rubberBand'
          this.$store.dispatch('vote', { articleId, like: true })
        }
      }
    },
    editArticle() {
      this.$router.push({ name: 'Edit', params: { articleId: this.articleId } })
    },
    deleteArticle() {
      this.$swal({
        text: '你确定要删除此内容吗?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgb(140,212,245)',
        cancelButtonColor: 'rgb(193,193,193)',
        confirmButtonText: '删除',
      }).then((res) => {
        if (res.value) {
          this.$store.dispatch('post', { articleId: this.articleId })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
