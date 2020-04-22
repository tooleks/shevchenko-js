const i18n = require('i18n');

/**
 * @param {UrlService} urlService
 * @param {ShareLinksProvider} shareLinksProvider
 */
module.exports = (urlService, shareLinksProvider) => {
  return (req, res, next) => {
    try {
      res.locals.currentUrl = urlService.getUrl(req.url, req.getLocale());
      res.locals.getUrl = (pathname) => urlService.getUrl(pathname, req.getLocale());
      res.locals.facebookShareUrl = shareLinksProvider.facebook(res.locals.currentUrl);
      res.locals.twitterShareUrl = shareLinksProvider.twitter(res.locals.currentUrl);
      res.locals.linkedInShareUrl = shareLinksProvider.linkedIn(res.locals.currentUrl, req.__('appDescription'));
      res.locals.languages = i18n.getLocales().map((locale) => {
        const url = urlService.getUrl(req.url, locale);
        url.searchParams.set('lang', locale);
        const name = i18n.__({ phrase: `${locale}Language`, locale });
        return { url, name };
      });
      next();
    } catch (err) {
      next(err);
    }
  };
};
