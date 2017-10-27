"use strict";

const {URL} = require("url");
const i18n = require("i18n");
const share = require("../../services/social/share-links-provider");

const currentUrlProvider = (req, res, next) => {
    res.locals.currentUrl = new URL(process.env.APP_URL + req.url);
    next();
};

const shareUrlProvider = (req, res, next) => {
    res.locals.shareOnFacebookUrl = share.facebook(res.locals.currentUrl, i18n.__('app.description'));
    res.locals.shareOnTwitterUrl = share.twitter(res.locals.currentUrl, i18n.__('app.description'));
    res.locals.shareOnGooglePlusUrl = share.googlePlus(res.locals.currentUrl, i18n.__('app.description'));
    res.locals.shareOnLinkedInUrl = share.linkedIn(res.locals.currentUrl, i18n.__('app.description'));
    next();
};

const languageSwitcherProvider = (req, res, next) => {
    const getSwitcherLocale = (req) => i18n.getLocale(req) !== "uk" ? "uk" : "en";
    const url = new URL(process.env.APP_URL + req.url);
    url.searchParams.set("lang", getSwitcherLocale(req));
    res.locals.languageSwitcher = {url, locale: getSwitcherLocale(req)};
    next();
};

module.exports = {currentUrlProvider, shareUrlProvider, languageSwitcherProvider};
