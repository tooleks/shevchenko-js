'use strict';

const MailgunMailerDriver = require('./MailgunMailerDriver');
const Mailer = require('./Mailer');
const ShareLinksProvider = require('./ShareLinksProvider');
const UrlService = require('./UrlService');

/** @returns {MailgunMailerDriver} */
function mailgunMailDriverFactory() {
  return new MailgunMailerDriver();
}

/** @returns {Mailer} */
function mailerFactory() {
  return new Mailer(mailgunMailDriverFactory());
}

/** @returns {ShareLinksProvider} */
function shareLinksProviderFactory() {
  return new ShareLinksProvider();
}

/** @returns {UrlService} */
function urlServiceFactory() {
  return new UrlService();
}

module.exports = {
  mailgunMailDriver: mailgunMailDriverFactory,
  mailer: mailerFactory,
  shareLinksProvider: shareLinksProviderFactory,
  urlService: urlServiceFactory,
};
