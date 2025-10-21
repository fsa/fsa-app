import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin';
import { resolve } from 'node:path';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    nitroV2Plugin(),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  envPrefix: "FSA_",
});
