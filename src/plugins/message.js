import MessageComponent from '../components/Message'

export default {
  install: (Vue) => {
    const Message = Vue.extend(MessageComponent)
    const $vm = new Message()
    const $el = $vm.$mount().$el

    Vue.nextTick(() => {
      const container = document.querySelector('#message')
      if (container) container.prepend($el)
    })

    $vm.$on('update:show', () => {
      $vm.show = false
    })

    const message = {
      show(msg = '', type = 'success') {
        $vm.show = false
        $vm.msg = msg
        $vm.type = type

        Vue.nextTick(() => {
          $vm.show = true
        })
      },
      hide() {
        $vm.show = false
      }
    }

    Vue.prototype.$message = message
  }
}
