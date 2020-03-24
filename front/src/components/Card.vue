<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class Card extends Vue {}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 570px;
}
</style>