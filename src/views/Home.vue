<template>
  <div class="container main-container">
    <Message :type="msgType" :msg="msg" :show.sync="msgShow"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      msgShow: false,
      msgType: '',
      msg: ''
    }
  },
  computed: mapState([
    'auth'
  ]),
  beforeRouteEnter(to, from, next) {
    const name = from.name
    const logout = to.params.logout

    next(vm => {
      if (vm.$store.state.auth) {
        switch (name) {
          case 'Register':
            vm.showMsg('注册成功！')
            break
          case 'Login':
            vm.showMsg('登录成功！')
            break
        }
      } else if (logout) {
        vm.showMsg('操作成功！')
      }
    })
  },
  methods: {
    showMsg(msg, type = 'success') {
      this.msgType = type
      this.msg = msg
      this.msgShow = true
    }
  },
  watch: {
    auth() {
      this.showMsg('操作成功！')
    }
  }
}
</script>

<style scoped>
.fa-user-circle { font-size: 30px; vertical-align: middle;}
</style>
