"use strict";

const {URL} = require("url");
const share = require("../../services/social/share-links-provider");

const bindCurrentUrl = (req, res, next) => {
    res.locals.currentUrl = new URL(process.env.APP_URL + req.url);
    next();
};

const bindShareUrls = (req, res, next) => {
    res.locals.shareOnFacebookUrl = share.facebook(res.locals.currentUrl, req.__('app.description'));
    res.locals.shareOnTwitterUrl = share.twitter(res.locals.currentUrl, req.__('app.description'));
    res.locals.shareOnGooglePlusUrl = share.googlePlus(res.locals.currentUrl, req.__('app.description'));
    res.locals.shareOnLinkedInUrl = share.linkedIn(res.locals.currentUrl, req.__('app.description'));
    next();
};

const bindLanguageSwitcher = (req, res, next) => {
    const getSwitcherLocale = (req) => req.getLocale() !== "uk" ? "uk" : "en";
    const url = new URL(process.env.APP_URL + req.url);
    url.searchParams.set("lang", getSwitcherLocale(req));
    res.locals.languageSwitcher = {url, locale: getSwitcherLocale(req)};
    next();
};

module.exports = {bindCurrentUrl, bindShareUrls, bindLanguageSwitcher};
