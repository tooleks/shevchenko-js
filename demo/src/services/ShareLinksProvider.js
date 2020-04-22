class ShareLinksProvider {
  /**
   * Get shareable Facebook link URL for a given URL.
   *
   * @param {string} url
   * @returns {string}
   */
  // eslint-disable-next-line class-methods-use-this
  facebook(url) {
    const link = new URL('https://www.facebook.com');
    link.pathname = '/sharer/sharer.php';
    link.searchParams.set('u', url);
    return link.toString();
  }

  /**
   * Get shareable Twitter link URL for a given URL.
   *
   * @param {string} url
   * @returns {string}
   */
  // eslint-disable-next-line class-methods-use-this
  twitter(url) {
    const link = new URL('https://twitter.com');
    link.pathname = '/home';
    link.searchParams.set('status', url);
    return link.toString();
  }

  /**
   * Get shareable LinkedIn link URL for a given URL.
   *
   * @param {string} url
   * @param {string} description
   * @returns {string}
   */
  // eslint-disable-next-line class-methods-use-this
  linkedIn(url, description) {
    const link = new URL('https://www.linkedin.com');
    link.pathname = '/shareArticle';
    link.searchParams.set('mini', true.toString());
    link.searchParams.set('url', url);
    link.searchParams.set('title', '');
    link.searchParams.set('summary', description);
    link.searchParams.set('source', '');
    return link.toString();
  }
}

module.exports = ShareLinksProvider;
