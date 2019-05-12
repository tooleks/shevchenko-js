"use strict";

class ContactMeController {
  /**
   * @param {Mailer} mailer
   * @param {UrlService} urlService
   */
  constructor(mailer, urlService) {
    this._mailer = mailer;
    this._urlService = urlService;
    this.send = this.send.bind(this);
  }

  /**
   * Send contact me message.
   *
   * @param req
   * @param res
   * @param next
   */
  async send(req, res, next) {
    const from = `${req.body.name} <${req.body.email}>`;
    const to = process.env.APP_EMAIL;
    const subject = `${process.env.APP_NAME} - ${req.__("contact_me")}`;
    const text = req.body.message;

    try {
      await this._mailer.send({ from, to, subject, text });
      req.flash("flashes", { type: "success", message: req.__("contact_me_form_success_alert") });
      res.redirect(this._urlService.genAbsoluteUrl("/", { locale: req.getLocale() }));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ContactMeController;
