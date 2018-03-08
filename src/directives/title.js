function showTitle(element, title) {
  const popover = getPopover()

  if (!title) {
    popover.style.display = 'none'
  } else {
    const rect = element.getBoundingClientRect()
    const elementStyle = window.getComputedStyle(element, null)
    const rightOffset = parseInt(elementStyle.getPropertyValue('padding-right')) || 0
    const topOffset = parseInt(elementStyle.getPropertyValue('padding-top')) || 0

    popover.style.visibility = 'hidden'
    popover.style.display = 'block'
    popover.querySelector('.popover-content').textContent = title
    popover.style.left = rect.left - popover.offsetWidth / 2 + (element.offsetWidth - rightOffset) / 2 + 'px'
    popover.style.top = rect.top - popover.offsetHeight + topOffset + 'px'
    popover.style.display = 'block'
    popover.style.visibility = 'visible'
  }
}

function getPopover() {
  let popover = document.querySelector('.title-popover')

  if (!popover) {
    const tpl = `
      <div class="popover title-popover top fade in">
        <div class="arrow"></div>
        <div class="popover-content"></div>
      </div>
    `
    const fragment = document.createRange().createContextualFragment(tpl)

    document.body.appendChild(fragment)
    popover = document.querySelector('.title-popover')
  }

  return popover
}

export default {
  bind(el, binding, vnode) {
    el.addEventListener('mouseenter', () => {
      showTitle(el, binding.value)
    }, false)

    el.addEventListener('mouseleave', () => {
      showTitle()
    }, false)

    el.addEventListener('click', () => {
      showTitle()
    }, false)
  }
}
