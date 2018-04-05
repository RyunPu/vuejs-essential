<template lang="pug">
  div#app
    img(src="./assets/logo.png")
    h1 Welcome from pug & sass
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 200px;

  h1 {
    color: #42b983;
  }
}
</style>
