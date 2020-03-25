<template>
  <card class="card-youtube" :type="post.type" :author="post.user" :date="createdPostData" :id="post._id">
    <youtube :video-id="post.socialId" player-width="498"></youtube>
  </card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import { IPost } from 'api-client';

@Component({
  components: { Card }
})
export default class CardYoutube extends Vue {
  @Prop() post!: IPost;

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
  iframe {
    width: 100%;
    min-width: 498px;
    max-width: 100%;
  }
}
</style>
