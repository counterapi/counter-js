import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const external = ['axios'];

const plugins = [
  resolve({
    preferBuiltins: true,
    browser: false
  }),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
    declaration: true,
    declarationDir: './dist/types'
  })
];

const browserPlugins = [
  resolve({
    preferBuiltins: false,
    browser: true
  }),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json'
  })
];

export default [
  // Node.js/ES Module build
  {
    input: 'src/index.ts',
    external,
    output: {
      file: 'dist/counterapi.esm.js',
      format: 'es',
      sourcemap: true
    },
    plugins
  },
  
  // CommonJS build  
  {
    input: 'src/index.ts',
    external,
    output: {
      file: 'dist/counterapi.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    plugins
  },
  
  // Browser build (unminified, with axios bundled)
  {
    input: 'src/browser.ts',
    output: {
      file: 'dist/counterapi.browser.js',
      format: 'umd',
      name: 'Counter',
      sourcemap: true,
      exports: 'named',
      globals: {
        'counterapi.js': 'Counter'
      }
    },
    plugins: browserPlugins
  },

  // Browser build (minified, with axios bundled)
  {
    input: 'src/browser.ts',
    output: {
      file: 'dist/counterapi.browser.min.js',
      format: 'umd',
      name: 'Counter',
      sourcemap: true,
      exports: 'named',
      globals: {
        'counterapi.js': 'Counter'
      }
    },
    plugins: [
      ...browserPlugins,
      terser({
        compress: {
          drop_console: true
        },
        mangle: true
      })
    ]
  }
]; 