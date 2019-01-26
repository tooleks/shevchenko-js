import Mailgun from 'mailgun-js';

export default class MailgunMailerDriver {
  /**
   * MailgunMailerDriver constructor.
   *
   * @param {object} options
   * @param {string} options.apiKey
   * @param {string} options.domain
   */
  constructor({apiKey = process.env.MAILGUN_API_KEY, domain = process.env.MAILGUN_DOMAIN} = {}) {
    this._mailgun = new Mailgun({apiKey, domain});
    this.send = this.send.bind(this);
  }

  /**
   * Send mail message.
   *
   * @param {object} data
   * @return {Promise}
   */
  async send(data) {
    return new Promise((resolve, reject) => {
      this._mailgun.messages().send(data, (error, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });
  }
}
