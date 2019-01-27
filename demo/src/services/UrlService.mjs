import {URL} from 'url';

export default class UrlService {
  /**
   */
  constructor() {
    this.genAbsoluteUrl = this.genAbsoluteUrl.bind(this);
  }

  /**
   * Generate absolute URL.
   *
   * @param {string} [relativeUrl='']
   * @param {object} [params]
   * @param {string} {params.locale='en']
   * @return {URL}
   */
  genAbsoluteUrl(relativeUrl = '', params = {}) {
    params = {locale: 'en', ...params};
    const host = process.env.APP_URL;
    const absoluteUrl = new URL(host + relativeUrl);
    if (!absoluteUrl.searchParams.has('lang')) {
      absoluteUrl.searchParams.set('lang', params.locale);
    }
    return absoluteUrl;
  }
}
