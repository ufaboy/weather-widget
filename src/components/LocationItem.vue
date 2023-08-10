<script setup lang="ts">
import IconTrash from './IconTrash.vue'

const emit = defineEmits<{
  (e: 'delete'): void
  (e: 'start-drag'): void
  (e: 'stop-drag'): void
}>()

</script>

<template>
  <div class="flex flex-row justify-between items-center bg-gray-300 rounded px-3 py-1">
    <div class="cursor-pointer" @mousedown="$emit('start-drag')" @mouseup="$emit('stop-drag')">
      <div class="w-4 border-b border-black mb-1 "></div>
      <div class="w-4 border-b border-black mb-1"></div>
      <div class="w-4 border-b border-black "></div>
    </div>
    <div>
      <slot></slot>
    </div>
    <button @click="$emit('delete')">
      <IconTrash class="w-4 h-4" />
    </button>
  </div>
</template>