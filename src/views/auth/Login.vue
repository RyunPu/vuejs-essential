<template>
  <div class="container main-container">
    <div class="row">
      <div class="col-md-4 col-md-offset-4 floating-box">
        <Message :type="msgType" :msg="msg" :show.sync="msgShow"/>

        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">请登录</h3>
          </div>

          <div class="panel-body" data-form>
            <div class="form-group">
              <label class="control-label">用户名</label>
              <input v-model.trim="username" v-validator.required="{ title: '用户名' }" type="text" class="form-control" placeholder="请填写用户名">
            </div>
            <div class="form-group">
              <label class="control-label">密码</label>
              <input v-model.trim="password" id="password" v-validator.required="{ title: '密码' }" type="password" class="form-control" placeholder="请填写密码">
            </div>
            <br>
            <button @click="login" type="submit" class="btn btn-lg btn-success btn-block">
              <i class="fa fa-btn fa-sign-in"></i> 登录
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      canSubmit: false,
      msgShow: false,
      msgType: '',
      msg: ''
    }
  },
  methods: {
    login() {
      this.$nextTick(() => {
        if (this.canSubmit) {
          this.submit()
        }
      })
    },
    submit() {
      const user = {
        name: this.username,
        password: this.password
      }
      const localUser = this.$store.state.user

      if (localUser) {
        if (localUser.name !== user.name || localUser.password !== user.password) {
          this.showMsg('用户名或密码不正确', 'warning')
        } else {
          this.$store.dispatch('login')
        }
      } else {
        this.showMsg('不存在该用户', 'warning')
      }
    },
    showMsg(msg, type = 'success') {
      this.msgShow = false
      this.msgType = type
      this.msg = msg

      this.$nextTick(() => {
        this.msgShow = true
      })
    }
  }
}
</script>

<style scoped>

</style>
