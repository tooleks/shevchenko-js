'use strict';

const path = require('path');
const i18n = require('i18n');
const config = require('./config');
const url = require('./url');

i18n.configure({
  locales: Object.keys(config.app.languages),
  directory: path.join(__dirname, 'locales'),
  syncFiles: true,
});

/**
 * Returns a translation function for a given locale.
 *
 * @param {string} locale
 * @returns {Function}
 */
exports.make = (locale) => {
  return (phrase) => {
    i18n.setLocale(locale);
    return i18n.__(phrase);
  };
};

/**
 * Returns an array of available languages.
 *
 * @returns {Array<Object>}
 */
exports.all = () => {
  return Object.entries(config.app.languages).map(([locale, file]) => {
    return {
      name: this.make(locale)(locale),
      url: url.build(file),
    };
  });
};
