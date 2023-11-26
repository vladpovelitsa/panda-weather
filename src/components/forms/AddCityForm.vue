<template>
  <form class="add-city" @submit.prevent>
    <CityInputAutocomplete v-model="city" :key="i18n.locale.value" :disabled="isDisabledInput"
                           :placeholder="isDisabledInput ? $t('form.too-many-cities') : $t('form.placeholder')"/>
    <button @click="addCity" v-if="city" class="add-city__btn">+ {{ $t('form.add') }}</button>
  </form>

</template>

<script setup>

import CityInputAutocomplete from "@/components/forms/CityInputAutocomplete.vue";
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";
import {useCitiesStore} from "@/stores/cities";

const i18n = useI18n()
const city = ref('')
const citiesStore = useCitiesStore()
const addCity = () => {
  if (!city.value) {
    alert('please select city from list')
    return
  }
  citiesStore.addNewCity(city.value.split(',')[0])
  city.value = ''
}

const isDisabledInput = computed(() => {
  return citiesStore.citiesList.length >= 5
})
</script>

<style lang="scss" scoped>
.add-city {
  width: 100%;
  display: flex;
  border-bottom: 2px solid var(--accent-color);
  gap: 10px;

  &__btn {
    height: inherit;
    background: none;
    border: none;
    color: var(--main-color);
    white-space: nowrap;
    font-size: 18px;
    border-left: 2px solid var(--accent-color);
  }
}
</style>