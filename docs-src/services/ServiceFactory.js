'use strict';

const i18n = require('i18n');
const ShareLinksProvider = require('./ShareLinksProvider');
const UrlBuilder = require('./UrlBuilder');

class ServiceFactory {
  /**
   * @param {Object} parameters
   * @param {string} parameters.baseUrl
   * @param {Array} parameters.languages
   */
  constructor(parameters) {
    this.parameters = parameters;
  }

  /**
   * @returns {ShareLinksProvider}
   */
  makeShareLinksProvider() {
    return new ShareLinksProvider();
  }

  /**
   * @returns {UrlBuilder}
   */
  makeUrlBuilder() {
    return new UrlBuilder(this.parameters.baseUrl);
  }

  /**
   * @param {string} locale
   * @returns {Function}
   */
  makeTranslate(locale) {
    return (phrase) => {
      i18n.setLocale(locale);
      return i18n.__(phrase);
    };
  }

  /**
   * @param {Object} language
   * @param {string} language.outFile
   * @param {string} language.locale
   * @returns {Object}
   */
  makeTemplateParameters({ outFile, locale }) {
    const shareLinksProvider = this.makeShareLinksProvider();
    const urlBuilder = this.makeUrlBuilder();
    const translate = this.makeTranslate(locale);
    return {
      __: translate,
      currentLocale: locale,
      currentUrl: urlBuilder.buildUrl(outFile),
      facebookShareUrl: shareLinksProvider.facebook(urlBuilder.buildUrl(outFile)),
      twitterShareUrl: shareLinksProvider.twitter(urlBuilder.buildUrl(outFile)),
      linkedInShareUrl: shareLinksProvider.linkedIn(urlBuilder.buildUrl(outFile), translate('appDescription')),
      languages: this.parameters.languages.map(({ outFile, locale }) => {
        return {
          url: urlBuilder.buildUrl(outFile),
          name: translate({ phrase: `${locale}Language`, locale }),
        };
      }),
    };
  }
}

module.exports = ServiceFactory;
