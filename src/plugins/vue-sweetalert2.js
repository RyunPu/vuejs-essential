import swal from 'sweetalert2'

export default {
  install: (Vue) => {
    Vue.swal = swal
    Vue.prototype.$swal = swal
  }
}
