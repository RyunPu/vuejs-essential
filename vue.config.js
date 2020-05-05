module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vuejs-essential/dist/'
    : '/'
}