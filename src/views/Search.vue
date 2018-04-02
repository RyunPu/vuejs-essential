<template>
  <div class="container main-container ">
    <div class="panel panel-default list-panel search-results">
      <div class="panel-heading">
        <h3 class="panel-title">
          <i class="fa fa-search"></i>
          关于 “<span class="highlight">{{ $route.query.q }}</span>” 的搜索结果, 共 0 条
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Search',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.UPDATE_SEARCHVALUE(to.query.q || '')
    })
  },
  beforeRouteUpdate(to, from, next) {
    this.UPDATE_SEARCHVALUE(to.query.q || '')
    next()
  },
  beforeRouteLeave(to, from, next) {
    this.UPDATE_SEARCHVALUE('')
    next()
  },
  methods: {
    ...mapMutations([
      'UPDATE_SEARCHVALUE'
    ])
  }
}
</script>

<style scoped>

</style>
