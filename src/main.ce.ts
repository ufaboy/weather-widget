import { defineCustomElement } from 'vue'

// vue SFC
import AppSFC from './App.vue'

// turn component into web components
export const App = defineCustomElement(AppSFC)
customElements.define('weather-widget', App)

// register global typings
declare module 'vue' {
  export interface GlobalComponents {
    'App': typeof App,
  }
}