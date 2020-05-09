'use strict';

const path = require('path');
const config = require('./config');

const LEADING_SLASHES = /^\/+/g;
const TRAILING_SLASHES = /\/+$/g;

/**
 * Returns a URL for a given file.
 *
 * @param {string} outFile
 * @returns {string}
 */
exports.build = (outFile) => {
  const parsedPath = path.parse(outFile);
  const domain = config.app.url.replace(TRAILING_SLASHES, '');
  const pathname = parsedPath.base.replace(LEADING_SLASHES, '');
  return domain + '/' + pathname;
};
