import Vue from 'vue'
import Message from './Message'
import Modal from './Modal'
import Pagination from './Pagination'
// 引入 Slider.vue 的默认值
import Slider from './Slider'

const components = {
  Message,
  Modal,
  Pagination,
  // 添加到对象以便在循环中进行注册
  Slider
}

for (const [key, value] of Object.entries(components)) {
  Vue.component(key, value)
}
