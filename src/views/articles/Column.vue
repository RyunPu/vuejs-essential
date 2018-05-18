<template>
  <div class="container blog-container">
    <div class="blog-pages">
      <!-- 用于渲染『文章列表』和『文章内容』 -->
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
// 引入 mapState 辅助函数
import { mapState } from 'vuex'

export default {
  name: 'Column',
  computed: {
    // 将指定的状态混入计算属性
    ...mapState([
      'user',
      'articles'
    ]),
    // 基于 user 返回用户名
    userName() {
      return this.user && this.user.name
    },
    // 基于 user 返回用户头像
    userAvatar() {
      return this.user && this.user.avatar
    },
    // 基于 articles 返回文章数量
    articleNum() {
      return this.articles ? this.articles.length : 0
    }
  }
}
</script>

<style scoped>
.blog-container { margin-top: 20px;}
</style>
