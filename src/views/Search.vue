<template>
  <div class="container main-container ">
    <div class="panel panel-default list-panel search-results">
      <div class="panel-heading">
        <h3 class="panel-title">
          <i class="fa fa-search"></i>
          关于 “<span class="highlight">{{ $route.query.q }}</span>” 的搜索结果, 共 {{ results.length }} 条
          <div class="pull-right" style="margin-top:-10px">
            <a v-for="item in filters"
              :class="{ disabled: item.filter === filter }"
              class="btn btn-default btn-sm"
              href="javascript:;"
              @click="sortResultsBy(item.filter)"
            >
              <i :class="`fa fa-${item.icon}`"></i>
              {{ item.title }}
            </a>
          </div>
        </h3>
      </div>
      <div class="panel-body">
        <div v-for="result in results" class="result">
          <h2 class="title">
            <router-link :to="`/articles/${result.articleId}/content`">
              <span v-html="result.title"></span>
            </router-link>
            <small>by</small>
            <router-link :to="`/${result.uname}`">
              <img :src="result.avatar" class="avatar avatar-small">
              <small>{{ result.uname }}</small></a>
            </router-link>
          </h2>
          <div class="info">
            <span class="url">
              <router-link :to="`/articles/${result.articleId}/content`">
                {{ result.url }}
              </router-link>
            </span>
            <span class="date">
              {{ result.date | moment('from', { startOf: 'minute' }) }} ⋅
              <i class="fa fa-thumbs-o-up"></i> {{ result.votes && result.votes.length || 0 }} ⋅
              <i class="fa fa-comments-o"></i> {{ result.comments && result.comments.length || 0 }}
            </span>
          </div>
          <div class="desc" v-html="result.content"></div>
          <hr>
        </div>
        <div v-if="!results.length" class="empty-block">
          没有任何数据~~
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Search',
  data() {
    return {
      results: [],
      filter: 'default',
      filters: [
        {
          filter: 'default',
          title: '相关性排序',
          icon: 'random'
        },
        {
          filter: 'vote',
          title: '点赞数排序',
          icon: 'thumbs-up'
        }
      ]
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getArticlesByKeyword(to.query.q)
    })
  },
  beforeRouteUpdate(to, from, next) {
    this.getArticlesByKeyword(to.query.q)
    next()
  },
  beforeRouteLeave(to, from, next) {
    this.UPDATE_SEARCH_VALUE('')
    next()
  },
  methods: {
    ...mapMutations([
      'UPDATE_SEARCH_VALUE'
    ]),
    getArticlesByKeyword(keyword) {
      if (keyword !== undefined && keyword.trim() !== '') {
        const results = this.$store.getters.getArticlesByKeyword(keyword)

        this.localResults = results
        this.keyword = keyword
        this.sortResultsBy(this.filter)
        this.UPDATE_SEARCH_VALUE(keyword)
      }
    },
    sortResultsBy(filter) {
      let results = this.localResults || []

      switch (filter) {
        case 'vote':
          results.sort((a, b) => {
            const aVotes = Array.isArray(a.votes) ? a.votes : []
            const bVotes = Array.isArray(b.votes) ? b.votes : []

            return bVotes.length - aVotes.length
          })

          break
        default:
          const keyword = this.keyword

          if (keyword) {
            results.sort((a, b) => a.title.indexOf(keyword) < b.title.indexOf(keyword))
          }
      }

      this.filter = filter
      this.results = results
    }
  }
}
</script>

<style scoped>
.result a:hover, .result a:focus { color: #d6514d; transition: color .15s ease;}
.panel-title a { margin-left: 5px;}
</style>
