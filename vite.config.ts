import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite({
      routeFileIgnorePrefix: '~',
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@api', replacement: path.resolve(__dirname, 'src/api') },
      {
        find: '@queries',
        replacement: path.resolve(__dirname, 'src/api/queries'),
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@layouts', replacement: path.resolve(__dirname, 'src/layouts') },
      { find: '@types', replacement: path.resolve(__dirname, 'src/types') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: '@routes', replacement: path.resolve(__dirname, 'src/routes') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      {
        find: '@features',
        replacement: path.resolve(__dirname, 'src/features'),
      },
      {
        find: '@providers',
        replacement: path.resolve(__dirname, 'src/providers'),
      },
    ],
  },
});
