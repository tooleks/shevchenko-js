class UrlService {
  /**
   * Generate an absolute URL for a given path.
   *
   * @param {string} [pathname='']
   * @param {string} [locale='en']
   * @returns {URL}
   */
  // eslint-disable-next-line class-methods-use-this
  getUrl(pathname = '', locale = 'en') {
    const host = process.env.APP_URL;
    const absoluteUrl = new URL(host);
    absoluteUrl.pathname = pathname;
    if (!absoluteUrl.searchParams.has('lang')) {
      absoluteUrl.searchParams.set('lang', locale);
    }
    return absoluteUrl;
  }
}

module.exports = UrlService;
