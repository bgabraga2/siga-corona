<template>
  <section class="cards">
    <card-twitter />
    <card-youtube />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CardTwitter from '@/components/CardTwitter.vue';
import CardYoutube from '@/components/CardYoutube.vue';

@Component({
  components: { CardTwitter, CardYoutube }
})
export default class SectionCards extends Vue {}
</script>

<style lang="scss" scoped></style>
