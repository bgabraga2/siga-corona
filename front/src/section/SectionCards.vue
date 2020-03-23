<template>
  <section class="cards">
    <card-twitter />
    <card-youtube />
    <card-instagram />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CardTwitter from '@/components/CardTwitter.vue';
import CardYoutube from '@/components/CardYoutube.vue';
import CardInstagram from '@/components/CardInstagram.vue';

@Component({
  components: { CardTwitter, CardYoutube, CardInstagram }
})
export default class SectionCards extends Vue {}
</script>

<style lang="scss" scoped></style>
