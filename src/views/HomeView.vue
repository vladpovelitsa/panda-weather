<script setup>
import CityCard from "@/components/cards/CityCard.vue";
</script>

<template>

  <main class="center">

    <div class="city-list">
      <city-card/>
      <city-card/>
      <city-card/>
      <city-card/>
      <city-card/>
    </div>

  </main>

</template>

<style lang="scss" scoped>
.city-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 50px;
}
</style>
