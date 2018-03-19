<template>
  <div class="container main-container">
    <Message :type="msgType" :msg="msg" :show.sync="msgShow"/>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      msgShow: false,
      msgType: '',
      msg: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    const name = from.name

    next(vm => {
      switch (name) {
        case 'Register':
          vm.showMsg('注册成功')
          break
      }
    })
  },
  methods: {
    showMsg(msg, type = 'success') {
      this.msgType = type
      this.msg = msg
      this.msgShow = true
    }
  }
}
</script>

<style scoped>
.fa-user-circle { font-size: 30px; vertical-align: middle;}
</style>
