import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, 'node_modules/react')
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
