import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  server: {
    allowedHosts: ['all'], // O especifica el dominio de TryCloudflare
  },
});