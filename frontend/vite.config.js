import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { getSettings } from './settings';

const Settings = getSettings();

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `http://${Settings.API_HOST}:${Settings.API_PORT}/`,
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, '')
      }
    },
    watch: {
        usePolling: true,
    }
  }
});