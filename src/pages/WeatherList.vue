<script setup lang="ts">
import { onMounted, ref } from 'vue';
import IconGear from '../components/IconGear.vue';
import WeatherItem from '../components/WeatherItem.vue';
import { LocationData } from '../interfaces/Geo'
import { WeatherResponse } from '../interfaces/Weather';
import { saveLocationsFromStorage, loadLocationsFromStorage } from '../utils/storage'

const emit = defineEmits<{
    (e: 'change-page', page: string): void
    (e: 'update-locations', data: WeatherResponse): void
}>()
const locations = ref<LocationData[]>(loadLocationsFromStorage())

function errorPositionHandler() {
    console.error('errorPositionHandler');
}
function updateLocation(event: WeatherResponse, index: number) {
    locations.value[index] = { city: event.name, country: event.sys.country, latitude: event.coord.lat, longitude: event.coord.lon }
    saveLocationsFromStorage(locations.value)
}

onMounted(() => {
    if (!locations.value.length) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            locations.value.push({ latitude: position.coords.latitude, longitude: position.coords.longitude })
        }, errorPositionHandler);
    }
})

</script>
<template>
    <div class="relative">
        <ul>
            <li v-for="(location, index) in locations" class="mb-8 last:mb-0 border-b">
                <WeatherItem :location="location" @update="updateLocation($event, index)">
                    <template v-if="index === 0">
                        <button class="" @click="emit('change-page', 'settings')">
                            <IconGear class="w-5 h-5" />
                        </button>
                    </template>
                </WeatherItem>
            </li>
        </ul>

    </div>
</template>