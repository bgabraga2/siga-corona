<template>
  <card class="card-instagram" :type="post.type" :author="post.user" :date="createdPostData" :id="post._id">
    <instagram-embed :url="post.url" :max-width="498" />
  </card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import InstagramEmbed from 'vue-instagram-embed';
import { IPost } from 'api-client';

@Component({
  components: { Card, InstagramEmbed }
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
