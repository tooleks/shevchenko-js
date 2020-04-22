const Mailgun = require('mailgun-js');

class MailgunMailer {
  /**
   * @param {Object} [options]
   * @param {string} [options.apiKey]
   * @param {string} [options.domain]
   */
  constructor({ apiKey = process.env.MAILGUN_API_KEY, domain = process.env.MAILGUN_DOMAIN } = {}) {
    this.mailgunClient = new Mailgun({ apiKey, domain });
  }

  /**
   * Send mail message.
   *
   * @param {Object} data
   * @returns {Promise}
   */
  async send(data) {
    return new Promise((resolve, reject) => {
      this.mailgunClient.messages().send(data, (error, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });
  }
}

module.exports = MailgunMailer;
