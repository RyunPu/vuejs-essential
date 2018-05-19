import Vue from 'vue'
import Message from './Message'
import Modal from './Modal'
// 引入 Pagination.vue 的默认值
import Pagination from './Pagination'

const components = {
  Message,
  Modal,
  // 添加 Pagination 以便在循环中进行注册
  Pagination
}

for (const [key, value] of Object.entries(components)) {
  Vue.component(key, value)
}
