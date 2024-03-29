import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import svgLoader from 'vite-svg-loader'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    svgLoader(),
    AutoImport({
      imports: [
        'vue', 'vue-router', '@vueuse/head', 'pinia',
      ],
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      dirs: ['src/components', 'src/views'],
      // valid file extensions for components.
      extensions: ['vue'],
      // search for subdirectories
      deep: true,
      resolvers: [ElementPlusResolver({
        importStyle: 'css',
      })],
    }),
    Unocss({
      presets: [
        presetAttributify({ /* preset options */}),
        presetUno(),
        // ...custom presets
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
      },
    },
  },
  server: {
    open: true,
    proxy: {
      '/django': {
        target: 'http://localhost:8000/api/v1',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/django/, ''),
      },
    },
  },
})
