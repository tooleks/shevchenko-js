'use strict';

const servicesFactory = require('../../services/factory');
const ErrorHandler = require('./ErrorHandler');
const RedirectToHome = require('./RedirectToHome');
const Utils = require('./Utils');

/** @returns {function} */
function errorHandlerFactory() {
  return new ErrorHandler(servicesFactory.urlService()).handle;
}

/** @returns {function} */
function redirectToHomeFactory() {
  return new RedirectToHome(servicesFactory.urlService()).handle;
}

/** @returns {function} */
function utilsFactory() {
  return new Utils(servicesFactory.urlService(), servicesFactory.shareLinksProvider()).handle;
}

module.exports = {
  errorHandler: errorHandlerFactory,
  redirectToHome: redirectToHomeFactory,
  utils: utilsFactory,
};
