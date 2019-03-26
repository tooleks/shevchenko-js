'use strict';

class Mailer {
  /**
   * @param {MailgunMailerDriver} driver
   */
  constructor(driver) {
    this._driver = driver;
    this.send = this.send.bind(this);
  }

  /**
   * Send mail message.
   *
   * @param {object} data
   * @returns {Promise}
   */
  send(data) {
    return this._driver.send(data);
  }
}

module.exports = Mailer;
