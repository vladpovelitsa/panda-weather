<template>
  <header class="header center">

    <router-link to="/" class="logo">
      <img src="/panda_logo.png" alt="panda logo" width="100">
      {{ $t('app-title') }}
    </router-link>
    <TheNav/>


  </header>
</template>

<script setup>
import TheNav from "@/components/common/TheNav.vue";
import {useI18n} from "vue-i18n";

const i18n = useI18n()

</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
  background: var(--main-color);
  color: #fff;
  margin-bottom: 30px;
  box-shadow: var(--box-shadow);
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  font-weight: 700;
  color: var(--accent-color);
  font-size: 14px;
  margin-bottom: 15px;

  img {
    filter: invert(1);

  }
}
</style>