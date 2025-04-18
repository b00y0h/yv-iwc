import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import url from '@rollup/plugin-url'
import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const pkg = require('./package.json')

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    postcss({
      modules: true,
      extract: false,
    }),
    url({ exclude: ['**/*.svg'] }),
    typescript(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    nodeResolve(),
    commonjs(),
    json(),
  ],
}
