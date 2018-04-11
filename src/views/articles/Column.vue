<template>
  <div class="container blog-container">
    <div class="blog-pages">
      <router-view/>

      <div class="col-md-3 main-col pull-left">
        <div class="panel panel-default corner-radius">
          <div class="panel-body text-center topic-author-box blog-info">
            <div class="image blog-cover">
              <router-link :to="`/${userName}`">
                <img :src="userAvatar" class="avatar-112 avatar img-thumbnail">
              </router-link>
            </div>
            <div class="blog-name">
              <h4>
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
    ...mapState([
      'user',
      'articles'
    ]),
    userName() {
      return this.user && this.user.name
    },
    userAvatar() {
      return this.user && this.user.avatar
    },
    articleNum() {
      return this.articles ? this.articles.length : 0
    }
  }
}
</script>

<style scoped>
.blog-container { margin-top: 20px;}
</style>
