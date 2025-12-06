import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import inject from '@rollup/plugin-inject';
import VueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  base: "/",
    server: {
        host: 'www.myproject.local',
        port: 5173
    },
  plugins: [
      vue(),
      VueDevTools(),
      inject({
          $: 'jquery',
          jQuery: 'jquery',
      })
  ],

})
