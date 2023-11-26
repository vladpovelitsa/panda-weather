<template>
  <article :class="['city-card', {'city-card_fav': isFav}]" ref="card">
    <div class="" v-if="!loading && weather.cod === 200">
      <div class="city-card__buttons">
        <button class="city-card__btn city-card__btn_toggle" @click="changeType">
          {{ isHourly ? $t('card.by-days') : $t('card.by-hours') }}
        </button>
        <button class="city-card__btn city-card__btn_fav" @click="updateFav">
          {{ isFav ? $t('card.remove-fav') : $t('card.to-fav') }}
        </button>

        <button class="city-card__btn city-card__btn_remove" @click="showModal=true"
                v-if="route.name !== 'my-locations'">
          {{ $t('card.remove') }}
        </button>
      </div>


      <h2 class="city-card__name">
        {{ weather.name }}
      </h2>

      <div class="city-card__info">
        <div class="city-card__row city-card__row_main">
          <span class="city-card__icon"><img
              :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`"
              :alt="weather.weather[0].description"
          /></span>
          <p>
            <span class="city-card__temp">

              {{ Math.round(weather.main.temp) }} °C
          </span>
            <span class="city-card__feels">
            ({{ $t('card.feels-like') }} {{ Math.round(weather.main.feels_like) }}°C. )
          </span>
            <strong class="city-card__summary"> {{ weather.weather[0].description }}.</strong>
          </p>

        </div>
        <p class="city-card__row">
          {{ Math.round(weather.wind.speed) }} {{ $t('card.ms') }}
        </p>
        <p class="city-card__row">
          {{ $t('card.humidity') }}: {{ Math.round(weather.main.humidity) }}%
        </p>
        <p class="city-card__row">
          {{ Math.round(weather.main.pressure) }} {{ $t('card.hpa') }}
        </p>

        <p class="city-card__row">
          {{ $t('card.visibility') }}: {{ (weather.visibility / 1000).toFixed(1) }} {{ $t('card.km') }}
        </p>
      </div>
      <hr>
      <Bar
          id="my-chart-id"
          :options="{
            responsive: true
          }"
          :data="chartData"
          :key="isHourly ? 'hourly' : 'dayly'"
      />

    </div>
    <div v-else-if="!loading && weather.cod !== 200">
      error has been observed
    </div>
    <div v-else-if="loading">
      Loading...
    </div>
  </article>

  <teleport to="body">
    <modal v-if="showModal" v-model="showModal">
      <template #title>
        You trying to delete {{ weather.name }}. <br>
        Are you sure?
      </template>
      <template #content>
        <div class="deleting-buttons">
          <button class="city-card__btn" @click="(citiesStore.removeCity(props.id), showModal = false)">Yes</button>
          <button class="city-card__btn" @click="showModal = false">No</button>
        </div>
      </template>

    </modal>
  </teleport>
</template>

<script setup>
// imports
import {onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useAvgTempByDays} from "@/use/useAvgTempByDays";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import {Bar} from 'vue-chartjs'
import Modal from "@/components/common/Modal.vue";
import {useCitiesStore} from "@/stores/cities";
import {useRoute} from 'vue-router'

// imports

// props
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true,
  }
})
// props

// fetch weather
const i18n = useI18n()
const weather = ref({})
const hourlyForecast = ref({})
const loading = ref(false);
const weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/'
const weatherQueryParams = `?q=${props.name}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric&lang=${i18n.locale.value}`
const isHourly = ref(true)
const fetchWeather = async (type) => {
  loading.value = true
  let weatherData
  try {
    weatherData = await fetch(`${weatherBaseUrl}${type}${weatherQueryParams}`)
    let result = await weatherData.json()
    if (result.cod.toString() === '200') {
      return result
    } else {
      throw new Error(result.message)
    }
  } catch (err) {
    alert(err)
    console.error(err)
  }
}
// fetch weather

// chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const chartData = ref({
  labels: [],
  datasets: [{
    label: i18n.t('card.temp') + ', °C',
    data: [],
    backgroundColor: '#e85233',
  }],
})
const setLabels = (data) => {
  chartData.value.labels = []
  chartData.value.datasets[0].data = []
  if (isHourly.value) {
    data.list.slice(0, 5).forEach(item => {
      chartData.value.labels.push(item.dt_txt.split(' '))
      chartData.value.datasets[0].data.push(Math.round(item.main.temp))
    })
  } else {
    let listByDays = useAvgTempByDays(data.list)
    listByDays.forEach((item) => {
      chartData.value.labels.push(item.date)
      chartData.value.datasets[0].data.push(item.avg_temp)
    })
  }
}
const changeType = () => {
  isHourly.value = !isHourly.value
  setLabels(hourlyForecast.value)
}
// chart

// favorites
const isFav = ref(false)
const updateFav = () => {
  if (!localStorage.getItem('my-locations')) {
    localStorage.setItem('my-locations', JSON.stringify([{
      name: weather.value.name,
      id: weather.value.id
    }]))
  } else if (JSON.parse(localStorage.getItem('my-locations')).length >= 5) {
    alert(i18n.t('form.too-many-cities'))
    return null
  } else {
    const favs = JSON.parse(localStorage.getItem('my-locations'))
    const itemIndex = favs.findIndex(item => +item.id === +weather.value.id)
    if (itemIndex < 0) {
      favs.push({
        name: weather.value.name,
        id: weather.value.id
      })
    } else {
      favs.splice(itemIndex, 1)
    }
    isFav.value = !isFav.value
    localStorage.setItem('my-locations', JSON.stringify(favs))
  }
}
// favorites

// deleting card
const showModal = ref(false)
const citiesStore = useCitiesStore()
const route = useRoute()

// deleting card

onMounted(async () => {
  weather.value = await fetchWeather('weather')
  hourlyForecast.value = await fetchWeather('forecast')
  loading.value = false
  isFav.value = JSON.parse(localStorage.getItem('my-locations'))?.findIndex(item => item.id === weather.value.id) >= 0
  setLabels(hourlyForecast.value)
})

</script>

<style lang="scss" scoped>
.city-card {
  padding: 20px 30px;
  position: relative;
  border-radius: 20px;
  box-shadow: var(--box-shadow);
  background: var(--basic-color);
  color: var(--main-color);
  border: 1px solid transparent;
  transition: .3s;

  &__btn {
    border: 1px solid var(--accent-color);
    color: var(--main-color);
    background: var(--basic-color);
    padding: 5px 10px;
    display: inline-block;

    &:hover {
      opacity: .6;
    }

    &_remove {
      margin-left: auto;
    }
  }

  &__buttons {
    display: flex;
    gap: 10px;
  }

  &__info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  &__row {
    margin: 0;

    &_main {
      grid-column: 1 / -1;
      display: inline-flex;
      align-items: center;
      white-space: nowrap;
      flex-wrap: wrap;
      gap: 10px;
    }
  }

  &__summary {
    width: 100%;
    display: block;
    margin-top: 5px;
  }

  &_fav {
    border-color: var(--accent-color);

    .city-card__btn.city-card__btn_fav {
      background: var(--accent-color);
      color: var(--basic-color)
    }
  }

  &:first-child {
    .city-card__btn_remove {
      display: none;
    }
  }
}

.deleting-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;

  button {
    font-size: 20px;
  }
}
</style>