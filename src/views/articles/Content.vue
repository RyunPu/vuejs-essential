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
          <div class="or"></div>
          <button @click="showQrcode = true" class="btn btn-success"><i class="fa fa-heart"></i> 二维码</button>
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

    <div class="replies panel panel-default list-panel replies-index">
      <div class="panel-heading">
        <div class="total">
          回复数量: <b>{{ comments.length }}</b>
        </div>
      </div>
      <div class="panel-body">
        <transition-group id="reply-list" name="fade" tag="ul" class="list-group row">
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
                <span v-if="user" class="operate pull-right">
                  <template v-if="comment.uid === 1">
                    <a href="javascript:;" @click="editComment(comment.commentId, index)"><i class="fa fa-edit"></i></a>
                    <span> ⋅ </span>
                    <a href="javascript:;" @click="deleteComment(comment.commentId)"><i class="fa fa-trash-o"></i></a>
                  </template>
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

    <div class="reply-box form box-block">
      <div class="form-group comment-editor">
        <textarea v-if="auth" id="editor"></textarea>
        <textarea v-else disabled class="form-control" placeholder="需要登录后才能发表评论." style="height:172px"></textarea>
      </div>
      <div class="form-group reply-post-submit">
        <button id="reply-btn" :disabled="!auth" @click="comment" class="btn btn-primary">
          {{ isEditComment ? '保存编辑' : '回复' }}
        </button>
        <span v-show="isEditComment" class="help-inline btn-cancel" @click="cancelEditComment">取消编辑</span>
        <span v-show="!isEditComment" class="help-inline">Ctrl+Enter</span>
      </div>
      <div v-show="commentHtml" id="preview-box" class="box preview markdown-body" v-html="commentHtml"></div>
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
  </div>
</template>

<script>
import SimpleMDE from 'simplemde'
import hljs from 'highlight.js'
import emoji from 'node-emoji'
import { mapState } from 'vuex'
import QrcodeVue from 'qrcode.vue'

window.hljs = hljs

export default {
  name: 'Content',
  components: {
    QrcodeVue
  },
  data() {
    return {
      title: '',
      content: '',
      date: '',
      votes: [],
      voteClass: '',
      showQrcode: false,
      commentMarkdown: '',
      commentHtml: '',
      comments: [],
      isEditComment: false
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
      let { title, content, date, votes, comments } = post[0]

      this.title = title
      this.date = date
      content = emoji.emojify(content, name => name)
      this.content = SimpleMDE.prototype.markdown(content)
      this.votes = votes ? votes : []
      this.voteClass = this.votes.length ? 'active' : ''
      this.articleId = articleId
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
        }
      })

      this.simplemde = simplemde
    }
  },
  methods: {
    cancelEditComment() {
      this.simplemde.value('')
      this.isEditComment = false

      this.$nextTick(() => {
        document.querySelector(`#reply-list li:nth-child(${this.commentIndex})`).scrollIntoView(true)
      })
    },
    editComment(commentId, commentIndex) {
      const simplemde = this.simplemde
      const codemirror = simplemde.codemirror
      const comments = this.commentsMarkdown

      if (Array.isArray(comments)) {
        for (const [index, comment] of comments.entries()) {
          if (parseInt(comment.commentId) === parseInt(commentId)) {
            simplemde.value(comment.content)
            codemirror.focus()
            this.isEditComment = true
            this.commentIndex = commentIndex + 1
            this.commentId = commentId
            break
          }
        }
      }
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
    comment() {
      if (this.commentMarkdown && this.simplemde) {
        const commentId = this.isEditComment && this.commentId

        this.$store.dispatch('comment', {
          comment: {
            uid: 1,
            uname: this.user.name,
            content: this.commentMarkdown,
            uavatar: this.user.avatar
          },
          articleId: this.articleId,
          commentId
        }).then(this.renderComments)

        if (this.isEditComment) {
          this.cancelEditComment()
        } else {
          this.simplemde.value('')
          document.querySelector('#reply-btn').focus()

          this.$nextTick(() => {
            document.querySelector('#reply-list li:last-child').scrollIntoView(true)
          })
        }
      }
    },
    renderComments(comments) {
      if (Array.isArray(comments)) {
        const newComments = comments.map(comment => ({ ...comment }))

        for (const [index, comment] of newComments.entries()) {
          comment.content = SimpleMDE.prototype.markdown(emoji.emojify(comment.content, name => name))
        }

        this.commentsMarkdown = comments
        this.comments = newComments
      }
    },
    vote(e) {
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
          this.voteClass = ''
          this.$store.dispatch('vote', { articleId }).then((votes) => {
            this.votes = votes
          })
        } else {
          this.voteClass = 'active animated rubberBand'
          this.$store.dispatch('vote', { articleId, like: true }).then((votes) => {
            this.votes = votes
          })
        }
      }
    },
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
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .5s;}
.fade-enter, .fade-leave-to { opacity: 0;}
.payment-qrcode h5 { margin: 1.5em 0;}
.payment-qrcode img { width: 160px; height: 160px;}
.btn-cancel { cursor: pointer;}
</style>
