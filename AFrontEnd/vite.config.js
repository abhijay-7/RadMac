import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    host : '0.0.0.0',
    port : 5000,
    proxy: {
      '/api': "http://10.0.13.249:3001",
      '/LiveSongMeta': "http://10.0.13.249:3001",
      '/hi': {
        target: 'http://10.0.13.249:3001', // Replace with your backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hi/, ''),
      },
    }
  },
  plugins: [react()],
})
