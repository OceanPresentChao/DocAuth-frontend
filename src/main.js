import { createApp } from 'vue'
import { Icon } from '@iconify/vue'
import App from './App.vue'
import { pinia } from '@/store'
import { router } from '@/router'
import request from '@/utils/request'
import '@/style/transition.css'
import '@/style/theme.css'
import '@/style/index.css'
import 'uno.css'
// import * as ElIcons from "@element-plus/icons-vue";
// for (const iconName in ElIcons) {
//     vue.component(iconName, ElIcons[iconName]);
// }

const app = createApp(App)
app.component('Icon', Icon)
app.use(router).use(pinia)
app.config.globalProperties.$request = request
app.mount('#app')
