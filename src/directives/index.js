import Vue from 'vue'
import validator from './validator'
import dropdown from './dropdown'

const directives = {
  validator,
  dropdown
}

for (const [key, value] of Object.entries(directives)) {
  Vue.directive(key, value)
}
