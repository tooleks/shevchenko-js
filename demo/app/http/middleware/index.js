"use strict";

const {URL} = require("url");
const i18n = require("i18n");
const social = require("../../services/social/share-links-provider");

module.exports = (req, res, next) => {
    // Apply generate URL API to req, res objects.
    const generateUrl = (relativeUrl) => {
        const absoluteUrl = new URL(process.env.APP_URL + relativeUrl);
        if (!absoluteUrl.searchParams.has("lang")) {
            absoluteUrl.searchParams.set("lang", req.getLocale());
        }
        return absoluteUrl;
    };
    req.generateUrl = generateUrl;
    res.locals.generateUrl = generateUrl;

    // Apply current URL API to res object.
    res.locals.currentUrl = new URL(process.env.APP_URL + req.url);

    // Apply share on social URL's API to res object.
    res.locals.shareOnFacebookUrl = social.facebook(res.locals.currentUrl, req.__("app.description"));
    res.locals.shareOnTwitterUrl = social.twitter(res.locals.currentUrl, req.__("app.description"));
    res.locals.shareOnGooglePlusUrl = social.googlePlus(res.locals.currentUrl, req.__("app.description"));
    res.locals.shareOnLinkedInUrl = social.linkedIn(res.locals.currentUrl, req.__("app.description"));

    // Apply language switcher API to res object.
    res.locals.languageSwitcher = i18n.getLocales().map((locale) => {
        const url = new URL(process.env.APP_URL + req.url);
        url.searchParams.set("lang", locale);
        const title = i18n.__({phrase: `${locale}-language`, locale});
        return {url, title};
    });

    //
    next();
};
