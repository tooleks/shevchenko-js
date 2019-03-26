'use strict';

const qs = require('querystring');

class ShareLinksProvider {
  /**
   */
  constructor() {
    this.facebook = this.facebook.bind(this);
    this.twitter = this.twitter.bind(this);
    this.googlePlus = this.googlePlus.bind(this);
    this.linkedIn = this.linkedIn.bind(this);
  }

  /**
   * Get shareable Facebook link URL.
   *
   * @param {string} url
   * @param {string} description
   * @returns {string}
   */
  facebook(url, description) {
    return `https://www.facebook.com/sharer/sharer.php?u=${qs.escape(url)}`;
  }

  /**
   * Get shareable Twitter link URL.
   *
   * @param {string} url
   * @param {string} description
   * @returns {string}
   */
  twitter(url, description) {
    return `https://twitter.com/home?status=${qs.escape(url)}`;
  }

  /**
   * Get shareable Google+ link URL.
   *
   * @param {string} url
   * @param {string} description
   * @returns {string}
   */
  googlePlus(url, description) {
    return `https://plus.google.com/share?url=${qs.escape(url)}`;
  }

  /**
   * Get shareable LinkedIn link URL.
   *
   * @param {string} url
   * @param {string} description
   * @returns {string}
   */
  linkedIn(url, description) {
    return (
      `https://www.linkedin.com/shareArticle?mini=true&url=${qs.escape(url)}` +
      `&title=&summary=${qs.escape(description)}&source=`
    );
  }
}

module.exports = ShareLinksProvider;