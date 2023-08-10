<script setup lang="ts">
import { ref } from 'vue';
import LocationItem from '../components/LocationItem.vue'
import IconCross from '../components/IconCross.vue';
import { saveLocationsFromStorage, loadLocationsFromStorage } from '../utils/storage'
import { getLocationsData } from '../utils/api'
import { LocationData } from '../interfaces/Geo'
import IconEnter from '../components/IconEnter.vue';

const emit = defineEmits(['change-page'])

const locations = ref<LocationData[]>(loadLocationsFromStorage())
const searchString = ref('')

const draggedItemIndex = ref<number | null>(null)

async function findAndAddLocation() {
    const result = await getLocationsData(searchString.value)
    if (result) {
        const loc = result[0]
        locations.value.push({
            city: loc.name,
            latitude: loc.lat,
            longitude: loc.lon,
            country: loc.country
        })
        saveLocationsFromStorage(locations.value)
    }
}

function deleteLocation(index: number) {
    locations.value.splice(index, 1)
    saveLocationsFromStorage(locations.value)
}
function dragStartHandler(index: number) {
    draggedItemIndex.value = index
}
function dragoverHandler(index: number) {
    if (draggedItemIndex.value !== null && draggedItemIndex.value !== index) {
        const draggedItem = locations.value[draggedItemIndex.value];
        locations.value.splice(draggedItemIndex.value, 1);
        locations.value.splice(index, 0, draggedItem);
        draggedItemIndex.value = index;
    }
    /*     const elements = document.querySelectorAll(
        '.draggable-li')
        elements.forEach(function (item) {
            item.classList.remove('translate-y-6');
        });
        const target = event.target as HTMLElement
        target.classList.add('translate-y-6')
        console.log({ 'dragoverHandler': event }); */
}
function dropHandler() {
    console.log('dropHandler');
    draggedItemIndex.value = null
    saveLocationsFromStorage(locations.value)
}

</script>
<template>
    <div class="flex flex-row justify-between mb-4">
        <h2>Settings</h2>
        <button class="" @click="emit('change-page', 'list')">
            <IconCross class="w-5 h-5" />
        </button>
    </div>
    <ol>
        <li v-for="(loc, index) in locations" class="draggable-li mb-3 transition ease-in-out delay-100"
            :draggable="draggedItemIndex === index" @dragstart="dragStartHandler(index)"
            @dragover="dragoverHandler(index)" @drop="dropHandler" @dragend="dropHandler">
            <LocationItem @delete="deleteLocation(index)" @start-drag="draggedItemIndex = index">
                {{ loc.city }}, {{ loc.country }}
            </LocationItem>
        </li>
    </ol>

    <form @submit.prevent="findAndAddLocation" class="flex flex-row flex-wrap justify-between items-center">
        <label class="w-full">Add location</label>
        <input type="search" class="border rounded flex-1 mr-2 px-4 py-2" placeholder="New York" v-model="searchString">
        <button type="button" class="w-1/5" @click="findAndAddLocation">
            <IconEnter />
        </button>
    </form>
</template>