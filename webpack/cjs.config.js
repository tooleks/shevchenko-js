import path from 'path';
import webpackMerge from 'webpack-merge';
import commonConfig from './common.config';
import pkg from '../package.json';

export default webpackMerge(commonConfig, {
  entry: path.resolve(__dirname, path.join('..', 'src', 'api.js')),
  output: {
    path: path.resolve(__dirname, path.join('..', 'dist')),
    filename: `${pkg.name}.cjs.js`,
    library: pkg.name,
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
  },
});
