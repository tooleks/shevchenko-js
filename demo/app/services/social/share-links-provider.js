"use strict";

const qs = require("querystring");

const facebook = (url, description) => `https://www.facebook.com/sharer/sharer.php?u=${qs.escape(url)}`;
const twitter = (url, description) => `https://twitter.com/home?status=${qs.escape(url)}`;
const googlePlus = (url, description) => `https://plus.google.com/share?url=${qs.escape(url)}`;
const linkedIn = (url, description) => `https://www.linkedin.com/shareArticle?mini=true&url=${qs.escape(url)}&title=&summary=${qs.escape(description)}&source=`;

module.exports = {facebook, twitter, googlePlus, linkedIn};
