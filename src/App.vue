<script setup lang="ts">
import { shallowRef } from 'vue';
import WeatherList from './pages/WeatherList.vue'
import TheSettings from './pages/TheSettings.vue'

const currentPage = shallowRef()

function changePage(pageName: string) {
  currentPage.value = pageName === 'list' ? WeatherList : TheSettings
}
currentPage.value = WeatherList
</script>

<template>
  <component :is="currentPage" @change-page="changePage" />
</template>