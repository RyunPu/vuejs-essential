const ls = localStorage

export default {
  setItem(name, value) {
    ls.setItem(name, JSON.stringify(value))
  },
  getItem(name) {
    try {
      return JSON.parse(ls.getItem(name))
    } catch (e) {
      return null
    }
  },
  removeItem(name) {
    ls.removeItem(name)
  }
}
