<template>
  <card>
    <tweet id="692527862369357824"></tweet>
  </card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Tweet, Moment, Timeline } from 'vue-tweet-embed';
import Card from '@/components/Card.vue';

@Component({
  components: { Tweet, Card }
})
export default class CardTwitter extends Vue {}
</script>

<style lang="scss">
.twitter-tweet {
  margin: 0 !important;
}
</style>
