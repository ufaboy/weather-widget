import { defineCustomElement } from 'vue';
import AppSFC from './App.ce.vue';

export const App = defineCustomElement(AppSFC);

customElements.define('weather-widget', App);

declare module 'vue' {
  export interface GlobalComponents {
    App: typeof App;
  }
}