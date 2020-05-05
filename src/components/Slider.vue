<template>
  <div v-if="slides.length" class="carousel slide" @mouseover="stop" @mouseout="play">
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
      <li v-for="n in slides.length" :class="{ active: n - 1 === currentIndex }" @click="playTo(n - 1)"></li>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    // 轮播项
    slides: {
      type: Array,
      default: () => []
    },
    // 是否自动轮播
     autoplay: {
      type: Boolean,
      default: true
    },
    // 轮播延迟
    delay: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      currentIndex: 0, // 当前项索引
      show: true // 是否显示当前项
    }
  },
  computed: {
    // 当前项
    currentSlide() {
      return this.slides[this.currentIndex]
    },
    // 下一项索引
    nextIndex() {
      if (this.currentIndex === this.slides.length - 1) {
        return 0
      } else {
        return this.currentIndex + 1
      }
    }
  },
  mounted() {
    if (this.autoplay) this.play()
  },
  methods: {
    play() {
      if (this.autoplay) {
        this.interval = setInterval(() => {
          this.playTo(this.nextIndex)
        }, this.delay)
      }
    },
    stop() {
      if (this.interval) clearInterval(this.interval)
    },
    playTo(n) {
      if (this.currentIndex === n) return
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