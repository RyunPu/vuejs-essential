export default function(num = 6, letters = 'QWERTYUIOPLKJHGFDSAZXCVBNM1234567890') {
  let tpl = ''
  let captcha = []

  try {
    captcha = [...Array(num)].map(() => letters[Math.floor(Math.random() * letters.length)])
  } catch (e) {}

  captcha.forEach(item => {
    tpl += `<span class="flex1 hcenter">${item}</span>`
  })

  captcha = captcha.join('')

  return {
    tpl,
    captcha
  }
}
