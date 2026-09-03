import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': 'http://localhost:4001',
      '/media': 'http://localhost:4001',
      '/admin': {
        target: 'http://localhost:5175',
        changeOrigin: true,
        ws: true,
        // the admin app's Vite dev server is mounted at base "/admin/" (with
        // a trailing slash) — normalize the bare "/admin" request so it
        // doesn't 404 through the proxy
        rewrite: (path) => (path === '/admin' ? '/admin/' : path),
      },
    },
  },
})
