<template>
  <div v-if="slides.length" class="carousel slide" @mouseover="stopSlide" @mouseout="startSlide">
    <div class="carousel-inner">
      <transition
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutLeft"
      >
        <div v-if="show" key="current">
          <slot :currentSlide="currentSlide"></slot>
        </div>
        <div v-else key="next" class="item next">
          <slot :currentSlide="currentSlide"></slot>
        </div>
      </transition>
    </div>

    <div class="carousel-indicators">
      <li v-for="n in slides.length" :class="{ active: n - 1 === currentIndex }" @click="slideTo(n - 1)"></li>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    slides: {
      type: Array,
      default: () => []
    },
    delay: Number
  },
  data() {
    return {
      currentIndex: 0,
      show: true
    }
  },
  computed: {
    currentSlide() {
      return this.slides[this.currentIndex]
    },
    nextIndex() {
      if (this.currentIndex === this.slides.length - 1) {
        return 0
      } else {
        return this.currentIndex + 1
      }
    }
  },
  mounted() {
    if (this.delay) this.startSlide()
  },
  methods: {
    startSlide() {
      if (this.delay) {
        this.interval = setInterval(() => {
          this.slideTo(this.nextIndex)
        }, this.delay)
      }
    },
    stopSlide() {
      if (this.interval) clearInterval(this.interval)
    },
    slideTo(n) {
      this.show = false
      setTimeout(() => {
        this.currentIndex = n
        this.show = true
      }, 0)
    }
  }
}
</script>

<style scoped>
.carousel {margin-top:4px;padding-bottom:30px;}
.carousel-inner > div {min-height:177px;}
@media (min-width: 1200px){.carousel-inner > div {min-height:228px;}}
.carousel-indicators {bottom:0;border-radius: 12px;background-color: hsla(0,0%,100%,.3);margin-bottom: 0px;padding: 4px 8px;}
.carousel-indicators li {margin:0 3px;border:1px solid #ff8580;background-color: #f4665f;}
</style>
