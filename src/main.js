import { createApp } from 'vue'
import { Icon } from '@iconify/vue'
import App from './App.vue'
import { store } from '@/store'
import { router } from '@/router'
import '@/style/transition.css'
import '@/style/theme.css'
import '@/style/index.css'
import 'uno.css'

const app = createApp(App)
app.component('Icon', Icon)
app.use(router).use(store)
app.mount('#app')
