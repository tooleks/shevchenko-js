import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const banner = `/* ${pkg.name} v${pkg.version}, Copyright (c) ${new Date().getFullYear()} ${pkg.author}, License: ${pkg.license} */`;

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
