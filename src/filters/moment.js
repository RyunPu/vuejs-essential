import moment from 'moment'

moment.locale('zh-cn')

export default function(value) {
  let args = [...arguments]
  const date = args.shift()

  if (moment(date).isValid()) {
    const key = args.shift()

    if (typeof key === 'string') {
      switch (key) {
        case 'from':
          value = moment(date).from()

          const otherOpts = args.shift()

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
