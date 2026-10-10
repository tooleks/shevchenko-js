// eslint-disable-next-line @typescript-eslint/no-var-requires
const { spawnSync } = require('node:child_process');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('node:path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../package.json');

describe('TensorFlow runtime dependencies', () => {
  it('does not require the TensorFlow CLI umbrella package', () => {
    expect(pkg.dependencies['@tensorflow/tfjs']).toBeUndefined();
  });

  it('runs CPU inference without loading the umbrella package', () => {
    const result = spawnSync(
      process.execPath,
      [
        '-e',
        `
      const Module = require('module');
      const load = Module._load;
      Module._load = function(name, ...args) {
        if (name === '@tensorflow/tfjs') throw new Error('Unexpected TensorFlow umbrella import');
        return load.call(this, name, ...args);
      };
      const tf = require('@tensorflow/tfjs-core');
      const shevchenko = require('./dist/cjs');
      (async () => {
        await tf.setBackend('cpu');
        const result = await shevchenko.inGenitive({ familyName: 'Тестова', gender: 'feminine' });
        if (result.familyName !== 'Тестової') throw new Error(JSON.stringify(result));
      })().catch(error => { console.error(error); process.exitCode = 1; });
    `,
      ],
      { cwd: path.resolve(__dirname, '..'), encoding: 'utf8', timeout: 30000 },
    );
    expect(result.error).toBeUndefined();
    expect(result.status).toBe(0);
  });
});
