import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    minify:false,
    rollupOptions: {
      output: {
        manualChunks: undefined, // Ensure dynamic imports are handled correctly
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  resolve: {
    alias: {
      '@emotion/react': '@emotion/react',
      '@emotion/styled': '@emotion/styled',
    },
  },
 
});