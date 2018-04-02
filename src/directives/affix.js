export default {
  bind(el, binding, vnode) {
    const offset = parseInt(binding.value) || 0
    const elStyle = el.style.cssText
    let affixed = false

    el.affix = () => {
      const elWidth = el.offsetWidth
      const elHeight = el.offsetHeight

      if (!elWidth || !elHeight) {
        return
      }

      if (affixed) {
        el.style.cssText = elStyle
        affixed = false
      }

      const rect = el.getBoundingClientRect()
      const initTop = rect.top + pageYOffset
      const initLeft = rect.left

      if (!affixed && window.innerWidth >= 992 && pageYOffset > initTop - offset) {
        el.style.cssText = `${elStyle};position:fixed;left:${initLeft}px;top:${offset}px;width:${elWidth}px`
        affixed = true
      }
    }

    window.addEventListener('scroll', el.affix, false)
    window.addEventListener('resize', el.affix, false)
    window.dispatchEvent(new Event('scroll'))
  },
  update() {
    window.dispatchEvent(new Event('scroll'))
  },
  unbind(el) {
    window.removeEventListener('scroll', el.affix, false)
    window.removeEventListener('resize', el.affix, false)
    el.affix = null
  }
}
