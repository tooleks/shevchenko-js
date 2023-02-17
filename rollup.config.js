import { dirname, resolve as resolvePath } from 'path';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const banner = `
/**
 * @file ${pkg.description}
 * @module ${pkg.name}
 * @version ${pkg.version}
 * @author ${pkg.author}
 * @license ${pkg.license}
 * @copyright 2017-${new Date().getFullYear()} ${pkg.author}
 * @see {@link ${pkg.repository.url}}
 */
`;

export default [
  {
    input: './src/shevchenko.ts',
    output: {
      name: pkg.name,
      file: pkg.browser,
      format: 'umd',
      banner: banner.trim(),
      sourcemap: true,
    },
    plugins: [
      alias({
        entries: [
          {
            find: /@tensorflow\/tfjs$/,
            replacement: resolvePath(__dirname, './vendor/tfjs/custom_tfjs.js'),
          },
          {
            find: /@tensorflow\/tfjs-core$/,
            replacement: resolvePath(__dirname, './vendor/tfjs/custom_tfjs_core.js'),
          },
        ],
      }),
      json(),
      typescript({ tsconfig: './tsconfig.legacy.json' }),
      resolve(),
      commonjs(),
      terser(),
    ],
  },
  {
    input: './src/shevchenko.ts',
    output: {
      dir: dirname(pkg.main),
      format: 'cjs',
      banner: banner.trim(),
      sourcemap: true,
      preserveModules: true,
    },
    plugins: [json(), typescript({ tsconfig: './tsconfig.module.json' })],
    external: Object.getOwnPropertyNames(pkg.dependencies),
  },
  {
    input: './src/shevchenko.ts',
    output: {
      dir: dirname(pkg.module),
      format: 'es',
      banner: banner.trim(),
      sourcemap: true,
      preserveModules: true,
    },
    plugins: [json(), typescript({ tsconfig: './tsconfig.module.json' })],
    external: Object.getOwnPropertyNames(pkg.dependencies),
  },
];
