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
      output: 'build/popper-vue.css'
    }),
    production && terser()
  ]
}

/**
 * Configurations
 */
export default [
  {
    input: 'src/lib/index.js',
    output: [
      {
        banner,
        name,
        dir: `build/esm/`,
        format: 'esm',
        exports: 'named',
        globals
      }
    ],
    ...commons
  },
  {
    input: 'src/lib/index.js',
    output: [
      {
        banner,
        name,
        dir: `build/es/`,
        format: 'es',
        exports: 'named',
        globals
      }
    ],
    ...commons
  },
  {
    input: 'src/lib/index.js',
    output: [
      {
        banner,
        name,
        dir: `build/umd/`,
        format: 'umd',
        exports: 'named',
        globals
      }
    ],
    ...commons
  },
  {
    input: 'src/lib/index.js',
    output: [
      {
        banner,
        name,
        dir: `build/cjs/`,
        format: 'cjs',
        exports: 'named',
        globals
      }
    ],
    ...commons
  }
]
