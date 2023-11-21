<template>
  <div class="lang-switcher">
    <button v-for="code in supportedLocales" :key="`locale-${code}`" @click="switchLanguage" :value="code"
            :class="{'active': locale===code}">

      <img :src="`/flags/${code}.svg`" :alt="code" width="24">
      {{ t(`locale.${code}`) }}
    </button>
  </div>

</template>

<script setup>
import {useI18n} from "vue-i18n";
import translation from "@/i18n/translation"
import {useRouter} from "vue-router";

const {t, locale} = useI18n()
const supportedLocales = translation.supportedLocales
const router = useRouter()

const switchLanguage = async (e) => {
  const newLocale = e.target.value

  await translation.switchLanguage(newLocale)

  try {
    await router.replace({params: {locale: newLocale}})
  } catch (e) {
    console.error(e)
    await router.push('/')
  }
}

</script>

<style lang="scss" scoped>
.lang-switcher {
  display: flex;
  gap: 10px;
  margin-left: auto;

  button {
    display: flex;
    align-items: center;
    gap: 5px;
    border: none;
    background: none;
    color: var(--accent-color);

    &:hover {
      color: var(--basic-color)
    }

    &.active {
      font-weight: 700;
    }
  }
}
</style>