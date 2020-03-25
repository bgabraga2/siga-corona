<template>
  <section class="section-cards">
    <div class="container">
      <div class="section-cards__content d-flex justify-content-center">
        <div class="section-cards__itens">
          <div v-for="post in posts" :key="post._id">
            <card-twitter v-if="post.type === 'twitter'" :post="post" />
            <card-youtube v-if="post.type === 'youtube'" :post="post" />
            <card-instagram v-if="post.type === 'instagram'" :post="post" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CardTwitter from '@/components/CardTwitter.vue';
import CardYoutube from '@/components/CardYoutube.vue';
import CardInstagram from '@/components/CardInstagram.vue';
import CardsFilter from '@/components/CardsFilter.vue';
import { IPost } from 'api-client';
import api from '../api';

@Component({
  components: { CardTwitter, CardYoutube, CardInstagram, CardsFilter }
})
export default class SectionSingleCard extends Vue {
  @Prop() paramId!: string;
  posts: IPost[] = [];

  mounted() {
    api
      .getPost(this.paramId)
      .then(res => {
        this.posts = [res];
      })
      .catch(err => {
        this.$router.push('/');
      });
  }
}
</script>

<style lang="scss" scoped>
.section-cards {
  &__itens {
    margin: 15px auto 0;

    @include media-breakpoint-down(lg) {
      max-width: 100%;
    }
  }
}
</style>
