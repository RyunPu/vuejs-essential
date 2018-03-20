export default {
  inserted(el, binding, vnode) {
    el.addEventListener('click', () => {
      el.parentElement.classList.toggle('open')
    }, false)

    document.addEventListener('click', (e) => {
      const target = e.target
      const parentElement = el.parentElement

      if (target.isSameNode(parentElement) || parentElement.contains(target)) return
      parentElement.classList.remove('open')
    }, false)
  }
}
