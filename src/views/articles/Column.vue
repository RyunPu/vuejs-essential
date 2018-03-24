<template>
  <div class="container main-container blog-container">
    <div class="blog-pages">
      <router-view></router-view>
      <div class="col-md-3 main-col pull-left">
        <div class="panel panel-default corner-radius">
          <div class="panel-body text-center topic-author-box blog-info">
            <div class="image blog-cover">
              <router-link :to="`/${userName}`">
                <img v-if="columnPic" :src="columnPic" class="avatar-112 avatar img-thumbnail">
                <i v-else class="fa fa-user-circle avatar-100 avatar img-thumbnail"></i>
              </router-link>
            </div>
            <div class="blog-name">
              <h4 v-if="userName">
                <router-link :to="`/${userName}`">{{ userName }} 的专栏</router-link>
              </h4>
            </div>
            <hr>
            <router-link :to="`/${userName}`">
              <li class="list-group-item"><i class="text-md fa fa-list-ul"></i> 专栏文章（{{ articleNum }}）</li>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Column',
  computed: {
    userName() {
      return this.user && this.user.name
    },
    columnPic() {
      return this.user && (this.user.columnPic || this.user.avatar)
    },
    articleNum() {
      return this.articles ? this.articles.length : 0
    },
    ...mapState([
      'user',
      'articles'
    ])
  }
}
</script>

<style scoped>
.avatar-100 { font-size: 100px;}
</style>
