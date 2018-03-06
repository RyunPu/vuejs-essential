<template>
  <div class="navbar navbar-default topnav">
    <div class="container">
      <div class="navbar-header">
        <a href="/" class="navbar-brand">
          <span class="title">{{ logo.title }}</span>
          <img :src="logo.src" :alt="logo.title">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopicsHeader',
  data() {
    return {
      logo: {
        src: `${this.uploadsUrl}sites/hG5JuDSqZ7Y26Kuh0Qat8EYv6XNT0fGc.png`,
        title: 'Laravel China'
      }
    }
  },
  beforeCreate() {
    this.uploadsUrl = 'https://lccdn.phphub.org/uploads/';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title { display: none;}
</style>
