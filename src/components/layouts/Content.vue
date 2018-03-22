<template>
  <div class="col-md-9 left-col pull-right">
    <div class="panel article-body content-body">
      <h1 class="text-center">{{ title }}</h1>
      <div class="article-meta text-center">
        <i class="fa fa-clock-o"></i>
      </div>
      <div class="entry-content">
        <div class="content-body entry-content panel-body ">
          <div class="markdown-body" v-html="content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde'
import hljs from 'highlight.js'

export default {
  name: 'Content',
  data() {
    return {
      title: '',
      content: ''
    }
  },
  created() {
    const articleId = this.$route.params.articleId
    const post = this.$store.getters.getArticleById(articleId)

    if (post) {
      let { title, content } = post[0]

      this.title = title
      this.content = SimpleMDE.prototype.markdown(content)

      this.$nextTick(() => {
        this.$el.querySelectorAll('pre code').forEach((el) => {
          hljs.highlightBlock(el)
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
