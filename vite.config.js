import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue', 'vue-router', '@vueuse/head',
      ],
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      dirs: ['src/components'],
      // valid file extensions for components.
      extensions: ['vue'],
      // search for subdirectories
      deep: true,
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    open: true,
  },
})
