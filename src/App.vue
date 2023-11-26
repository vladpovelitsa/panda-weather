<script setup>
import {RouterView} from 'vue-router'
import TheHeader from "@/components/common/TheHeader.vue";

localStorage.getItem('theme') === 'dark' ? document.body.classList.add('dark-theme') : null
</script>

<template>

  <TheHeader/>
  <RouterView/>

</template>


