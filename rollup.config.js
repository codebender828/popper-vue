import resolve from 'rollup-plugin-node-resolve'
import cjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import scss from 'rollup-plugin-scss'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const name = 'PopperVue'
const banner = `/*!
* ${pkg.name} v${pkg.version}
* (c) ${new Date().getFullYear()} Jonathan Bakebwa Mugaju
* @license MIT
*/`

const production = !process.env.ROLLUP_WATCH

// Externals
const externals = [
  ...Object.keys(pkg.peerDependencies || {})
]

// Globals
const globals = {
  'vue': 'Vue',
  'animejs': 'anime'
}

const commons = {
  external: externals,
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    cjs({
      include: /node_modules/
    }),
    scss({
      output: 'dist/popper-vue.css'
    }),
    production && terser()
  ]
}

/**
 * Configurations
 */
export default [
  {
    input: 'src/index.js',
    output: [
      {
        banner,
        name,
        dir: `dist/esm/`,
        format: 'esm',
        exports: 'named',
        globals
      }
    ],
    ...commons
  },
  {
    input: 'src/index.js',
    output: [
      {
        banner,
        name,
        dir: `dist/umd/`,
        format: 'umd',
        exports: 'named',
        globals
      }
    ],
    ...commons
  },
  {
    input: 'src/index.js',
    output: [
      {
        banner,
        name,
        dir: `dist/cjs/`,
        format: 'cjs',
        exports: 'named',
        globals
      }
    ],
    ...commons
  }
]
