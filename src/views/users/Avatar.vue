<template>
  <div class="col-md-9 left-col">
    <div class="panel panel-default padding-md">
        <div class="panel-body">
            <h2><i class="fa fa-picture-o"></i> 请输入头像地址</h2>
        <hr>
        <div data-validator-form>
          <div class="form-group">
            <label>头像预览：</label>
            <div>
              <img :src="avatar" class="avatar-preview-img">
            </div>
          </div>
          <div class="form-group row">
            <div class="col-md-8">
              <input v-model.trim.lazy="avatar" v-validator.required="{ title: '头像地址' }" type="text" class="form-control avatar-input">
            </div>
            <div class="clearfix"></div>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-lg btn-primary" @click="updateAvatar">上传头像</button>
          </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditAvatar',
  data() {
    return {
      avatar: '' // 头像地址
    }
  },
  created() {
    const user = this.$store.state.user

    if (user && typeof user === 'object') {
      this.avatar = user.avatar
    }
  },
  methods: {
    updateAvatar() {
      const avatar = this.avatar

      if (avatar) {
        let img = new Image()

        img.onload = () => {
          this.$store.dispatch('updateUser', { avatar })
          this.$message.show('上传成功')
        }

        img.onerror = () => {
          this.$message.show('上传失败', 'danger')
        }

        img.src = avatar
      }
    }
  }
}
</script>

<style scoped>
.avatar-preview-img { min-width: 200px; min-height: 200px; max-width: 50%;}
</style>