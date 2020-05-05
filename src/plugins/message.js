import MessageComponent from '../components/Message'

export default {
  install: (Vue) => {
    const Message = Vue.extend(MessageComponent)
    const vm = new Message()
    const $el = vm.$mount().$el

    Vue.nextTick(() => {
      document.querySelector('#main-container').prepend($el)
    })

    vm.$on('update:show', (value) => {
      vm.show = value
    })

    const message = {
      show(msg = '', type = 'success') {
        vm.msg = msg
        vm.type = type
        vm.show = false

        Vue.nextTick(() => {
          vm.show = true
        })
      },
      hide() {
        Vue.nextTick(() => {
          vm.show = false
        })
      }
    }

    Vue.prototype.$message = message
  }
}