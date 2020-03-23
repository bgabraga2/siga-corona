<template>
  <card>
    <youtube :video-id="videoId"></youtube>
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

<style lang="scss" scoped></style>
