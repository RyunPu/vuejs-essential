<template>
  <div class="container main-container blog-container">
    <div class="blog-pages">
      <div class="col-md-12 panel">
        <div class="panel-body">
          <h2 class="text-center">{{ articleId ? '编辑文章' : '创作文章' }}</h2>
          <hr>
          <div data-form>
            <div class="form-group">
              <input @change="saveTitle" v-model.trim="title" v-validator.required="{ title: '标题' }" type="text" class="form-control" placeholder="请填写标题">
            </div>
            <div class="form-group">
              <textarea id="editor"></textarea>
            </div>
            <div class="form-group">
              <button @click="post" class="btn btn-primary" type="submit">发 布</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ls from '../../utils/localStorage'
import SimpleMDE from 'simplemde'
import hljs from 'highlight.js'

window.hljs = hljs

export default {
  name: 'Create',
  data() {
    return {
      title: '',
      content: '',
      canSubmit: false,
      articleId: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const articleId = vm.$route.params.articleId
      const localArticleId = ls.getItem('articleId')

      if (!(articleId && articleId === localArticleId)) {
        vm.clearData()
      }

      vm.articleId = articleId
      vm.fillContent(articleId)
      ls.setItem('articleId', articleId)
    })
  },
  beforeRouteLeave(to, from, next) {
    this.clearData()
    next()
  },
  mounted() {
    const simplemde = new SimpleMDE({
      element: document.querySelector('#editor'),
      placeholder: '请使用 Markdown 格式书写 ;-)，代码片段黏贴时请注意使用高亮语法。',
      spellChecker: false,
      autoDownloadFontAwesome: false,
      autosave: {
        enabled: true,
        uniqueId: 'vuejs-essential'
      },
      renderingConfig: {
        codeSyntaxHighlighting: true
      }
    })

    simplemde.codemirror.on('change', () => {
      this.content = simplemde.value()
    })

    this.simplemde = simplemde
  },
  methods: {
    fillContent(articleId) {
      const simplemde = this.simplemde

      if (articleId) {
        const post = this.$store.getters.getArticleById(articleId)

        if (post) {
          const { title, content } = post[0]

          this.title = ls.getItem('smde_title') || title
          this.content = simplemde.value() || content
          this.saveTitle()
          simplemde.value(this.content)
          this.articleId = articleId
        }
      } else {
        if (ls.getItem('smde_title')) {
          this.title = ls.getItem('smde_title')
          this.content = simplemde.value()
        } else {
          this.content = simplemde.value('')
        }
      }
    },
    saveTitle() {
      ls.setItem('smde_title', this.title)
    },
    post() {
      this.$nextTick(() => {
        if (this.canSubmit) {
          this.submit()
        }
      })
    },
    submit() {
      const content = this.content

      if (typeof content === 'string' && content.trim() !== '') {
        const title = this.title
        const article = {
          title,
          content
        }

        this.$store.dispatch('post', { article, articleId: this.articleId })
        this.clearData()
      }
    },
    clearData() {
      this.title = ''
      ls.removeItem('smde_title')
      this.simplemde.value('')
      this.simplemde.clearAutosavedValue()
    }
  }
}
</script>

<style scoped>

</style>
