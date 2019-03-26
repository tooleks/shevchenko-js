'use strict';

const os = require('os');
const path = require('path');

/**
 * The fully qualified path to the project root directory.
 *
 * @type {string}
 */
const basePath = path.resolve(__dirname);

/**
 * The fully qualified path to the project locales directory.
 *
 * @type {string}
 */
const localesPath = path.join(basePath, 'locales');

module.exports = { basePath, localesPath };
