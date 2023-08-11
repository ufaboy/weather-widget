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
}
function dropHandler() {
    console.log('dropHandler');
    draggedItemIndex.value = null
    saveLocationsFromStorage(locations.value)
}

</script>
<template>
    <div class="settings-page">
        <div class="flex-row-nowrap justify-between mb-4">
            <h4>Settings</h4>
            <button class="btn-icon control-btn" @click="emit('change-page', 'list')">
                <IconCross class="icon" />
            </button>
        </div>
        <ol class="no-bullets">
            <li v-for="(loc, index) in locations" class="draggable-li mb-3" :draggable="draggedItemIndex === index"
                @dragstart="dragStartHandler(index)" @dragover="dragoverHandler(index)" @drop="dropHandler"
                @dragend="dropHandler">
                <LocationItem @delete="deleteLocation(index)" @start-drag="draggedItemIndex = index">
                    {{ loc.city }}, {{ loc.country }}
                </LocationItem>
            </li>
        </ol>
        <form @submit.prevent="findAndAddLocation" class="flex-row-wrap">
            <label class="w-full">Add location</label>
            <input type="search" class="search mr-2 px-4 py-2" placeholder="New York" v-model="searchString">
            <button type="button" class="btn-icon" @click="findAndAddLocation">
                <IconEnter class="icon" />
            </button>
        </form>
    </div>
</template>