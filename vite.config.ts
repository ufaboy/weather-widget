import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ce.ts'),
      name: 'weather-widget',
      fileName: 'weather-widget'
    }
  },
  define: {
    'process.env': process.env
  }
})
