<template>
  <div class="navbar-form navbar-left hidden-sm">
    <div class="form-group">
      <input
        v-model.trim="searchValue"
        type="text"
        class="form-control search-input mac-style"
        placeholder="搜索"
        @keyup.enter="search"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      value: ''
    }
  },
  computed: {
    searchValue: {
      get() {
        return this.$store.state.searchValue
      },
      set(newValue) {
        this.value = newValue
      }
    }
  },
  methods: {
    search() {
      if (this.value !== '') {
        console.log(this.searchValue)
      }
    }
  }
}
</script>

<style scoped>
.search-input { background-image: url(https://vuejscaffcdn.phphub.org/assets/images/icon-search.png)}
</style>
