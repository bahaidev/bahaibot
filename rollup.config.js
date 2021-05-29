import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import {terser} from 'rollup-plugin-terser';
// import babel from '@rollup/plugin-babel';
// import packageJson from './package.json';

/**
 * @external RollupConfig
 * @type {PlainObject}
 * @see {@link https://rollupjs.org/guide/en#big-list-of-options}
 */

/**
 * @param {PlainObject} [config={}]
 * @param {boolean} [config.minifying=false]
 * @param {string} [config.format="umd"]
 * @param {boolean} [config.lite=false]
 * @returns {external:RollupConfig}
 */
function getRollupObject ({
  minifying = false, format = 'umd', lite = false
} = {}) {
  const nonMinified = {
    input: './src/integratedClientServerBot.js',
    output: {
      format,
      sourcemap: minifying,
      file: [
        'dist/integratedClientServerBot',
        lite ? '.lite' : '',
        format === 'umd' ? '' : `.${format}`,
        minifying ? '.min' : '',
        '.js'
      ].join('')
    },
    plugins: [
      nodeResolve(),
      commonjs()
      /*
      babel({
        babelHelpers: 'bundled'
      })
      */
    ]
  };
  /*
  if (lite) {
    nonMinified.external = Object.keys(packageJson.dependencies);
  }
  */
  if (minifying) {
    nonMinified.plugins.push(terser());
  }
  return nonMinified;
}

export default [
  getRollupObject({minifying: true, format: 'esm'}),
  getRollupObject({minifying: false, format: 'esm'})
];
