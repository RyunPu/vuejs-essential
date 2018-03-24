function validate(el, modifiers, bindingValue = {}) {
  const value = typeof el.value === 'string' ? el.value.trim() : ''
  const title = bindingValue.title || '该项'
  const hint = bindingValue.hint
  let defaultHint = ''

  if (modifiers.required && value === '') {
    defaultHint = `${title}不能为空`
  } else if (bindingValue.target) {
    const target = document.querySelector(bindingValue.target)
    const targetValue = target ? target.value : null

    if (targetValue !== value) {
      defaultHint = `输入的${title}不匹配`
    }
  } else if (bindingValue.regex) {
    try {
      if (!bindingValue.regex.test(value)) {
        defaultHint = `${title}格式不正确`
      }
    } catch (e) {}
  }

  if (defaultHint) {
    if (!hint) {
      showHint(el, defaultHint)
    } else {
      showHint(el, hint)
    }
  } else {
    showHint(el)
  }
}

function showHint(el, hint) {
  const parentElement = el.parentElement
  const hintElement = getHintElement(el)

  if (!hint) {
    hintElement.style.display = 'none'
    parentElement.classList.remove('has-error')
  } else {
    hintElement.textContent = hint
    hintElement.style.display = 'block'
    parentElement.classList.add('has-error')
  }
}

function getHintElement(el) {
  const parentElement = el.parentElement
  let hintElement = parentElement.querySelector('.help-block')

  if (!hintElement) {
    const tpl = `<span class="help-block"></span>`
    const fragment = document.createRange().createContextualFragment(tpl)
    parentElement.appendChild(fragment)
    hintElement = parentElement.querySelector('.help-block')
  }

  return hintElement
}

export default {
  bind(el, binding, vnode) {
    const { arg, modifiers, value } = binding
    const eventType = ['change', 'blur', 'input'].indexOf(arg) !== -1 ? arg : 'blur'

    el.addEventListener('input', () => {
      showHint(el)
    }, false)

    el.addEventListener(eventType, () => {
      validate(el, modifiers, value)
    }, false)
  },
  inserted(el, binding, vnode) {
    const { modifiers, value } = binding
    const form = el.closest('[data-form]')
    const button = form ? form.querySelector('[type=submit]') : null

    if (!button) return

    button.addEventListener('click', () => {
      validate(el, modifiers, value)

      const errors = form.querySelectorAll('.has-error')
      const data = vnode.context.$data

      if (!errors.length) {
        data.canSubmit = true
      } else {
        data.canSubmit = false
      }
    }, false)
  }
}
