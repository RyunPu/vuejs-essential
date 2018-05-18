import moment from 'moment'

moment.locale('zh-cn')

export default function(value, ...rest) {
  const date = value

  if (moment(date).isValid()) {
    const key = rest.shift()

    if (typeof key === 'string') {
      switch (key) {
        case 'from':
          value = moment(date).from()

          const otherOpts = rest.shift()

          if (otherOpts && typeof otherOpts === 'object') {
            value = moment(date).startOf(otherOpts.startOf).from()
          }

          break
        default:
          value = moment(date).format(key)
      }
    }
  }

  return value
}
