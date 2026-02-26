import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import inject from '@rollup/plugin-inject';
import VueDevTools from 'vite-plugin-vue-devtools';
import path from 'path'
import fs from 'node:fs'

const useHttps = process.env.VITE_USE_HTTPS === 'true';

export default defineConfig({
    base: "/",
    server: {
        host: '0.0.0.0',
        port: useHttps ? 443 : 80,
        ...(useHttps && {
            https: {
                key: fs.readFileSync('./certs/privkey.pem'),
                cert: fs.readFileSync('./certs/fullchain.pem'),
            },
        }),
        proxy: {
            '/api': {
                target: 'http://192.168.1.51:8080', // backend
                changeOrigin: true,
                secure: false,
            },
            '/oauth2': {
                target: 'http://192.168.1.51:8080',
                changeOrigin: true,
                secure: false,
            },
            '/login': {
                target: 'http://192.168.1.51:8080',
                changeOrigin: true,
                secure: false,
            },
        },
    },
    plugins: [
        vue(),
        VueDevTools(),
        inject({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './src')
        }
    }
})