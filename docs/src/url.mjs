import path from 'path';
import config from './config.mjs';

const LEADING_SLASHES = /^\/+/g;
const TRAILING_SLASHES = /\/+$/g;

/**
 * Returns a URL for the given file.
 *
 * @param {string} languageFile
 * @returns {string}
 */
export function buildUrl(languageFile) {
  const parsedPath = path.parse(languageFile);
  const domain = config.app.url.replace(TRAILING_SLASHES, '');
  const pathname = parsedPath.base.replace(LEADING_SLASHES, '');
  return domain + '/' + pathname;
}
