import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  external: ['react', 'react-dom'],
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  // Extract CSS to separate file instead of injecting
  injectStyle: false,
  // Skip type checking for external modules
  skipNodeModulesBundle: true,
  // Ensure CSS files are included in the build
  loader: {
    '.css': 'css',
  },
  onSuccess: async () => {
    console.log('Build completed successfully')
    // Touch a file in the Next.js app to trigger hot reload
    try {
      const fs = await import('fs')
      const path = await import('path')
      const triggerFile = path.join(
        process.cwd(),
        'examples/nextjs/trigger-reload.js'
      )
      fs.writeFileSync(
        triggerFile,
        `// Auto-generated trigger file - ${Date.now()}\nexport const timestamp = ${Date.now()}`
      )
    } catch (error) {
      // Ignore errors if the examples directory doesn't exist
    }
  },
})
