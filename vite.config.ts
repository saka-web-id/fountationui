import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import inject from '@rollup/plugin-inject';

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
      vue(),
      inject({
          $: 'jquery',
          jQuery: 'jquery',
      })
  ]
})
