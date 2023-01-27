import { createApp } from 'vue'
import { Icon } from '@iconify/vue'
import * as Icons from '@element-plus/icons-vue'
import App from './App.vue'
import { pinia } from '@/store'
import { router } from '@/router'
import request from '@/utils/request'
import '@/style/transition.css'
import '@/style/theme.css'
import '@/style/index.css'
import 'uno.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import 'nprogress/nprogress.css' // 这个nprogress样式必须引入

const app = createApp(App)
app.component('Icon', Icon)
app.use(router).use(pinia)
app.config.globalProperties.$request = request
app.mount('#app')
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key])
})

