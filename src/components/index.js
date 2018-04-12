import Vue from 'vue'
import Message from './Message'
import Modal from './Modal'

const components = {
  Message,
  Modal
}

for (const [key, value] of Object.entries(components)) {
  Vue.component(key, value)
}
