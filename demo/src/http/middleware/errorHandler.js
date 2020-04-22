/**
 * @param {UrlService} urlService
 * @param {WinstonLogger} [logger]
 */
module.exports = (urlService, logger) => {
  function createErrorMetadata(req, err) {
    return {
      action: `${req.method} ${req.url}`,
      error: err,
    };
  }

  return (err, req, res, next) => {
    logger.error('Internal Server Error.', createErrorMetadata(req, err));
    req.flash('flashes', { type: 'danger', message: req.__('internalServerError') });
    res.redirect(urlService.getUrl('/', req.getLocale()));
  };
};
