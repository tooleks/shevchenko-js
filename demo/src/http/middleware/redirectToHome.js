/**
 * @param {UrlService} urlService
 */
module.exports = (urlService) => {
  return (req, res, next) => {
    try {
      res.redirect(urlService.getUrl('/', req.getLocale()))
    } catch (err) {
      next(err);
    }
  };
};
