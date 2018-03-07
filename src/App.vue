<template>
  <div class="wrap">
    <TopicsHeader/>
  </div>
</template>

<script>
import TopicsHeader from '@/components/layouts/TopicsHeader'

export default {
  name: 'App',
  components: {
    TopicsHeader
  }
}
</script>

<style lang="scss">
$container-large-desktop: 1200px;
$btn-primary-bg: #00b5ad;
$btn-primary-border: #00b5ad;
$label-primary-bg: #00b5ad;
$pagination-active-bg: #00b5ad;
$pagination-active-border: #00b5ad;
$pagination-color: #00b5ad;
$input-border-focus: #00b5ad;
$link-color: #12c4c5;
$link-hover-color: #22ddde;
$icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
$fa-font-path: "~font-awesome/fonts/";

@import "~bootstrap-sass/assets/stylesheets/_bootstrap";
@import "~font-awesome/scss/font-awesome";
@import "styles/main";
</style>
