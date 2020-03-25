<template>
  <div class="card">
    <div class="card__slot">
      <slot></slot>
    </div>
    <aside class="card__aside">
      <div class="card__info">
        <img class="card__social" :src="require('@/assets/images/icon-instagram.svg')" alt />
        <p class="card__author color-gray-dark text--subtitle">@digital_archive</p>
        <p class="card__date color-gray-medium text--caption">05/04/2019</p>
        <p class="card__time color-gray-medium text--caption">19:09</p>
      </div>
      <div class="card__share">
        <p class="card__author color-gray-dark text--caption">compartilhe:</p>
        <ul class="card__list">
          <li class="card__list-item">
            <a href target="_blank">
              <img :src="require('@/assets/images/icon-whatsapp.svg')" alt />
            </a>
          </li>
          <li class="card__list-item">
            <a href target="_blank">
              <img :src="require('@/assets/images/icon-twitter.svg')" alt />
            </a>
          </li>
          <li class="card__list-item">
            <a href target="_blank">
              <img :src="require('@/assets/images/icon-facebook.svg')" alt />
            </a>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class Card extends Vue {}
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  margin-bottom: 35px;

  @include media-breakpoint-down(lg) {
    flex-direction: column;
  }

  &__slot {
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14);
    overflow: hidden;
    border-radius: 4px;
    width: 100%;
  }

  &__social {
    margin-bottom: 12px;
  }

  &__author {
    margin-bottom: 10px;
  }

  &__date {
    margin-bottom: 5px;
  }

  &__share {
    @include media-breakpoint-up(lg) {
      margin-top: 70px;
    }
  }

  &__list {
    display: flex;
    justify-content: flex-start;
    align-content: center;

    &-item {
      margin-right: 16px;
    }
  }

  &__aside {
    height: 100%;
    margin-left: 40px;
    position: relative;

    @include media-breakpoint-down(lg) {
      display: flex;
      margin-left: 14px;
      margin-top: 12px;
      justify-content: space-between;
      align-items: center;
    }

    &:before {
      content: '';
      position: absolute;
      background: url('../assets/images/lines.png');
      width: 300px;
      height: 100px;
      top: -14px;
      left: -317px;
      background-size: contain;
      background-repeat: no-repeat;
      pointer-events: none;

      @include media-breakpoint-down(lg) {
        display: none;
      }
    }
  }
}
</style>
