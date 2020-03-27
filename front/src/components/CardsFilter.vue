<template>
  <div>
    <div class="filter" :class="{ 'is-active': filterActive }">
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
      <div class="about">
        <h2 class="color-gray-dark text--overline">
          sobre o projeto
        </h2>
        <h3 class="color-gray-dark text--body-sm lh14">
          #SigaCorona é um agregador de notícias compartilhadas por fontes confiáveis sobre o
          <strong>Corona Vírus</strong> nas principais redes sociais. Fique por dentro das últimas atualizações.
        </h3>
      </div>
    </div>
    <button
      class="filter__mobile-btn d-lg-none"
      :class="{ 'is-active': filterActive }"
      v-on:click="toggleFilter"
    ></button>
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
  filterActive: boolean = false;

  toggleFilter() {
    this.filterActive = !this.filterActive;
  }

  filtersItem: IFilterItem[] = [
    {
      name: 'Tweets',
      icon: require('@/assets/images/icon-twitter.svg'),
      value: 'twitter'
    },
    {
      name: 'Instagram',
      icon: require('@/assets/images/icon-instagram.svg'),
      value: 'instagram'
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
    this.filterActive = false;
    return this.filterSelected;
  }
}
</script>

<style lang="scss" scoped>
.lh14 {
  line-height: 1.4em;
  margin-bottom: 24px;
  margin-top: 10px;
  strong {
    font-weight: bold;
  }
}

.about {
  margin-top: auto;
  @include media-breakpoint-down(lg) {
    margin-top: 80px;
  }
}

.filter {
  width: 220px;
  height: calc(100vh - 92px);
  position: sticky;
  top: 92px;
  display: flex;
  flex-direction: column;

  @include media-breakpoint-down(lg) {
    position: fixed;
    z-index: 15;
    width: 100%;
    height: 120%;
    background: white;
    top: -45px;
    left: 0;
    opacity: 0;
    pointer-events: none;
    padding: 150px 16px 0;
    transition: all 300ms ease-in-out;

    &.is-active {
      opacity: 1;
      pointer-events: all;
    }
  }

  &__title {
    position: relative;
    padding-bottom: 10px;
    background-image: url('../assets/images/filter-line.png');
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: contain;
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

    @include media-breakpoint-down(lg) {
      display: flex;
      flex-direction: column;
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

  &__mobile-btn {
    position: fixed;
    bottom: 24px;
    left: 15px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: $green;
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 3px 3px rgba(0, 0, 0, 0.14);
    background-image: url('../assets/images/icon-open.png');
    background-repeat: no-repeat;
    background-position: center;
    z-index: 15;
    border: 0;
    outline: none;

    &.is-active {
      background-image: url('../assets/images/icon-close.png');
      background-repeat: no-repeat;
      background-position: center;
    }
  }
}
</style>
