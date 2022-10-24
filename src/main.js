import { createApp } from 'vue'
import './style.css'
import { Icon } from '@iconify/vue'
import App from './App.vue'

const app = createApp(App)
app.component('Icon', Icon)
app.mount('#app')
