<template>
  <section class="section-cards">
    <div class="container">
      <div class="section-cards__content d-flex justify-content-center">
        <cards-filter @emit-filter-chosen="handleFilterChange" />
        <div class="section-cards__itens">
          <div v-for="post in posts" :key="post._id">
            <card-twitter v-if="post.type === 'twitter'" :post="post" />
            <card-youtube v-if="post.type === 'youtube'" :post="post" />
            <card-instagram v-if="post.type === 'instagram'" :post="post" />
          </div>
          <infinite-loading
            v-if="getFirstLoaded"
            :identifier="infiniteId"
            @infinite="infiniteHandler"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CardTwitter from '@/components/CardTwitter.vue';
import CardYoutube from '@/components/CardYoutube.vue';
import CardInstagram from '@/components/CardInstagram.vue';
import CardsFilter from '@/components/CardsFilter.vue';
import InfiniteLoading from 'vue-infinite-loading';
import { Getter, Action } from 'vuex-class';
import { IPost } from 'api-client';

@Component({
  components: { CardTwitter, CardYoutube, CardInstagram, CardsFilter, InfiniteLoading }
})
export default class SectionCards extends Vue {
  filterSelected = '';
  infiniteId = +new Date();
  @Getter('getPosts') posts: any;
  @Getter('haveMorePost') haveMorePost: any;
  @Getter('getFirstLoaded') getFirstLoaded: any;
  @Action('getPosts') getPosts: any;
  @Action('setFilterType') setFilterType: any;
  $gtm!: {
    sendCustomEvent: Function;
  };

  handleFilterChange(filter: string) {
    this.filterSelected = this.filterSelected === filter ? '' : filter;
    this.setFilterType(this.filterSelected);
    this.infiniteId += 1;

    if (filter) {
      this.$gtm.sendCustomEvent('click-filter', { name: this.filterSelected });
    }
  }

  infiniteHandler($state: any) {
    this.getPosts().then(() => {
      if (this.haveMorePost) {
        $state.loaded();
        this.$gtm.sendCustomEvent('user-scroll', { name: 'loaded' });
      } else {
        $state.complete();
        this.$gtm.sendCustomEvent('user-scroll', { name: 'complete' });
      }
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
      min-width: 100%;
    }
  }
}
</style>
