import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, '../'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});