<template>
  <ul v-if="lastPage > 1" class="pagination">
    <li :class="{ disabled: internalCurrentPage === 1 }">
      <a v-if="internalCurrentPage === 1" href="javascript:;">«</a>
      <a v-else href="javascript:;" @click="changePage(internalCurrentPage - 1)">«</a>
    </li>
    <li v-for="n in lastPage" :class="{ active: internalCurrentPage === n }">
      <a v-if="internalCurrentPage === n" href="javascript:;">{{ n }}</a>
      <a v-else href="javascript:;" @click="changePage(n)">{{ n }}</a>
    </li>
    <li :class="{ disabled: internalCurrentPage === lastPage }">
      <a v-if="internalCurrentPage === lastPage" href="javascript:;">»</a>
      <a v-else href="javascript:;" @click="changePage(internalCurrentPage + 1)">»</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    onPageChange: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      internalCurrentPage: 1
    }
  },
  computed: {
    lastPage() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  watch: {
    currentPage: {
      immediate: true,
      handler(page) {
        this.internalCurrentPage = page
      }
    }
  },
  methods: {
    changePage(page) {
      this.internalCurrentPage = page
      this.onPageChange(page)
    }
  }
}
</script>

<style scoped>

</style>
