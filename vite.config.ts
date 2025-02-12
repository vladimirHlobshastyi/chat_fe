import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@ui': path.resolve(__dirname, 'src/ui'),
      '@forms': path.resolve(__dirname, 'src/forms'),
      '@features': path.resolve(__dirname, 'src/features'),
    },
  },
});
