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
  includeVersion: true,
  theme: 'stacks',
};
