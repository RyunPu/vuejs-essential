export default {
  bind(el, binding, vnode) {
    el.addEventListener('click', () => {
      el.parentElement.classList.toggle('open')
    }, false)

    document.addEventListener('click', (e) => {
      const target = e.target

      if (target.isSameNode(el) || el.contains(target)) return
      el.parentElement.classList.remove('open')
    }, false)
  }
}
