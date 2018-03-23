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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde'
import hljs from 'highlight.js'
import emoji from 'node-emoji'

export default {
  name: 'Content',
  data() {
    return {
      title: '',
      content: '',
      date: ''
    }
  },
  created() {
    const articleId = this.$route.params.articleId
    const post = this.$store.getters.getArticleById(articleId)

    if (post) {
      let { title, content, date } = post[0]

      this.title = title
      this.date = date
      content = emoji.emojify(content, name => name)
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
