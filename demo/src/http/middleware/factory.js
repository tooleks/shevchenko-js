const serviceFactory = require('../../services/factory');
const addLocals = require('./addLocals');
const errorHandler = require('./errorHandler');
const redirectToHome = require('./redirectToHome');

module.exports = {
  addLocals() {
  return addLocals(serviceFactory.urlService(), serviceFactory.shareLinksProvider());
},
  errorHandler() {
    return errorHandler(serviceFactory.urlService(), serviceFactory.logger());
  },
  redirectToHome() {
    return redirectToHome(serviceFactory.urlService());
  }
};
