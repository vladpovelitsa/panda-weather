import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useCitiesStore = defineStore('cities', () => {
    const citiesList = ref([])

    function addNewCity(data) {
        try {
            const isCityAdded = citiesList.value.findIndex(item => item.name === data)
            if (isCityAdded < 0) {
                citiesList.value.push({name: data, id: Date.now()})
            } else {
                throw new Error(data + ' already added')
            }
        } catch (err) {
            console.error(err)
            alert(err)
        }
    }

    function removeCity(id) {
        console.log(citiesList.value.findIndex(item => +item.id === +id))
        citiesList.value.splice(citiesList.value.findIndex(item => +item.id === +id), 1)
    }

    return {citiesList, addNewCity, removeCity}
})
