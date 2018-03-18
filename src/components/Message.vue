<template>
  <div v-show="show" :class="`alert alert-${type} alert-dismissible`">
    <button @click="$emit('update:show', false)" type="button" class="close"><span>&times;</span></button>
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'success'
    },
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
  }
}
</script>

<style scoped>

</style>
