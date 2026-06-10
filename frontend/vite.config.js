import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/public': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/journal': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/user': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/admin': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/dbinfo': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/test': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
