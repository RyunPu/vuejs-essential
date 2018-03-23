import moment from 'moment'

moment.locale('zh-cn')

export default function(value) {
  let newValue = value
  let args = [...arguments]
  const date = args.shift()

  if (moment(date).isValid()) {
    const key = args.shift()

    if (typeof key === 'string') {
      switch (key) {
        case 'from':
          newValue = moment(date).from()
          const rest = args.shift()

          if (typeof rest === 'object') {
            const { startOf } = rest
            newValue = moment(date).startOf(startOf).from()
          }

          break
        default:
          newValue = moment(date).format(key)
      }
    }
  }

  return newValue
}
