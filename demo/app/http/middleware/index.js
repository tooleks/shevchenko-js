"use strict";

const {URL} = require("url");
const socialShareLinksProvider = require("../../services/social/share-links-provider");
const urlService = require("../../services/url");

const bindGenerateUrl = (req, res, next) => {
    res.locals.generateUrl = (url) => urlService.generate(req, url);
    next();
};

const bindCurrentUrl = (req, res, next) => {
    res.locals.currentUrl = new URL(process.env.APP_URL + req.url);
    next();
};

const bindShareUrls = (req, res, next) => {
    res.locals.shareOnFacebookUrl = socialShareLinksProvider.facebook(res.locals.currentUrl, req.__("app.description"));
    res.locals.shareOnTwitterUrl = socialShareLinksProvider.twitter(res.locals.currentUrl, req.__("app.description"));
    res.locals.shareOnGooglePlusUrl = socialShareLinksProvider.googlePlus(res.locals.currentUrl, req.__("app.description"));
    res.locals.shareOnLinkedInUrl = socialShareLinksProvider.linkedIn(res.locals.currentUrl, req.__("app.description"));
    next();
};

const bindLanguageSwitcher = (req, res, next) => {
    const getSwitcherLocale = (req) => req.getLocale() !== "uk" ? "uk" : "en";
    const url = new URL(process.env.APP_URL + req.url);
    url.searchParams.set("lang", getSwitcherLocale(req));
    res.locals.languageSwitcher = {url, locale: getSwitcherLocale(req)};
    next();
};

module.exports = {bindGenerateUrl, bindCurrentUrl, bindShareUrls, bindLanguageSwitcher};
