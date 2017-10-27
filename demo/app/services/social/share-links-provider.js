"use strict";

const qs = require("querystring");

const facebook = (url, description) => `https://www.facebook.com/sharer/sharer.php?u=${url}`;
const twitter = (url, description) => `https://twitter.com/home?status=${url}`;
const googlePlus = (url, description) => `https://plus.google.com/share?url=${url}`;
const linkedIn = (url, description) => `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=&summary=${description}&source=`;

module.exports = {facebook, twitter, googlePlus, linkedIn};
