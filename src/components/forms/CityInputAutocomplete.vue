<template>
  <input type="text" id="city" :placeholder="placeholder" class="autocomplete" :value="modelValue"
         :disabled="disabled"
         ref="autocompleteInput">
</template>

<script setup>
import {useGmapScript} from "@/use/useGmapScript";
import {onMounted, ref} from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  }

})
const emit = defineEmits(['update:modelValue'])
const autocompleteInput = ref(null)

let autocomplete
const loadApi = async () => {
  await useGmapScript()

  autocomplete = new window.google.maps.places.Autocomplete(document.querySelector('#city'), {
    types: ['locality'],
    fields: ['formatted_address']
  })
  autocomplete.addListener('place_changed', function () {
    let city = autocomplete.getPlace().formatted_address
    emit('update:modelValue', city)
  })

}

onMounted(async () => {
  await loadApi()
  autocompleteInput.value.focus()

})

</script>

<style lang="scss" scoped>
.autocomplete {
  font-size: 20px;
  border: none;
  color: var(--main-color);
  padding: 30px 0;
  background: none;
  outline: none;
  width: 100%;
  display: block;
  @media screen and (max-width: 750px) {
    padding: 15px 0;
  }
}

.hidden {
  width: 0;
  height: 0;
  overflow: hidden;
  display: none;
  opacity: 0;
}
</style>