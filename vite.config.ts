import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
   server: {
       proxy: {
           '/api': {
               target: 'http://localhost:4000', // Backend server URL
               changeOrigin: true, // Changes the origin of the host header to the target URL
               rewrite: (path) => path.replace(/^\/api/, ''), // Removes '/api' prefix before forwarding
           },
       },
   },
});