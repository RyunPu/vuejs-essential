import Vue from 'vue'
import validator from './validator'
import dropdown from './dropdown'
import title from './title'
import affix from './affix'

const directives = {
  validator,
  dropdown,
  title,
  affix
}

for (const [key, value] of Object.entries(directives)) {
  Vue.directive(key, value)
}
