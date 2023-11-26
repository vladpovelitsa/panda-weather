<template>
  <nav class="nav">
    <ul class="nav__list">
      <li>
        <router-link class="nav__link" :to="Tr.i18nRoute({name: 'home'})">{{ $t('nav.home') }}</router-link>
      </li>
      <li>
        <router-link class="nav__link" :to="Tr.i18nRoute({name: 'my-locations'})">{{
            $t('nav.my-locations')
          }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import Tr from "@/i18n/translation";
import TheLangSwitcher from "@/components/common/TheLangSwitcher.vue";
</script>

<style lang="scss" scoped>
.nav {
  &__list {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 30px;
    margin: 0;
    padding: 0;
    @media screen and (max-width: 750px) {
      justify-content: space-between;
    }
  }

  &__link {
    color: var(--accent-color);
    text-decoration: none;
    font-size: 20px;

    &:hover {
      color: var(--accent-color)
    }
  }

  @media screen and (max-width: 750px) {
    order: 1;
    grid-column: 1 / -1;
  }
}


</style>