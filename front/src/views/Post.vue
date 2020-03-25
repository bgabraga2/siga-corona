<template>
  <main>
    <section-single-card :param-id="$route.params.id" />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SectionSingleCard from '@/section/SectionSingleCard.vue';

@Component({
  components: { SectionSingleCard }
})
export default class Post extends Vue {}
</script>
