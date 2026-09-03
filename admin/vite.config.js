import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/admin/',
  plugins: [react(), tailwindcss()],
  server: {
    port: 5175,
    strictPort: true,
    // allow requests that arrive proxied through the main site's dev
    // server at http://localhost:5173/admin
    origin: 'http://localhost:5175',
    proxy: {
      '/api': 'http://localhost:4001',
      '/media': 'http://localhost:4001',
    },
  },
})
