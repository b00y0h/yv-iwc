import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  external: ['react', 'react-dom'],
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  // Use CSS injection with local style-inject to avoid module resolution issues
  injectStyle: (css) => `
    (function() {
      if (typeof document !== 'undefined') {
        const style = document.createElement('style');
        style.textContent = ${JSON.stringify(css)};
        document.head.appendChild(style);
      }
    })();
  `,
  // Skip type checking for external modules
  skipNodeModulesBundle: true,
  // Ensure CSS files are included in the build
  loader: {
    '.css': 'css',
  },
  onSuccess: async () => {
    console.log('Build completed successfully')
  },
})
