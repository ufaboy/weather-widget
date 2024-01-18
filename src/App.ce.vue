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
.weather-page,
.settings-page-wrapper {
    padding: 1rem;
    max-width: 20rem;
    position: relative;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.settings-page {
    background-image: radial-gradient(circle, #bbece1, #006c96);
    border-radius: 0.5rem;
    padding: 1rem;
}

.weather-item {
    background-image: radial-gradient(circle, #bbece1, #006c96);
    border-radius: 0.5rem;
}

.weather-img-wrapper {
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.weather-info {
    border-left: 2px solid #AFD1CE;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    width: 100%;
}

.draggable-li {
  transition-property: all;
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

.flex-column {
  display: flex;
  flex-flow: column nowrap;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
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

.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}

.text-white {
  color: white;
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

.p-3 {
    padding: 0.75rem;
}
.px-3 {
    padding: 0.75rem;
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
  border-radius: 0.5rem;
}

.location-item {
  background-color: #afc8c6;
  border-radius: 0.25rem;
  padding: 0.75rem 0.25rem;
  color: black;
}

.line {
  width: 1rem;
  border-bottom: 1px solid;
  margin-bottom: 0.25rem;
}

.line:last-of-type {
  margin-bottom: 0;
}

.weather-li+.weather-li {
  margin-top: 1rem;
}

.control-btn {
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
}

.control-btn:hover {
  animation: rotate-center 0.3s ease-in-out both;
  border: 1px solid;
  border-radius: 50%;
}

.btn-trash:hover {
  animation: wobble-hor-bottom 0.4s both;
}

@keyframes rotate-center {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes wobble-hor-bottom {

  0%,
  100% {
    transform: translateX(0%);
    transform-origin: 50% 50%;
  }

  15% {
    transform: translateX(-7px) rotate(-6deg);
  }

  30% {
    transform: translateX(3px) rotate(6deg);
  }

  45% {
    transform: translateX(-3px) rotate(-3.6deg);
  }

  60% {
    transform: translateX(2px) rotate(2.4deg);
  }

  75% {
    transform: translateX(-1px) rotate(-1.2deg);
  }
}</style>