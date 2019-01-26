import webpackMerge from 'webpack-merge';
import shevchenkoUmdConfig from './shevchenko.umd.config';
import pkg from '../package.json';

export default webpackMerge.strategy({externals: 'replace'})(shevchenkoUmdConfig, {
  output: {
    filename: `${pkg.name}.bundle.min.js`,
  },
  externals: {
    // Pack all external dependencies into the bundle.
  },
  optimization: {
    minimize: true,
  },
});
