'use strict';

const moment = require('moment');
const typescript = require('@rollup/plugin-typescript');
const pkg = require('./package.json');

const output = {
  sourcemap: true,
  banner: `/* ${pkg.name} v${pkg.version}, Copyright (c) ${moment.utc().year()} ${pkg.author}, License: ${pkg.license} */`,
};

module.exports = [
  {
    input: './src/main.ts',
    output: [
      {
        ...output,
        name: 'shevchenko',
        file: pkg.browser,
        format: 'umd',
      },
      {
        ...output,
        file: pkg.main,
        format: 'cjs',
      }
    ],
    plugins: [
      typescript({ tsconfig: './tsconfig.legacy.json' }),
    ],
  },
  {
    input: './src/main.ts',
    output: {
      ...output,
      file: pkg.module,
      format: 'es',
    },
    plugins: [
      typescript({ tsconfig: './tsconfig.module.json' }),
    ],
  }
]
