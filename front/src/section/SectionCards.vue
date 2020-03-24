<template>
  <section class="cards">
    <div class="container">
      <div class="cards__content d-flex justify-content-start">
        <cards-filter @emit-filter-chosen="handleFilterChange" />
        <pre></pre>
        <div class="cards__itens">
          <card-twitter />
          <card-youtube />
          <card-instagram />
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

@Component({
  components: { CardTwitter, CardYoutube, CardInstagram, CardsFilter }
})
export default class SectionCards extends Vue {
  filterSelected = '';

  handleFilterChange(filter: string) {
    this.filterSelected = this.filterSelected === filter ? '' : filter;
  }
}
</script>

<style lang="scss" scoped>
.cards {
  &__itens {
    margin-left: 60px;
  }
}
</style>
