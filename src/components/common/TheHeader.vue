<template>
  <header class="header center">
    <button class="change-theme" @click="switchTheme">
      {{ $t('change-theme') }}
    </button>
    <TheNav/>

    <router-link to="/" class="logo">
      <img src="/panda_logo.png" alt="panda logo" width="100">
      <!--      {{ $t('app-title') }}-->
    </router-link>

    <TheLangSwitcher/>

  </header>
</template>

<script setup>
import TheNav from "@/components/common/TheNav.vue";
import TheLangSwitcher from "@/components/common/TheLangSwitcher.vue";

const switchTheme = () => {
  localStorage.getItem('theme') === 'dark'
      ? (localStorage.setItem('theme', 'light'), document.body.classList.remove('dark-theme'))
      : (localStorage.setItem('theme', 'dark'), document.body.classList.add('dark-theme'))
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 100px 1fr;
  gap: 30px;
  align-items: end;
  padding-top: 15px;
  padding-bottom: 15px;
  background: var(--main-color);
  color: var(--basic-color);
  box-shadow: var(--box-shadow);

  @media screen and (max-width: 750px) {
    grid-template-columns: 100px 1fr;
    justify-content: space-between;
    gap: 15px 30px;
  }
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  font-weight: 700;
  color: var(--accent-color);
  font-size: 14px;

  img {
    filter: invert(1);
    display: block;
    max-width: 100%;
  }
}

.change-theme {
  border: none;
  background: none;
  color: var(--accent-color);
  position: absolute;
  top: 20px;
  right: 20px;
}

.dark-theme {
  .header {
  }

  .logo img {
    filter: none;
  }
}
</style>