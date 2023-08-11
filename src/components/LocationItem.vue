<script setup lang="ts">
import IconTrash from './IconTrash.vue'

const emit = defineEmits<{
  (e: 'delete'): void
  (e: 'start-drag'): void
  (e: 'stop-drag'): void
}>()

</script>

<template>
  <div class="location-item flex-row-wrap justify-between bg-gray-300 rounded px-3 py-1">
    <div class="cursor-pointer" @mousedown="$emit('start-drag')" @mouseup="$emit('stop-drag')">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <div>
      <slot></slot>
    </div>
    <button class="btn-icon btn-trash" @click="$emit('delete')">
      <IconTrash class="icon" />
    </button>
  </div>
</template>