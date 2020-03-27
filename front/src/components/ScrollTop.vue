<template>
  <div class="scroll-top">
    <div class="container">
      <button class="scroll-top-btn" :class="{ 'is-active': isScrolled }" v-on:click="scrollToTop">
        <img :src="require('../assets/images/chevron-up.svg')" alt="Chevron TOP" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
var VueScrollTo = require('vue-scrollto');

@Component({
  components: {}
})
export default class TheHeader extends Vue {
  scrollTrigger = 150;
  isScrolled = false;

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (window.scrollY > this.scrollTrigger && !this.isScrolled) {
      this.isScrolled = true;
    }

    if (window.scrollY < this.scrollTrigger && this.isScrolled) {
      this.isScrolled = false;
    }
  }

  scrollToTop() {
    VueScrollTo.scrollTo('#header');
  }
}
</script>

<style lang="scss" scoped>
.scroll-top {
  position: fixed;
  bottom: 24px;
  width: 100%;
  pointer-events: none;

  &-btn {
    background: $green;
    border: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    pointer-events: all;
    opacity: 0;
    transform: scale(0.5);
    transition: all 350ms ease-in-out;
    outline: none;
    width: 44px;
    height: 44px;

    margin-left: auto;

    img {
      width: 20px;
      height: 20px;
      object-fit: contain;
      object-position: center;
      transform: translateY(-1px);
    }

    &.is-active {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>
