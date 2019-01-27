import i18n from 'i18n';

export default class Utils {
  /**
   * @param {UrlService} urlService
   * @param {ShareLinksProvider} shareLinksProvider
   */
  constructor(urlService, shareLinksProvider) {
    this._urlService = urlService;
    this._shareLinksProvider = shareLinksProvider;
    this.handle = this.handle.bind(this);
  }

  /**
   * Add utils API to req and res.
   *
   * @param req
   * @param res
   * @param next
   */
  handle(req, res, next) {
    res.locals.__url = Object.freeze({
      generate: (url) => this._urlService.genAbsoluteUrl(url, {locale: req.getLocale()}),
      current: this._urlService.genAbsoluteUrl(req.url, {locale: req.getLocale()}),
    });

    res.locals.__shareUrl = Object.freeze({
      facebook: this._shareLinksProvider.facebook(res.locals.__url.current, req.__('app_description')),
      twitter: this._shareLinksProvider.twitter(res.locals.__url.current, req.__('app_description')),
      googlePlus: this._shareLinksProvider.googlePlus(res.locals.__url.current, req.__('app_description')),
      linkedIn: this._shareLinksProvider.linkedIn(res.locals.__url.current, req.__('app_description')),
    });

    res.locals.__languageSwitcher = i18n.getLocales().map((locale) => {
      const url = this._urlService.genAbsoluteUrl(req.url, {locale});
      url.searchParams.set('lang', locale);
      const title = i18n.__({phrase: `${locale}_language`, locale});
      return {url, title};
    });

    next();
  }
}
