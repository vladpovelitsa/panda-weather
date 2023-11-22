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

    <CityInputAutocomplete :key="i18n.locale.value"/>

    <TheLangSwitcher/>

  </nav>
</template>

<script setup>
import Tr from "@/i18n/translation";
import TheLangSwitcher from "@/components/common/TheLangSwitcher.vue";
import CityInputAutocomplete from "@/components/forms/CityInputAutocomplete.vue";
import {useI18n} from "vue-i18n";

const i18n = useI18n()

</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 350px 1fr;
  gap: 30px;

  &__list {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 30px;
    margin: 0;
    padding: 0;
  }

  &__link {
    color: var(--accent-color);
    text-decoration: none;
    font-size: 20px;

    &:hover {
      color: var(--accent-color)
    }
  }
}


</style>