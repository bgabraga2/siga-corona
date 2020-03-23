<template>
  <div id="app">
    <the-header />
    <router-view />
    <the-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TheHeader from './components/TheHeader.vue';
import TheNav from './components/TheNav.vue';
import TheFooter from './components/TheFooter.vue';

@Component({
  components: {
    TheHeader,
    TheFooter,
    TheNav
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';
</style>
