import { createPinia } from 'pinia'
import PiniaRouter from 'pinia-plugin-router'
import { router } from '../router'

const pinia = createPinia()
pinia.use(PiniaRouter(router))
export { pinia }
