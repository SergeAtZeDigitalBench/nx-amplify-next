/// <reference types='vitest' />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vitest/ui',

  plugins: [react(), nxViteTsPaths()],

  test: {
    root: __dirname,
    globals: true,
    // for testing the js utils library environment will be `'node'`
    // for testing jsx library environment will be `'jsdom'`
    environment: 'jsdom',
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'specs/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    deps: {},
    setupFiles: ['./test-setup.ts'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/libs/ui',
      provider: 'v8',
    },
  },
});
