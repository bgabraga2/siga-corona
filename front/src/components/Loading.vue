<template>
  <div class="loading" :class="{ 'is-active': isActive }">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  <!-- <div class="loading" :class="{ 'is-active': isActive }"></div> -->
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class Loading extends Vue {
  @Prop() isActive!: boolean;
}
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  background: $green;
  top: -2px;
  left: -4px;
  background: #eaeaea;
  pointer-events: none;
  width: 99%;
  height: 102%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;

  @include media-breakpoint-down(lg) {
    width: 102%;
    height: 102%;
  }

  &.is-active {
    pointer-events: all;
    opacity: 1;
  }
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
