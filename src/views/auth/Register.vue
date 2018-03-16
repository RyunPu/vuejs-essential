<template>
  <div class="container main-container">
    <div class="row">
      <div class="col-md-4 col-md-offset-4 floating-box">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">请注册</h3>
          </div>

          <div class="panel-body">
            <div class="alert alert-warning">
              📱 非中国大陆号码需使用国际前缀，格式必须是以 + 开头并且没有空格，如：+886972812345
            </div>
            <div class="form-group">
              <label class="control-label">手 机</label>
              <input type="text" class="form-control" placeholder="请填写手机号码">
            </div>
            <div class="form-group">
              <label class="control-label">图片验证码</label>
              <input type="text" class="form-control" placeholder="请填写验证码">
              <div class="thumbnail" title="点击图片重新获取验证码">
                <div class="code"></div>
              </div>
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
  name: 'Register'
}
</script>

<style scoped>
.thumbnail { width: 170px; margin-top: 10px; margin-bottom: 0; cursor: pointer;}
.thumbnail .code { height: 46px; background: #E1E6E8;}
</style>
