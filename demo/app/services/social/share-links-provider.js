"use strict";

const qs = require("querystring");

const description = qs.escape(process.env.APP_DESCRIPTION);

const facebook = (url) => `https://www.facebook.com/sharer/sharer.php?u=${url}`;
const twitter = (url) => `https://twitter.com/home?status=${url}`;
const googlePlus = (url) => `https://plus.google.com/share?url=${url}`;
const linkedIn = (url) => `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=&summary=${description}&source=`;

module.exports = {facebook, twitter, googlePlus, linkedIn};
