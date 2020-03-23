<template>
  <header>
    <div class="container">
      <h1>FOLLOW COVID-19</h1>
      <!-- <search-bar /> -->
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class TheHeader extends Vue {}
</script>

<style lang="scss" scoped>
header {
  height: 60px;
  width: 100%;
  background-color: red;
  display: flex;
  align-self: center;
  justify-content: flex-start;
}
</style>