// vite.config.js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // for the @import alias to work as it did with Vue cli
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    preview: {
      port: 8080,
    },
    server: {
      port: 8080,
    }
  },
})
