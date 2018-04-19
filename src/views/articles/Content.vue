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

          <div v-if="auth && uid === 1" class="panel-footer operate">
            <div class="actions">
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
          <a @click="like" href="javascript:;" class="vote btn btn-primary popover-with-html" :class="likeClass">
            <i class="fa fa-thumbs-up"></i> {{ likeClass ? '已赞' : '点赞' }}
          </a>
          <div class="or"></div>
          <button @click="showQrcode = true" class="btn btn-success"><i class="fa fa-heart"></i> 打赏</button>
        </div>
        <div class="voted-users">
          <div class="user-lists">
            <span v-for="likeUser in likeUsers">
              <router-link v-if="likeUser.uname" :to="`/${likeUser.uname}`" :src="likeUser.uavatar" tag="img" class="img-thumbnail avatar avatar-middle" :class="{ 'animated swing' : likeUser.uid === 1 }"></router-link>
              <router-link v-else-if="user" :to="`/${user.name}`" :src="user.avatar" tag="img" class="img-thumbnail avatar avatar-middle" :class="{ 'animated swing' : likeUser.uid === 1 }"></router-link>
            </span>
          </div>
          <div v-if="!likeUsers.length" class="vote-hint">成为第一个点赞的人吧 😄</div>
        </div>
      </div>
    </div>

		<Modal :show.sync="showQrcode" class="text-center">
      <div v-if="user" slot="title">
        <img :src="user.avatar" class="img-thumbnail avatar" width="48">
      </div>
      <div>
        <p class="text-md">如果你想学习更多前端的知识，VuejsCaff.com 是个不错的开始</p>
        <div class="payment-qrcode inline-block">
          <h5>扫一扫打开 VuejsCaff.com</h5>
          <p><qrcode-vue value="https://vuejscaff.com/" :size="160"></qrcode-vue></p>
        </div>
      </div>
      <div slot="footer">
        <div class="text-center">祝你学习愉快 :)</div>
      </div>
    </Modal>

    <div class="replies panel panel-default list-panel replies-index">
      <div class="panel-heading">
        <div class="total">
          回复数量: <b>{{ comments.length }}</b>
        </div>
      </div>
      <div class="panel-body">
        <transition-group name="fade" tag="ul" id="reply-list" class="list-group row">
          <li v-for="(comment, index) in comments" :key="comment.commentId" class="list-group-item media">
            <div class="avatar avatar-container pull-left">
              <router-link :to="`/${comment.uname}`">
                <img :src="comment.uavatar" class="media-object img-thumbnail avatar avatar-middle">
              </router-link>
            </div>
            <div class="infos">
              <div class="media-heading">
                <router-link :to="`/${comment.uname}`" class="remove-padding-left author rm-link-color">
                  {{ comment.uname }}
                </router-link>
                <span v-if="auth" class="operate pull-right">
                  <span v-if="comment.uid === 1">
                    <a href="javascript:;" @click="editComment(comment.commentId, index)"><i class="fa fa-edit"></i></a>
                    <span> ⋅ </span>
                    <a href="javascript:;" @click="deleteComment(comment.commentId)"><i class="fa fa-trash-o"></i></a>
                  </span>
                </span>
                <div class="meta">
                  <a :id="`reply${index + 1}`" :href="`#reply${index + 1}`" class="anchor">#{{ index + 1 }}</a>
                  <span> ⋅ </span>
                  <abbr class="timeago">
                    {{ comment.date | moment('from', { startOf: 'second' }) }}
                  </abbr>
                </div>
              </div>

              <div class="preview media-body markdown-reply markdown-body" v-html="comment.content"></div>
            </div>
          </li>
        </transition-group>
        <div v-show="!comments.length" class="empty-block">
          暂无评论~~
        </div>
      </div>
    </div>

    <div id="reply-box" class="reply-box form box-block">
      <div class="form-group comment-editor">
        <textarea v-if="auth" id="editor"></textarea>
        <textarea v-else disabled class="form-control" placeholder="需要登录后才能发表评论." style="height:172px"></textarea>
      </div>
      <div class="form-group reply-post-submit">
        <button id="reply-btn" :disabled="!auth" @click="comment" class="btn btn-primary">
          {{ commentId ? '保存编辑' : '回复' }}
        </button>
        <span v-show="commentId" class="help-inline btn-cancel" style="cursor:pointer" @click="cancelEditComment">取消编辑</span>
        <span v-show="!commentId" class="help-inline">Ctrl+Enter</span>
      </div>
      <div v-show="commentHtml" id="preview-box" class="box preview markdown-body" v-html="commentHtml"></div>
    </div>

  </div>
</template>

