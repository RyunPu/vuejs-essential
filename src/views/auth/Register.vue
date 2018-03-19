<template>
  <div class="container main-container">
    <div class="row">
      <div class="col-md-4 col-md-offset-4 floating-box">
        <Message :type="msgType" :msg="msg" :show.sync="msgShow"/>

        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">请注册</h3>
          </div>

          <div class="panel-body" data-form>
            <div class="form-group">
              <label class="control-label">用户名</label>
              <input v-model.trim="username" v-validator:input.required="{ regex: /^[a-zA-Z]+\w*\s?\w*$/, hint: '用户名要求以字母开头的单词字符' }" type="text" class="form-control" placeholder="请填写用户名">
            </div>
            <div class="form-group">
              <label class="control-label">密码</label>
              <input v-model.trim="password" id="password" v-validator.required="{ regex: /^\w{6,16}$/, hint: '密码要求 6 ~ 16 个单词字符' }" type="password" class="form-control" placeholder="请填写密码">
            </div>
            <div class="form-group">
              <label class="control-label">确认密码</label>
              <input v-model.trim="cpassword" v-validator.required="{ target: '#password' }" type="password" class="form-control" placeholder="请填写确认密码">
            </div>
            <div class="form-group">
              <label class="control-label">图片验证码</label>
              <input v-model.trim="captcha" v-validator.required="{ title: '图片验证码' }" type="text" class="form-control" placeholder="请填写验证码">
            </div>
            <div @click="createCaptcha" class="thumbnail" title="点击图片重新获取验证码">
              <div class="captcha vcenter" v-html="captchaTpl"></div>
            </div>
            <button @click="register" type="submit" class="btn btn-lg btn-success btn-block">
              <i class="fa fa-btn fa-sign-in"></i> 注册
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getCaptcha from '../../utils/getCaptcha'

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
      cpassword: '',
      captcha: '',
      captchaTpl: '',
      canSubmit: false,
      msgShow: false,
      msgType: '',
      msg: ''
    }
  },
  created() {
    this.createCaptcha()
  },
  methods: {
    createCaptcha() {
      const { tpl, captcha } = getCaptcha(6)

      this.captchaTpl = tpl
      this.localCaptcha = captcha
    },
    register() {
      this.$nextTick(() => {
        if (this.canSubmit) {
          this.submit()
        }
      })
    },
    submit() {
      if (this.captcha.toUpperCase() !== this.localCaptcha) {
        this.showMsg('验证码不正确', 'warning')
      } else {
        const user = {
          name: this.username,
          password: this.password
        }
        const localUser = this.$store.state.user

        if (localUser) {
          if (localUser.name === user.name) {
            this.showMsg('用户名已存在', 'warning')
          } else {
            this.login(user)
          }
        } else {
          this.login(user)
        }
      }
    },
    showMsg(msg, type = 'success') {
      this.msgShow = false
      this.msgType = type
      this.msg = msg

      this.$nextTick(() => {
        this.msgShow = true
      })
    },
    login(user) {
      this.$store.dispatch('login', user)
    }
  }
}
</script>

<style scoped>
.thumbnail { width: 170px; margin-top: 10px; cursor: pointer;}
.thumbnail .captcha { height: 46px; background: #E1E6E8;}
.captcha { font-size: 24px; font-weight: bold; user-select: none;}
</style>
