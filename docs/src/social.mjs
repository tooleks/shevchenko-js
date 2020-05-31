/**
 * Returns a shareable Facebook link URL for a given app URL.
 *
 * @param {string} url
 * @returns {string}
 */
export function getFacebookShareUrl(url) {
  const link = new URL('https://www.facebook.com');
  link.pathname = '/sharer/sharer.php';
  link.searchParams.set('u', url);
  return link.toString();
}

/**
 * Returns a shareable Twitter link URL for a given app URL.
 *
 * @param {string} url
 * @returns {string}
 */
export function getTwitterShareUrl(url) {
  const link = new URL('https://twitter.com');
  link.pathname = '/home';
  link.searchParams.set('status', url);
  return link.toString();
}

/**
 * Returns a shareable LinkedIn link URL for a given app URL.
 *
 * @param {string} url
 * @param {string} description
 * @returns {string}
 */
export function getLinkedInShareUrl(url, description) {
  const link = new URL('https://www.linkedin.com');
  link.pathname = '/shareArticle';
  link.searchParams.set('mini', true.toString());
  link.searchParams.set('url', url);
  link.searchParams.set('title', '');
  link.searchParams.set('summary', description);
  link.searchParams.set('source', '');
  return link.toString();
}

/**
 * Returns all share URLs for a given app URL.
 *
 * @param {string} url
 * @param {string} description
 * @returns {Object}
 */
export function getShareUrls(url, description) {
  return {
    facebookShareUrl: getFacebookShareUrl(url),
    twitterShareUrl: getTwitterShareUrl(url),
    linkedInShareUrl: getLinkedInShareUrl(url, description),
  };
}
