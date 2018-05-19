<template>
  <div class="col-md-3 side-bar">
    <div class="panel panel-default corner-radius sidebar-resources">
      <div class="panel-heading text-center">
        <h3 class="panel-title">实战课程</h3>
      </div>
      <div class="panel-body">
        <Slider :slides="slides">
          <template slot-scope="{ currentSlide }">
            <a :href="currentSlide.link" target="_blank">
              <img :alt="currentSlide.title" :title="currentSlide.title" :src="currentSlide.img">
            </a>
          </template>
        </Slider>
      </div>
    </div>

    <!-- 活跃用户 -->
    <div class="panel panel-default corner-radius panel-active-users">
      <div class="panel-heading text-center">
        <h3 class="panel-title">活跃用户</h3>
      </div>
      <div class="panel-body">
        <div class="users-label">
          <router-link v-for="(user, index) in activeUsers" :to="`/${user.name}`" :key="index" class="users-label-item">
            <img :src="user.avatar" class="avatar-small inline-block">
            {{ user.name }}
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'TheSidebar',
  data() {
    return {
      slides: [
        {
          title: '《Laravel 入门教程 - 从零到部署上线》',
          img: 'https://lccdn.phphub.org/uploads/banners/YpxKKNlSPdmwotO3u8An.jpg',
          link: 'https://laravel-china.org/topics/3383/laravel-the-first-chinese-new-book-laravel-tutorial'
        },
        {
          title: '《Laravel 进阶课程 - 从零构建论坛系统》',
          img: 'https://lccdn.phphub.org/uploads/banners/iNanVVOXdnYQ6jRfMdWE.png',
          link: 'https://laravel-china.org/topics/6592'
        },
        {
          title: '《Laravel 教程实战高级 - 构架 API 服务器》',
          img: 'https://lccdn.phphub.org/uploads/banners/tEd4GxhMp6VMh9e0hrUH.jpg',
          link: 'https://laravel-china.org/topics/7657'
        }
      ],
      activeUsers: [] // 活跃用户
    }
  },
  // 在实例创建完成后
  created() {
    // 通过 axios 执行 GET 请求来返回活跃用户
    this.$axios.get('/users/active').then((response) => {
      // 在成功的回调里，从 response.data 获取返回数据
      this.activeUsers = response.data
    })
  }
}
</script>

<style scoped>
.carousel-inner img {display:block;margin:auto;line-height:1;width:70%;border:1px solid #ddd;box-shadow:0 0 10px #ccc;-moz-box-shadow:0 0 10px #ccc;-webkit-box-shadow:0 0 10px #ccc;}
</style>
