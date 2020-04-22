const serviceFactory = require('../../services/factory');
const configureRequest = require('./configureRequest');
const errorHandler = require('./errorHandler');
const redirectToHome = require('./redirectToHome');

module.exports = {
  configureRequest() {
  return configureRequest(serviceFactory.urlService(), serviceFactory.shareLinksProvider());
},
  errorHandler() {
    return errorHandler(serviceFactory.urlService(), serviceFactory.logger());
  },
  redirectToHome() {
    return redirectToHome(serviceFactory.urlService());
  }
};
