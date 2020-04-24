'use strict';

const path = require('path');

const PATTERN_SLASH = /^\/+|\/+$/g;

class UrlBuilder {
  /**
   * @param {string} baseUrl
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * @param {string} outFile
   * @returns {string}
   */
  buildUrl(outFile) {
    const parsedPath = path.parse(outFile);
    return this.baseUrl.replace(PATTERN_SLASH, '') + '/' + parsedPath.base.replace(PATTERN_SLASH, '');
  }
}

module.exports = UrlBuilder;
