'use strict';

class ErrorHandler {
  /**
   * @param {UrlService} urlService
   */
  constructor(urlService) {
    this._urlService = urlService;
    this.handle = this.handle.bind(this);
  }

  /**
   * Handle application errors.
   *
   * @param err
   * @param req
   * @param res
   * @param next
   */
  handle(err, req, res, next) {
    console.error(err);
    req.flash('flashes', { type: 'danger', message: req.__('internal_server_error') });
    res.redirect(this._urlService.genAbsoluteUrl('/', { locale: req.getLocale() }));
  }
}

module.exports = ErrorHandler;
