import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue', 'vue-router', '@vueuse/head', 'pinia',
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
    Unocss({ /* options */ }),
  ],
  server: {
    open: true,
  },
})
