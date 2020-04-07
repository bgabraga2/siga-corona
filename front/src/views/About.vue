<template>
  <main>
    <section-info />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SectionInfo from '@/section/SectionInfo.vue';

@Component({
  components: { SectionInfo }
})
export default class About extends Vue {}
</script>
