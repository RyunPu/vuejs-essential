export default {
  bind(el, binding, vnode) {
    const offset = parseInt(binding.value) || 0
    const elStyle = el.style.cssText

    el.affix = () => {
      el.classList.remove('affix')
      el.style.cssText = elStyle

      const elWidth = el.offsetWidth
      const elHeight = el.offsetHeight

      if (!elWidth || !elHeight) {
        return
      }

      const rect = el.getBoundingClientRect()
      const initTop = rect.top + pageYOffset
      const initLeft = rect.left

      if (window.innerWidth >= 992 && pageYOffset > initTop - offset) {
        el.classList.add('affix')
        el.style.cssText = `${elStyle};left:${initLeft}px;top:${offset}px;width:${elWidth}px`
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
