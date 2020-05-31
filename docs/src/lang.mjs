import path from 'path';
import i18n from 'i18n';
import config from './config.mjs';
import { buildUrl } from './url.mjs';

i18n.configure({
  locales: config.app.languages.map(language => language.locale),
  directory: path.join(config.app.localeDir),
  syncFiles: true,
});

/**
 * Returns a translation function for a given locale.
 *
 * @param {string} locale
 * @returns {Function}
 */
export function makeTranslator(locale) {
  return (phrase) => {
    i18n.setLocale(locale);
    return i18n.__(phrase);
  };
}

/**
 * Returns an array of available languages.
 *
 * @returns {Array<Object>}
 */
export function getLanguages() {
  return config.app.languages.map((language) => {
    const translate = makeTranslator(language.locale);
    return {
      name: translate(language.locale),
      locale: language.locale,
      url: buildUrl(language.file),
    };
  });
}
