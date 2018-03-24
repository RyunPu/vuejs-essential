<template>
  <div class="col-md-9 left-col pull-right">
    <div class="panel article-body article-index">
      <div class="panel-body">
        <h1 class="all-articles">
          专栏文章
          <router-link to="/articles/create" class="btn btn-primary pull-right">
            <i class="fa fa-paint-brush"></i>
            创作文章
          </router-link>
        </h1>

        <ul class="list-group">
          <li v-for="article in articles" class="list-group-item">
            <img v-if="avatar" :src="avatar" class="avatar avatar-small">
            <i v-else class="fa fa-user-circle avatar avatar-small"></i>
            <router-link :to="`/articles/${article.articleId}/content`" class="title">
              {{ article.title }}
            </router-link>
            <span class="meta pull-right">
              <span class="timeago">{{ article.date | moment('from') }}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'List',
  computed: {
    avatar() {
      return this.user && this.user.avatar
    },
    ...mapState([
      'user',
      'articles'
    ])
  }
}
</script>

<style scoped>
i.avatar { font-size: 26px;}
</style>