<script>
import SimpleMDE from 'simplemde'
import hljs from 'highlight.js'
import emoji from 'node-emoji'
import { mapState } from 'vuex'
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'Content',
  components: {
    QrcodeVue
  },
  data() {
    return {
      title: '', // 文章标题
      content: '', // 文章内容
      date: '', // 文章创建时间
      uid: 1, // 用户 ID
      likeUsers: [], // 点赞用户列表
      likeClass: '', // 点赞样式
      showQrcode: false, // 是否显示打赏弹窗
      commentHtml: '', // 评论 HTML
      comments: [], // 评论列表
      commentId: undefined, // 评论 ID
    }
  },
  computed: {
    ...mapState([
      'auth',
      'user'
    ])
  },
  created() {
    const articleId = this.$route.params.articleId
    const article = this.$store.getters.getArticleById(articleId)

    if (article) {
      let { uid, title, content, date, likeUsers, comments } = article

      this.uid = uid
      this.title = title
      this.content = SimpleMDE.prototype.markdown(emoji.emojify(content, name => name))
      this.date = date
      this.likeUsers = likeUsers || []
      this.likeClass = this.likeUsers.some(likeUser => likeUser.uid === 1) ? 'active' : ''
      this.renderComments(comments)

      this.$nextTick(() => {
        this.$el.querySelectorAll('pre code').forEach((el) => {
          hljs.highlightBlock(el)
        })
      })
    }

    this.articleId = articleId
  },
  mounted() {
    if (this.auth) {
      const simplemde = new SimpleMDE({
        element: document.querySelector('#editor'),
        placeholder: '请使用 Markdown 格式书写 ;-)，代码片段黏贴时请注意使用高亮语法。',
        spellChecker: false,
        autoDownloadFontAwesome: false,
        toolbar: false,
        status: false,
        renderingConfig: {
          codeSyntaxHighlighting: true
        }
      })

      simplemde.codemirror.on('change', () => {
        this.commentMarkdown = simplemde.value()
        this.commentHtml = simplemde.markdown(emoji.emojify(this.commentMarkdown, name => name))
      })

      simplemde.codemirror.on('keyup', (codemirror, event) => {
        if (event.ctrlKey && event.keyCode === 13) {
          this.comment()
        } else if (this.commentId && event.keyCode === 27) {
          this.cancelEditComment()
        }
      })

      this.simplemde = simplemde
    }
  },
  methods: {
    editArticle() {
      this.$router.push({ name: 'Edit', params: { articleId: this.articleId } })
    },
    deleteArticle() {
      this.$swal({
        text: '你确定要删除此内容吗?',
        confirmButtonText: '删除'
      }).then((res) => {
        if (res.value) {
          this.$store.dispatch('post', { articleId: this.articleId })
        }
      })
    },
    like(e) {
      if (!this.auth) {
        this.$swal({
          text: '需要登录以后才能执行此操作。',
          confirmButtonText: '前往登录'
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
          this.likeClass = ''
          this.$store.dispatch('like', { articleId }).then((likeUsers) => {
            this.likeUsers = likeUsers
          })
        } else {
          this.likeClass = 'active animated rubberBand'
          this.$store.dispatch('like', { articleId, isAdd: true }).then((likeUsers) => {
            this.likeUsers = likeUsers
          })
        }
      }
    },
    comment() {
      if (this.commentMarkdown && this.commentMarkdown.trim() !== '') {
        this.$store.dispatch('comment', {
          comment: { content: this.commentMarkdown },
          articleId: this.articleId,
          commentId: this.commentId
        }).then(this.renderComments)

        if (this.commentId) {
          this.cancelEditComment()
        } else {
          this.simplemde.value('')
          document.querySelector('#reply-btn').focus()

          this.$nextTick(() => {
            const lastComment = document.querySelector('#reply-list li:last-child')
            if (lastComment) lastComment.scrollIntoView(true)
          })
        }
      }
    },
    renderComments(comments) {
      if (Array.isArray(comments)) {
        const newComments = comments.map(comment => ({ ...comment }))
        const user = this.user || {}

        for (let comment of newComments) {
          comment.uname = comment.uname || user.name
          comment.uavatar = comment.uavatar || user.avatar
          comment.content = SimpleMDE.prototype.markdown(emoji.emojify(comment.content, name => name))
        }

        this.comments = newComments
        this.commentsMarkdown = comments
      }
    },
    editComment(commentId, commentIndex) {
      const simplemde = this.simplemde
      const codemirror = simplemde.codemirror
      const comments = this.commentsMarkdown

      for (const comment of comments) {
        if (parseInt(comment.commentId) === parseInt(commentId)) {
          simplemde.value(comment.content)
          codemirror.focus()
          codemirror.setCursor(codemirror.lineCount(), 0)
          this.commentIndex = commentIndex + 1
          this.commentId = commentId
          break
        }
      }
    },
    cancelEditComment() {
      this.commentId = undefined
      this.simplemde.value('')

      this.$nextTick(() => {
        const currentComment = document.querySelector(`#reply-list li:nth-child(${this.commentIndex})`)

        if (currentComment) {
          currentComment.scrollIntoView(true)
          currentComment.querySelector('.operate a').focus()
        }
      })
    },
    deleteComment(commentId) {
      this.$swal({
        text: '你确定要删除此评论吗?',
        confirmButtonText: '删除'
      }).then((res) => {
        if (res.value) {
          this.$store.dispatch('comment', {
            commentId,
            articleId: this.articleId
          }).then(this.renderComments)
        }
      })
    },
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .5s;}
.fade-enter, .fade-leave-to { opacity: 0;}
</style>
