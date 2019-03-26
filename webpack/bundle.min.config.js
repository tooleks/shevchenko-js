import webpackMerge from 'webpack-merge';
import umdConfig from './umd.config';
import pkg from '../package.json';

export default webpackMerge.strategy({ externals: 'replace' })(umdConfig, {
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
