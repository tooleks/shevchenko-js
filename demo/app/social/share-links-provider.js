"use strict";

const qs = require("querystring");

const url = qs.escape(process.env.APP_URL);
const description = qs.escape(process.env.APP_DESCRIPTION);

const facebook = () => `https://www.facebook.com/sharer/sharer.php?u=${url}`;
const twitter = () => `https://twitter.com/home?status=${url}`;
const googlePlus = () => `https://plus.google.com/share?url=${url}`;
const linkedIn = () => `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=&summary=${description}&source=`;

module.exports = {facebook, twitter, googlePlus, linkedIn};
