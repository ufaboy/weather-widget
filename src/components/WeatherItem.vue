<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { LocationData } from '../interfaces/Geo'
import { getWeather } from '../utils/api';
import { WeatherResponse } from '../interfaces/Weather';
import IconArrowUpRight from './IconArrowUpRight.vue'
import IconPressure from './IconPressure.vue'
import { degreesToCompass } from '../utils/geo'

const props = defineProps<{
  location: LocationData
}>()
const emit = defineEmits<{
  (e: 'update', data: WeatherResponse): void
}>()

const weatherData = ref<WeatherResponse>()

function getWeatherIconUrl(data: WeatherResponse) {
  const weather = data.weather.length ? data.weather[0] : undefined
  return weather ? `https://openweathermap.org/img/w/${weather?.icon}.png` : ''
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
  <div v-if="weatherData" class="weather-item flex-row-nowrap">
    <div class="weather-img-wrapper">
      <img :src="getWeatherIconUrl(weatherData)" :alt="getWeatherIconAlt(weatherData)" width="75" height="75" class="weather-img">
    </div>
    <div class="weather-info ">
      <b class="text-lg p-3">{{ weatherData.main.temp }} °C</b>
      <div class="flex-row-nowrap text-xs">
        <IconArrowUpRight class="icon mr-1" />
        {{ weatherData.wind.speed }}m/s {{ degreesToCompass(weatherData.wind.deg) }}
      </div>
      <div class="flex-row-nowrap">
        <div class="text-xs px-3">{{ getWeatherSummary(weatherData) }}</div>
      </div>
      <div class="text-bold p-3">{{ weatherData?.name }}, {{ weatherData?.sys.country }}</div>
    </div>
<!--     <div class="flex-row-nowrap justify-between">
      <h4 class="text-bold">{{ weatherData?.name }}, {{ weatherData?.sys.country }}</h4>
      <slot></slot>
    </div>
    <div class="flex-row-nowrap justify-center">
      <img :src="getWeatherIconUrl(weatherData)" :alt="getWeatherIconAlt(weatherData)" class="mr-5">
      <b class="text-lg">{{ weatherData.main.temp }}</b>
    </div>
    <div class="text-sm mb-3">{{ getWeatherSummary(weatherData) }}</div>
    <div class="flex-row-wrap">
      <div class="w-50percent flex-row-nowrap mb-2">
        <IconArrowUpRight class="icon mr-1" />{{ weatherData.wind.speed }}m/s {{ degreesToCompass(weatherData.wind.deg) }}
      </div>
      <div class="w-50percent flex-row-nowrap mb-2">
        <IconPressure class="icon mr-1" />{{ weatherData.main.pressure }}hPa
      </div>
      <div class="w-50percent mb-2">Humidity: {{ weatherData.main.humidity }}%</div>
      <div class="w-50percent mb-2">Dew point: {{ '—' }}</div>
      <div>Visibility: {{ weatherData.visibility }}</div>
    </div> -->
  </div>
</template>