import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001', // forward /api requests to Express in development
    },
  },
});
