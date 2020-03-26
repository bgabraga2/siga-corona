<template>
  <main>
    <section-cards />
    <scroll-top />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SectionCards from '@/section/SectionCards.vue';
import ScrollTop from '@/components/ScrollTop.vue';
import { Action } from 'vuex-class';
@Component({
  components: { SectionCards, ScrollTop }
})
export default class Home extends Vue {
  @Action('getPosts') getPosts: any;

  mounted() {
    this.getPosts();
  }
}
</script>
