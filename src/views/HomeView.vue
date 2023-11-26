<template>
  <main>

    <AddCityForm class="center"/>

    <div class="city-list center">
      <city-card v-for="city in citiesList.citiesList" :key="city.id+i18n.locale.value" :name="city.name"
                 :id="city.id"/>
    </div>
  </main>
</template>

<script setup>
import CityCard from "@/components/cards/CityCard.vue";
import {useCitiesStore} from "@/stores/cities";
import {useI18n} from "vue-i18n";
import AddCityForm from "@/components/forms/AddCityForm.vue";

const i18n = useI18n()

const citiesList = useCitiesStore()

const addDefaultCity = async () => {
  const fetchUserIpData = await fetch(`https://api.ipdata.co?api-key=${import.meta.env.VITE_IPDATA_API_KEY}`)
  const resultUserIpData = await fetchUserIpData.json()
  citiesList.addNewCity(resultUserIpData.city)
}

if (!citiesList.citiesList.length) {
  addDefaultCity()
}

</script>

<style lang="scss" scoped>
.city-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  margin-top: 50px;
  padding-bottom: 100px;
  
  @media screen and (max-width: 1250px) {
    display: flex;
    flex-direction: column-reverse;
    gap: 25px;
  }
  @media screen and (max-width: 750px) {
    margin-top: 25px;
  }
}
</style>
