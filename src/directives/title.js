function showTitle(element, title) {
  const popover = getPopover()
  const popoverStyle = popover.style

  if (!title) {
    popoverStyle.display = 'none'
  } else {
    const elementRect = element.getBoundingClientRect()
    const elementComputedStyle = window.getComputedStyle(element, null)
    const rightOffset = parseInt(elementComputedStyle.getPropertyValue('padding-right')) || 0
    const topOffset = parseInt(elementComputedStyle.getPropertyValue('padding-top')) || 0

    popoverStyle.visibility = 'hidden'
    popoverStyle.display = 'block'
    popover.querySelector('.popover-content').textContent = title
    popoverStyle.left = elementRect.left - popover.offsetWidth / 2 + (element.offsetWidth - rightOffset) / 2 + 'px'
    popoverStyle.top = elementRect.top - popover.offsetHeight + topOffset + 'px'
    popoverStyle.display = 'block'
    popoverStyle.visibility = 'visible'
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
