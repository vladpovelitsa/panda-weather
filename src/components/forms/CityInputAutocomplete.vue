<template>
  <div>
    <input type="text" id="test" placeholder="placeholder" class="autocomplete">
  </div>
</template>

<script setup>
import {useI18n} from "vue-i18n";
import {useGmapScript} from "@/use/useGmapScript";
import {onMounted} from "vue";

let autocomplete
const i18n = useI18n()
const loadApi = async () => {
  await useGmapScript()

  autocomplete = new google.maps.places.Autocomplete(document.querySelector('#test'), {
    types: ['locality'],
    fields: ['formatted_address']
  })
  autocomplete.addListener('place_changed', function () {
    let city = autocomplete.getPlace().formatted_address.split(',')[0]
    console.log(city)
  })
}

onMounted(() => {
  loadApi()
})

</script>

<style lang="scss" scoped>
.autocomplete {
  font-size: 20px;
  border: none;
  border-bottom: 2px solid var(--accent-color);
  color: #fff;
  padding: 0 10px 5px;
  background: none;
  outline: none;
  width: 100%;
  text-align: center;
}
</style>