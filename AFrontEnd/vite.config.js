import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    host : '0.0.0.0',
    port : 5000,
    proxy: {
      '/api': "http://10.0.3.63:8080"
    }
  },
  plugins: [react()],
})
