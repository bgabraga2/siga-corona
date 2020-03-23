<template>
  <main>
    <h1>HOME</h1>
    <section-cards />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SectionCards from '@/section/SectionCards.vue';

@Component({
  components: { SectionCards }
})
export default class Home extends Vue {}
</script>
