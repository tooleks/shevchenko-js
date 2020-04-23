'use strict';

const i18n = require('i18n');
const ShareLinksProvider = require('./ShareLinksProvider');
const UrlBuilder = require('./UrlBuilder');

class ServiceFactory {
  /**
   * @param {Object} parameters
   * @param {string} parameters.baseUrl
   * @param {string} parameters.locale
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
   * @returns {Function}
   */
  makeTranslate() {
    return (phrase) => {
      i18n.setLocale(this.parameters.locale);
      return i18n.__(phrase);
    };
  }
}

module.exports = ServiceFactory;
