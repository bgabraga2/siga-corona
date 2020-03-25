<template>
  <card class="card-instagram">
    <instagram-embed :url="'https://www.instagram.com/p/Bs_yHwHBjKo/'" :max-width="498" />
  </card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import InstagramEmbed from 'vue-instagram-embed';

@Component({
  components: { Card, InstagramEmbed }
})
export default class CardYoutube extends Vue {
  videoId = 'HXmt0j1gtDU';
}
</script>

<style lang="scss">
.card-instagram {
  & > div {
    width: 498px;
  }
  iframe {
    margin: 0 auto;
    min-width: 100% !important;
    margin: 0 auto !important;
    border: 0 !important;
  }
}
</style>
