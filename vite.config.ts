import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // Ensure dynamic imports are handled correctly
      },
    },
  },
  resolve: {
    alias: {
      '@emotion/react': '@emotion/react',
    },
  },
});