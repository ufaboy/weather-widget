<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { LocationData } from '../interfaces/Geo'
import { getWeather } from '../utils/api';
import { WeatherResponse } from '../interfaces/Weather';
import IconArrowUpRight from './IconArrowUpRight.vue'
import IconPressure from './IconPressure.vue'
import {degreesToCompass} from '../utils/geo'

const props = defineProps<{
  location: LocationData
}>()
const emit = defineEmits<{
  (e: 'update', data: WeatherResponse): void
}>()

const weatherData = ref<WeatherResponse>()

function getWeatherIconUrl(data: WeatherResponse) {
  const weather = data.weather.length ? data.weather[0] : undefined
  return weather ? `http://openweathermap.org/img/w/${weather?.icon}.png` : ''
}
function getWeatherIconAlt(data: WeatherResponse) {
  const weather = data.weather.length ? data.weather[0] : undefined
  return weather ? weather.main.toString() : 'weather icon'
}
function getWeatherSummary(data: WeatherResponse) {
  return `Feels like ${data.main.feels_like}, ${data.weather[0].description}`
}
onMounted(async () => {
  weatherData.value = await getWeather(props.location)
  if (weatherData.value) {
    emit('update', weatherData.value)
  }
})
</script>

<template>
  <div v-if="weatherData" class="pb-3">
    <div class="flex flex-row flex-nowrap justify-between items-center">
      <h2 class="font-bold">{{ weatherData?.name }}, {{ weatherData?.sys.country }}</h2>
      <slot></slot>
    </div>
    <div class="flex flex-row justify-center items-center">
      <img :src="getWeatherIconUrl(weatherData)" :alt="getWeatherIconAlt(weatherData)" class="mr-5">
      <b class="text-lg">{{ weatherData.main.temp }}</b>
    </div>
    <div class="text-sm">{{ getWeatherSummary(weatherData) }}</div>
    <div class="flex flex-row flex-wrap">
      <div class="w-1/2 flex flex-row items-center">
        <IconArrowUpRight class="w-4 mr-1" />{{ weatherData.wind.speed }}m/s {{ degreesToCompass(weatherData.wind.deg)}}
      </div>
      <div class="w-1/2 flex flex-row items-center">
        <IconPressure class="w-4 mr-1" />{{ weatherData.main.pressure }}hPa
      </div>
      <div class="w-1/2">Humidity: {{ weatherData.main.humidity }}%</div>
      <div class="w-1/2">Dew point: {{ '—' }}</div>
      <div>Visibility: {{ weatherData.visibility }}</div>
    </div>
  </div>
</template>