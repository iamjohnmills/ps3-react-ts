import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // chokidarWatchOptions: {
  //   usePolling: true
  // },
  server: {
    port: 3000,
    host: true,
    hmr: {
      port: 3001,
      clientPort: 5001,
    },
  },
})
