<template>
  <div class="container main-container blog-container">
    <div class="blog-pages">
      <div class="col-md-12 panel">
        <div class="panel-body">
          <h2 class="text-center">创作文章</h2>
          <hr>
          <div data-form>
            <div class="form-group">
              <input v-validator.required="{ title: '标题' }" type="text" class="form-control" placeholder="请填写标题">
            </div>
            <div class="form-group">
              <textarea v-validator.required="{ title: '内容' }" class="form-control" placeholder="请使用 Markdown 格式书写 ;-)，代码片段黏贴时请注意使用高亮语法。"></textarea>
            </div>
            <br>
            <div class="form-group">
              <button class="btn btn-primary" type="submit">发 布</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Create'
}
</script>

<style scoped>
textarea { height: 200px; }
</style>
