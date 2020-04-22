const MailgunMailer = require('./MailgunMailer');
const ShareLinksProvider = require('./ShareLinksProvider');
const UrlService = require('./UrlService');
const WinstonLogger = require('./WinstonLogger');

module.exports = {
  mailer() {
    return new MailgunMailer();
  },
  shareLinksProvider() {
    return new ShareLinksProvider();
  },
  urlService() {
    return new UrlService();
  },
  logger() {
    return new WinstonLogger();
  },
};
