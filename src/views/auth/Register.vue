<template>
  <div class="container main-container">
    <div class="row">
      <div class="col-md-4 col-md-offset-4 floating-box">
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
            <button type="submit" class="btn btn-lg btn-success btn-block">
              <i class="fa fa-btn fa-sign-in"></i> 注册
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
      cpassword: '',
      captcha: '',
      captchaTpl: '',
      words: 'QWERTYUIOPLKJHGFDSAZXCVBNM1234567890'
    }
  },
  created() {
    this.createCaptcha()
  },
  methods: {
    createCaptcha() {
      const words = this.words
      const captcha = [...Array(6)].map(() => words[Math.floor(Math.random() * words.length)])
      let tpl = ''


      captcha.map((item, index) => {
        tpl += `<span class="flex1 hcenter">${item}</span>`
      })

      this.captchaTpl = tpl
      this.localCaptcha = captcha.join('')
    }
  }
}
</script>

<style scoped>
.thumbnail { width: 170px; margin-top: 10px; cursor: pointer;}
.thumbnail .captcha { height: 46px; background: #E1E6E8;}
.captcha { font-size: 24px; font-weight: bold; user-select: none;}
</style>
