import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'yvIWC',
      fileName: (format: unknown) => `index.${format}.js`,
    },
    cssCodeSplit: true,
  },
  optimizeDeps: {
    include: ['@ux_bob/yv-iwc'],
  },

  server: {
    fs: {
      allow: ['..'], // allow serving files from one directory up (the monorepo root)
    },
  },
})
