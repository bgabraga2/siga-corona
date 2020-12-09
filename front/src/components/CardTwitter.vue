<template>
  <card class="card-twitter" :type="post.type" :author="post.user" :date="createdPostData" :id="post._id">
    <tweet :id="tweetId">
      <loading :is-active="true" />
    </tweet>
  </card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Tweet, Moment, Timeline } from 'vue-tweet-embed';
import Card from '@/components/Card.vue';
import { IPost } from 'api-client';
import Loading from '@/components/Loading.vue';

@Component({
  components: { Tweet, Card, Loading }
})
export default class CardTwitter extends Vue {
  @Prop() post!: IPost;

  get tweetId() {
    return this.fullJson.id_str;
  }

  get createdPostData() {
    return this.post.date;
  }

  get fullJson() {
    return JSON.parse(this.post.fullJson);
  }
}
</script>

<style lang="scss">
.card-twitter {
  position: relative;
}
.twitter-tweet {
  @include media-breakpoint-up(lg) {
    margin: 0 !important;
    min-width: 100% !important;
    border: none;
    width: 460px !important;
    height: 100%;
  }
}
</style>
