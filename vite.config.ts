import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@context': path.resolve(__dirname, './src/context'),
      '@app': path.resolve(__dirname, './src/app'),
      '@styles': path.resolve(__dirname, './src/styles'),
      // Agrega más alias según sea necesario
    },
  },
});              