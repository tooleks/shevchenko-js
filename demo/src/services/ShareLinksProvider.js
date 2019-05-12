"use strict";

const { URL } = require("url");

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
    const link = new URL("https://www.facebook.com");
    link.pathname = "/sharer/sharer.php";
    link.searchParams.set("u", url);
    return link.toString();
  }

  /**
   * Get shareable Twitter link URL.
   *
   * @param {string} url
   * @param {string} description
   * @returns {string}
   */
  twitter(url, description) {
    const link = new URL("https://twitter.com");
    link.pathname = "/home";
    link.searchParams.set("status", url);
    return link.toString();
  }

  /**
   * Get shareable Google+ link URL.
   *
   * @param {string} url
   * @param {string} description
   * @returns {string}
   */
  googlePlus(url, description) {
    const link = new URL("https://plus.google.com");
    link.pathname = "/share";
    link.searchParams.set("url", url);
    return link.toString();
  }

  /**
   * Get shareable LinkedIn link URL.
   *
   * @param {string} url
   * @param {string} description
   * @returns {string}
   */
  linkedIn(url, description) {
    const link = new URL("https://www.linkedin.com");
    link.pathname = "/shareArticle";
    link.searchParams.set("mini", true.toString());
    link.searchParams.set("url", url);
    link.searchParams.set("title", "");
    link.searchParams.set("summary", description);
    link.searchParams.set("source", "");
    return link.toString();
  }
}

module.exports = ShareLinksProvider;
