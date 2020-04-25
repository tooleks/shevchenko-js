import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const banner = `/**
 * @file ${pkg.description}
 * @module ${pkg.name}@${pkg.version}
 * @author ${pkg.author}
 * @license ${pkg.license}
 * @copyright ${new Date().getFullYear()} ${pkg.author}
 * @see {@link ${pkg.repository.url}}
*/`;

export default [
  {
    input: './src/shevchenko.ts',
    output: {
      name: pkg.name,
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
      banner: banner,
    },
    plugins: [
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
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      banner: banner,
    },
    plugins: [
      json(),
      typescript({ tsconfig: './tsconfig.legacy.json' }),
    ],
    external: Object.getOwnPropertyNames(pkg.dependencies),
  },
  {
    input: './src/shevchenko.ts',
    output: {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      banner: banner,
    },
    plugins: [
      json(),
      typescript({ tsconfig: './tsconfig.module.json' }),
    ],
    external: Object.getOwnPropertyNames(pkg.dependencies),
  }
];
