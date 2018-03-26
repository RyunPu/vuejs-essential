import swal from 'sweetalert2'

export default {
  install: (Vue) => {
    swal.setDefaults({
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(140,212,245)',
      cancelButtonColor: 'rgb(193,193,193)'
    })

    Vue.swal = swal
    Vue.prototype.$swal = swal
  }
}
