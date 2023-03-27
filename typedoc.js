// eslint-disable-next-line @typescript-eslint/no-var-requires
const library = require('./package.json');

/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  entryPoints: ['./src/index.ts'],
  out: './docs/api-spec',
  tsconfig: './tsconfig.module.json',
  compilerOptions: {
    skipLibCheck: true,
  },
  excludeExternals: true,
  externalPattern: ['**/node_modules/**'],
  name: `${library.name}.js`,
  includeVersion: true,
  gaID: 'G-RZ36XWPBER',
  sidebarLinks: {
    ['Try it out']: 'https://shevchenko-js.tooleks.com/en-US',
    ['API Specification']: 'https://shevchenko-js.tooleks.com/api-spec',
    ['Source Code']: 'https://github.com/tooleks/shevchenko-js',
    ['License']: 'https://github.com/tooleks/shevchenko-js/blob/main/LICENSE',
    ['Migration Guide']: 'https://github.com/tooleks/shevchenko-js/wiki/Migration-Guide',
  },
};
