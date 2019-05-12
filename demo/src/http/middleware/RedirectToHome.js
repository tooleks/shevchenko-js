"use strict";

class RedirectToHome {
  /**
   * @param {UrlService} urlService
   */
  constructor(urlService) {
    this._urlService = urlService;
    this.handle = this.handle.bind(this);
  }

  /**
   * Redirect to home.
   *
   * @param req
   * @param res
   */
  handle(req, res) {
    res.redirect(this._urlService.genAbsoluteUrl("/", { locale: req.getLocale() }));
  }
}

module.exports = RedirectToHome;
