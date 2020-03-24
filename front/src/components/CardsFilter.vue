<template>
  <div class="filter">
    <p class="filter__title color-gray-dark title--h6">Filtros</p>
    <ul class="filter__list">
      <p class="filter__label color-gray-dark text--overline">plataformas</p>
      <li class="filter__list-item" v-for="item in filtersItem" :key="item.value">
        <button
          class="filter__btn color-gray-dark text--body"
          :class="{ 'is-active': item.value === filterSelected }"
          v-on:click="emitFilterChosen(item.value)"
        >
          <img class="filter__img" :src="item.icon" :alt="item.name" />
          {{ item.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import Card from '@/components/Card.vue';

interface IFilterItem {
  name: string;
  icon: any;
  value: string;
}

@Component({
  components: {}
})
export default class CardsFilter extends Vue {
  filterSelected = '';

  filtersItem: IFilterItem[] = [
    {
      name: 'Tweets',
      icon: require('@/assets/images/icon-twitter.svg'),
      value: 'twitter'
    },
    {
      name: 'Instagram',
      icon: require('@/assets/images/icon-instagram.svg'),
      value: 'instragram'
    },
    {
      name: 'Youtube',
      icon: require('@/assets/images/icon-youtube.svg'),
      value: 'youtube'
    }
  ];

  @Emit()
  emitFilterChosen(value: string) {
    this.filterSelected = this.filterSelected === value ? '' : value;
    return this.filterSelected;
  }
}
</script>

<style lang="scss" scoped>
.filter {
  width: 220px;
  height: 100%;
  position: sticky;
  top: 92px;

  &__title {
    /* border-width: 3px; */
    /* border-style: solid; */
    /* border-image: linear-gradient(90deg, #1ef58e 0%, #0bff98 0.01%, rgba(11, 255, 152, 0.05) 100%); */
    /* border-color: #1ef58e; */
    border-bottom: 3px solid #1ef58e;
    padding-bottom: 10px;
  }

  &__img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-right: 8px;
  }

  &__list {
    &-item {
      height: 36px;
      margin-bottom: 15px;
      display: inline-block;
    }
  }

  &__btn {
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    display: inline-block;
    cursor: pointer;
    outline: none;
    padding: 0 10px;
    text-align: left;
    transition: all 300ms ease-in-out;

    &:hover {
      background: linear-gradient(180deg, #1ef58e 0%, #0bff98 0.01%, rgba(30, 245, 142, 0.05) 100%);
    }

    &.is-active {
      background: $green;
    }
  }

  &__label {
    margin-top: 20px;
    margin-bottom: 10px;
  }
}
</style>
