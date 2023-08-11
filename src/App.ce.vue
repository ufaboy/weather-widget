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

<style>
.weather-page, .settings-page {
  padding: 1rem;
  max-width: 20rem;
  height: 100%
}

.draggable-li {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 100ms;
}

.btn-icon {
  cursor: pointer;
  border: 0;
  background-color: inherit;
  display: flex;
  align-items: center;
  padding: 0;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
}

.flex-row-nowrap {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.flex-row-wrap {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.text-bold {
  font-weight: 700;
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.w-4 {
  width: 1rem;
}


.mr-1 {
  margin-right: 0.25rem;
}

.mr-2 {
  margin-right: 0.5rem;
}
.mr-5 {
  margin-right: 1.25rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-3 {
  margin-bottom: 0.75rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.w-50percent {
  width: 50%;
}

.w-full {
  width: 100%;
}

.no-bullets {
  list-style-type: none;
  padding-left: 0;
  margin-top: 0;
}

.cursor-pointer {
  cursor: pointer;
}

label {
  margin-bottom: 0.25rem;
}

.search {
  flex: 1;
  padding: 0.5rem 1rem;
}
.location-item {
  background-color: #d4d4d4;
  border-radius: 0.25rem;
  padding: 0.75rem 0.25rem;
}

.line {
  width: 1rem;
  border-bottom: 1px solid;
  margin-bottom: 0.25rem;
}

.line:last-of-type {
  margin-bottom: 0;
}
.weather-li + .weather-li{
    margin-top: 2rem;
    border-color: black;
    border-top: 1px solid;
}
</style>