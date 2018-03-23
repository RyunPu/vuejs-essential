<template>
  <div id="wrap">
    <TopicsHeader/>
    <div id="message" class="container"></div>
    <router-view></router-view>
    <TopicsFooter/>
  </div>
</template>

<script>
import TopicsHeader from '@/components/layouts/TopicsHeader'
import TopicsFooter from '@/components/layouts/TopicsFooter'

export default {
  name: 'App',
  components: {
    TopicsHeader,
    TopicsFooter
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
@import 'simplemde/dist/simplemde.min.css';
@import 'highlight.js/styles/paraiso-dark.css';
@import "./styles/main";
@import "./styles/extra";
</style>
