<template>
  <main>
    <div class="fav-list center">
      <div v-if="JSON.parse(citiesList).length > 0">
        <city-card v-for="city in JSON.parse(citiesList)" :key="city.id+i18n.locale.value" :name="city.name"
                   :id="city.id"/>
      </div>
      <p v-else>
        {{ $t('no-favs') }}
      </p>
    </div>
  </main>
</template>

<script setup>
import CityCard from "@/components/cards/CityCard.vue";
import {useI18n} from "vue-i18n";

const i18n = useI18n()

const citiesList = localStorage.getItem('my-locations')

</script>

<style lang="scss" scoped>
.fav-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  margin-top: 50px;
  padding-bottom: 100px;
  @media screen and (max-width: 1250px) {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
  @media screen and (max-width: 750px) {
    margin-top: 25px;
  }
}
</style>
