<template>
  <card class="card-youtube">
    <youtube :video-id="videoId" player-width="498"></youtube>
  </card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';

@Component({
  components: { Card }
})
export default class CardYoutube extends Vue {
  videoId = 'HXmt0j1gtDU';
}
</script>

<style lang="scss">
.card-youtube {
  iframe {
    width: 100%;
  }
}
</style>
