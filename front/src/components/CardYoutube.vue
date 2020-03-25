<template>
  <card class="card-youtube" :type="post.type" :author="post.user" :date="createdPostData" :id="post._id">
    <youtube @ready="ready" :video-id="post.socialId" player-width="498"></youtube>
    <loading :is-active="loadingActive" />
  </card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import Loading from '@/components/Loading.vue';
import { IPost } from 'api-client';

@Component({
  components: { Card, Loading }
})
export default class CardYoutube extends Vue {
  @Prop() post!: IPost;
  loadingActive: boolean = true;

  ready() {
    this.loadingActive = false;
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
.card-youtube {
  position: relative;
  iframe {
    width: 100%;
    min-width: 498px;
    max-width: 100%;
  }
}
</style>
