<template>
  <div v-show="show" :class="`alert alert-${type} alert-dismissible`">
    <button @click="close" type="button" class="close"><span>×</span></button>
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    // 是否显示消息框
    show: {
      type: Boolean,
      default: false
    },
    // 消息框的类型
    type: {
      type: String,
      default: 'success'
    },
    // 消息
    msg: {
      type: String,
      default: ''
    }
  },
  watch: {
    show(value) {
      if (value) {
        this.$nextTick(() => {
          this.$el.scrollIntoView(true)
        })
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style scoped>

</style>