import { defineConfig } from 'vite';
import config from './vite.config.mjs';

export default defineConfig({
  ...config,
  build: {
    ...config.build,
    rollupOptions: {
      ...config.build.rollupOptions,
      input: 'index.html'
    }
  }
});
